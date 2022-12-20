import { Logger } from '@map-colonies/js-logger';
import { DEFAULT_COUNT, DEFAULT_OUTPUT_FORMAT, DEFAULT_SRS_NAME, DEFAULT_VERSION, getJsonixContext, getQueryPointXMLBody } from './constants';
import { IDescribeFeatureResponse, IGetFeatureOptions, IRequestExecutor, IRequestOptions, IWFSClientOptions } from './interfaces';

const jsonixContext = getJsonixContext();

/* eslint-disable */
// @ts-ignore
const jsonixUnmarshaller = jsonixContext.createUnmarshaller();
/* eslint-enable */

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
    this.baseUrl = baseUrl;
    this.requestExecutor = requestExecutor;
    this.count = count ?? DEFAULT_COUNT;
    this.srsName = srsName ?? DEFAULT_SRS_NAME;
    this.version = version ?? DEFAULT_VERSION;
    this.logger = logger ?? (console as unknown as Logger);
  }

  /**
   * Performs a getCapabilities request
   * @returns Promise of the response from the getCapabilities request of the WFS service
   */
  public async getCapabilities(): Promise<unknown> {
    this.logger.info('[WfsClient][getCapabilities] Fetching WFS getCapabilites data');

    const getCapabilitiesRes = await this.request({ request: 'getCapabilities' });
    const jsonXmlData = this.xmlToJson(getCapabilitiesRes as string);

    return jsonXmlData;
  }

  /**
   * Performs a DescribeFeatureType request
   * @returns Promise of a processed list of typeNames
   */
  public async getFeatureTypeList(): Promise<string[]> {
    this.logger.info(`[WfsClient][getFeatureTypeList] Attempting query featureTypes.`);

    const describeFeatureData = await this.request({ request: 'DescribeFeatureType' });

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
  }: // filter,
  IGetFeatureOptions): Promise<unknown> {
    const typeNamesStr = typeNames.join(',');
    const pointCoordinatesStr = pointCoordinates.join(',');

    const XML_BODY_TEMPLATE = getQueryPointXMLBody(count, DEFAULT_OUTPUT_FORMAT, typeNamesStr, pointCoordinatesStr);

    this.logger.info(`[WfsClient][getFeature] Attempting query features of types ${typeNamesStr} at point ${pointCoordinatesStr}`);

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
      const error = 'There was an error targeting the WFS features';
      this.logger.error(`[WfsClient][getFeature] ${error}`);

      throw new Error(error);
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
      const error = `Failed to fetch WFS data. error: ${(e as Error).message}`;
      this.logger.error(`[WfsClient][request] ${error}`);

      throw new Error(error);
    }
  }

  private xmlToJson(xml: string): Record<string, unknown> {
    try {
      this.logger.info('[WfsClient][xmlToJson] Attempting parse XML to JSON.');

      // eslint-disable-next-line
      return jsonixUnmarshaller.unmarshalString(xml) as Record<string, unknown>;
    } catch (e) {
      const error = `Could not parse the XML for this request. ${(e as Error).message}`;
      this.logger.error(`[WfsClient][xmlToJson] ${error}`);

      throw new Error(error);
    }
  }
}

export default WfsClient;
