import { Logger } from '@map-colonies/js-logger';
import { AxiosRequestConfig } from 'axios';
import { Layer3DRecordInput } from '../../AUTOGENERATED/GraphQLClass';
import { IngestionData } from '../../graphql/inputTypes';
import { requestHandler } from '../../utils';
import { IConfig } from '../interfaces';
import { IIngestionManagerService } from './ingestion-manager.interface';

export class IngestionManager3D implements IIngestionManagerService {
  private readonly serviceURL: string = '';

  public constructor(private readonly config: IConfig, private readonly logger: Logger) {
    this.serviceURL = this.config.get('ingestionServices.3d.url');
  }

  public async ingest(data: IngestionData): Promise<IngestionData> {
    const res = await requestHandler(`${this.serviceURL}/models`, 'POST', this.buildPayload(data));
    return data;
  }

  private buildPayload(data: IngestionData): AxiosRequestConfig {
    const payloadData = {
      modelPath: data.directory,
      metadata: {
        ...data.metadata,
        identifier: data.metadata.id,
        typename: '3D',
        schema: '3d_schema',
        mdSource: '3d_mdSource',
        xml: '3d_xml',
        insertDate: new Date().toISOString(),
        anytext: `${data.metadata.productName} ${data.metadata.description ?? ''} ${
          data.metadata.sensorType ? data.metadata.sensorType.join(',') : ''
        } ${(data.metadata as Layer3DRecordInput).version ?? ''}`,
        sensorType: data.metadata.sensorType ? data.metadata.sensorType.join(',') : '',
        nominalResolution: String((data.metadata as Layer3DRecordInput).nominalResolution),
        accuracyLE90: String((data.metadata as Layer3DRecordInput).accuracyLE90),
        estimatedPrecision: String((data.metadata as Layer3DRecordInput).estimatedPrecision),
        measuredPrecision: String((data.metadata as Layer3DRecordInput).measuredPrecision),
      },
      tilesetFilename: data.fileNames[0],
    };
    return {
      data: {
        ...payloadData,
      },
    };
  }
}
