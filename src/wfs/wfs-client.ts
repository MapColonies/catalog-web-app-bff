import { Logger } from '@map-colonies/js-logger';
import { getJsonixContext, getQueryPointXMLBody } from './constants';
import { IDescribeFeatureResponse } from './interfaces';

const jsonixContext = getJsonixContext();

/* eslint-disable */
// @ts-ignore
const jsonixUnmarshaller = jsonixContext.createUnmarshaller();
/* eslint-enable */

/* eslint-disable import/exports-last */
export interface IRequestExecutor {
  (url: string, method: string, params: Record<string, unknown>): Promise<unknown>;
}

interface IRequestOptions {
  request: string;
  method?: string;
  config?: Record<string, unknown>;
}

type OutputFormat = 'GML3' | 'application/json';

interface IWFSClientOptions {
  /**
   * @param baseUrl WFS service to query with this client.
   */
  baseUrl: string;

  /**
   * @param requestExecutor Used for fetching the data.
   */
  requestExecutor: IRequestExecutor;

  /**
   * @param count The default number of features to fetch for each query.
   * @defaultValue `100`
   */
  count?: number;

  /**
   * @param srsName The default srsName to use for each query.
   * @defaultValue `EPSG:4326`
   */
  srsName?: string;

  /**
   * @param version The default version of WFS protocol to use for each query.
   * @defaultValue `2.0.0`
   */
  version?: string;
}

interface IGetFeatureOptions {
  pointCoordinates: [string, string];
  typeNames: string[];
  count?: number;
  outputFormat?: OutputFormat;
  filter?: string;
}

const DEFAULT_OUTPUT_FORMAT = 'GML3';

class WfsClient {
  private readonly baseUrl: string;
  private readonly requestExecutor: IRequestExecutor;
  private readonly version: string;
  private readonly count: number;
  private readonly srsName: string;
  private readonly logger: Logger;

  /**
   *
   * A client-side API for OGC's WFS services, resolves to a JSON format
   * @param options of interface IWFSClientOptions
   * @param logger Used for logging functionalities
   */
  public constructor({ baseUrl, requestExecutor, count, srsName, version }: IWFSClientOptions, logger?: Logger) {
    const DEFAULT_COUNT = 100;
    const DEFAULT_SRS_NAME = 'EPSG:4326';
    const DEFAULT_VERSION = '2.0.0';

    this.baseUrl = baseUrl;
    this.requestExecutor = requestExecutor;
    this.count = count ?? DEFAULT_COUNT;
    this.srsName = srsName ?? DEFAULT_SRS_NAME;
    this.version = version ?? DEFAULT_VERSION;
    this.logger = logger ?? (console.log as unknown as Logger);
  }

  /**
   * Performs a getCapabilities request
   * @returns Promise of the response from the getCapabilities request of the WFS service
   */
  public async getCapabilities(): Promise<unknown> {
    const getCapabilitiesRes = await this.request({ request: 'getCapabilities' });
    const jsonXmlData = this.xmlToJson(getCapabilitiesRes as string);

    return jsonXmlData;
  }

  /**
   * Performs a DescribeFeatureType request
   * @returns Promise of a processed list of typeNames
   */
  public async getFeatureTypeList(typeNames?: string): Promise<string[]> {
    const typeNamesList = typeof typeNames !== 'undefined' ? { typeNames } : {};
    const describeFeatureData = await this.request({
      request: 'DescribeFeatureType',
      config: {
        params: { ...typeNamesList },
      },
    });

    const jsonXmlData = this.xmlToJson(describeFeatureData as string) as IDescribeFeatureResponse;

    const featuresArr = jsonXmlData.value?.element?.map((el) => el.name as string);

    if (!featuresArr) {
      throw new Error('There was an error parsing featureTypes data');
    }

    return featuresArr;
  }

  /**
   * Performs a getFeatures request, filtering by point geometry intersection
   * @param options of type IGetFeatureOptions
   * @returns Promise of the WFS service getFeatures response
   */
  public async getFeature({
    pointCoordinates,
    typeNames,
    count = this.count,
    outputFormat = DEFAULT_OUTPUT_FORMAT,
  }: // filter,
  IGetFeatureOptions): Promise<unknown> {
    const XML_BODY_TEMPLATE = getQueryPointXMLBody(count, outputFormat, typeNames.join(','), pointCoordinates.join(','));

    const getFeatureData = await this.request({
      request: 'GetFeature',
      method: 'POST',
      config: {
        // eslint-disable-next-line
        headers: { 'Content-Type': 'application/xml' },
        data: XML_BODY_TEMPLATE,
      },
    });

    if (!(getFeatureData as boolean)) {
      throw new Error('There was an error targeting the WFS features');
    }

    return getFeatureData;
  }

  private async request({ request, method = 'GET', config = {} }: IRequestOptions): Promise<unknown> {
    try {
      const { params, ...restConf } = config;

      const baseParams = {
        service: 'WFS',
        version: this.version,
        request,
        count: this.count,
        srsName: this.srsName,
      };

      const requestConfig = {
        params: { ...baseParams, ...((params as Record<string, unknown> | undefined) ?? {}) },
        ...restConf,
      };

      const res = (await this.requestExecutor(this.baseUrl, method, requestConfig)) as { data: unknown };

      return res.data;
    } catch (e) {
      throw new Error(`Failed to fetch WFS data. error: ${(e as Error).message}`);
    }
  }

  private xmlToJson(xml: string): Record<string, unknown> {
    try {
      // eslint-disable-next-line
      return jsonixUnmarshaller.unmarshalString(xml) as Record<string, unknown>;
    } catch (e) {
      throw new Error(`Could not parse the XML for this request. ${(e as Error).message}`);
    }
  }
}

export default WfsClient;
