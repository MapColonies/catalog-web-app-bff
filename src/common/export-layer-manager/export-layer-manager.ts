import { Logger } from '@map-colonies/js-logger';
import { RecordType } from '@map-colonies/mc-model-types';
import { IConfig } from 'config';
import { inject, singleton } from 'tsyringe';
import { Domain } from '../../graphql/domain';
import { EstimatedSize, FreeDiskSpace, TriggerExportTask } from '../../graphql/export-layer';
import { GetExportEstimatedSizeInput, GetFreeDiskSpaceInput, TriggerExportTaskInput } from '../../graphql/inputTypes';
import { Services } from '../constants';
import { IContext } from '../interfaces';
import { ExportLayerManager3D } from './export-layer-manager-3d';
import { ExportLayerManagerDEM } from './export-layer-manager-dem';
import { ExportLayerManagerRaster } from './export-layer-manager-raster';
import { IExportLayerManagerService } from './export-layer.interface';

type ExportLayerServices = Record<Domain, IExportLayerManagerService>;

@singleton()
export class ExportLayerManager implements IExportLayerManagerService {
  private readonly exportServices: ExportLayerServices = {} as ExportLayerServices;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.exportServices.RASTER = new ExportLayerManagerRaster(this.config, this.logger);
    this.exportServices['3D'] = new ExportLayerManager3D(this.config, this.logger);
    this.exportServices['DEM'] = new ExportLayerManagerDEM(this.config, this.logger);
  }

  public async getEstimatedSize(data: GetExportEstimatedSizeInput, ctx: IContext): Promise<EstimatedSize> {
    this.logger.info(`[ExportLayerManager][getEstimatedSize] start estimated export size for type ${data.type}.`);

    const exportLayerManagerInstance = this.getManagerInstance(data.type);
    const estimatedSize = await exportLayerManagerInstance.getEstimatedSize(data, ctx);

    return estimatedSize;
  }

  public async getFreeDiskSpace(data: GetFreeDiskSpaceInput, ctx: IContext): Promise<FreeDiskSpace> {
    this.logger.info(`[ExportLayerManager][getFreeDiskSpace] start getting free disk space for type ${data.type}.`);

    const exportLayerManagerInstance = this.getManagerInstance(data.type);
    const freeDiskSpace = await exportLayerManagerInstance.getFreeDiskSpace(data, ctx);

    return freeDiskSpace;
  }

  public async triggerExportTask(data: TriggerExportTaskInput, ctx: IContext): Promise<TriggerExportTask> {
    this.logger.info(`[ExportLayerManager][triggerExportTask] start triggering export task for type ${data.type}.`);

    const exportLayerManagerInstance = this.getManagerInstance(data.type);
    const triggerExportTaskRes = await exportLayerManagerInstance.triggerExportTask(data, ctx);

    return triggerExportTaskRes;
  }

  private getManagerInstance(recordType: RecordType): IExportLayerManagerService {
    let exportLayerManagerInstance: IExportLayerManagerService;

    switch (RecordType[recordType]) {
      case RecordType.RECORD_3D:
        exportLayerManagerInstance = this.exportServices['3D'];
        break;
      case RecordType.RECORD_DEM:
        exportLayerManagerInstance = this.exportServices['DEM'];
        break;
      case RecordType.RECORD_RASTER:
        exportLayerManagerInstance = this.exportServices['RASTER'];
        break;
      default:
        exportLayerManagerInstance = this.exportServices.RASTER;
        break;
    }

    return exportLayerManagerInstance;
  }
}
