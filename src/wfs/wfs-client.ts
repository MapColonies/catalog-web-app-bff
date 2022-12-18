import { AxiosError } from 'axios';
import { IDescribeFeatureResponse } from './interfaces';

/* eslint-disable */
const WFS_2_0 = require('ogc-schemas').WFS_2_0;
const GML_3_1_1 = require('ogc-schemas').GML_3_1_1;
const XLink_2_0 = require('w3c-schemas').XLink_2_0;
const XLink_1_0 = require('w3c-schemas').XLink_1_0;
const XSD_1_0 = require('w3c-schemas').XSD_1_0;
const SMIL_2_0_Language = require('ogc-schemas').SMIL_2_0_Language;
const SMIL_2_0 = require('ogc-schemas').SMIL_2_0;
const Filter_2_0 = require('ogc-schemas').Filter_2_0;
const OWS_2_0 = require('ogc-schemas').OWS_2_0;
const OWS_1_1_0 = require('ogc-schemas').OWS_1_1_0;

const Jsonix = require('jsonix').Jsonix;
const jsonixContext = new Jsonix.Context([
  XSD_1_0,
  OWS_1_1_0,
  XLink_1_0,
  OWS_2_0,
  Filter_2_0,
  SMIL_2_0,
  SMIL_2_0_Language,
  XLink_2_0,
  GML_3_1_1,
  WFS_2_0,
]);
const jsonixUnmarshaller = jsonixContext.createUnmarshaller();
/* eslint-enable */

/* eslint-disable import/exports-last */
export interface IRequestExecutor {
  (url: string, method: string, params: Record<string, unknown>): Promise<unknown>;
}

interface IRequestOptions {
  request: string;
  method?: string;
  params?: Record<string, unknown>;
}

class WfsClient {
  /**
   * Client-side API for OGC's WFS services
   */
  private readonly wfsServiceUrl: string; // Base wfs service url
  private readonly requestExecutor: IRequestExecutor;
  private readonly version?: string;

  public constructor(wfsServiceUrl: string, requestExecutor: IRequestExecutor, version = '2.0.0') {
    this.version = version;
    this.wfsServiceUrl = wfsServiceUrl;
    this.requestExecutor = requestExecutor;
  }

  //     private readonly featureTypes?: string[]; // Empty means all features.
  //     private readonly bbox?: number[]; // [lat(bottom left), lon(bottom left), lat(top right), lon(top right)]
  // //

  public async getCapabilities(): Promise<unknown> {
    return this.request({ request: 'getCapabilities' });
  }

  public async getFeatureTypeList(typeNames?: string): Promise<string[]> {
    const typeNamesList = typeof typeNames !== 'undefined' ? { typeNames } : {};
    const describeFeaureData = (await this.request({ request: 'DescribeFeatureType', params: { ...typeNamesList } })) as IDescribeFeatureResponse;

    const featuresArr = describeFeaureData.value?.element?.map((el) => el.name as string);
    if (!featuresArr) {
      throw new Error('There was an error parsing featureTypes data');
    }

    return featuresArr;
  }

  private async request({ request, method = 'get', params = {} }: IRequestOptions): Promise<unknown> {
    try {
      const xmlRes = (await this.requestExecutor(this.wfsServiceUrl, method, {
        params: { service: 'WFS', version: this.version, request, ...params },
      })) as { data: unknown };

      return this.xmlToJson(xmlRes.data as string);
    } catch (e) {
      throw new Error(`Failed to fetch WFS data. status: ${(e as AxiosError).response?.status.toString() as string}`);
    }
  }

  private xmlToJson(xml: string): Record<string, unknown> {
    // eslint-disable-next-line
    return jsonixUnmarshaller.unmarshalString(xml) as Record<string, unknown>;
  }
}

export default WfsClient;
