import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Logger } from '@map-colonies/js-logger';
import { Services } from '../../common/constants';
import { ExportLayerManager } from '../../common/export-layer-manager/export-layer-manager';
import { IContext } from '../../common/interfaces';
import { extractErrorMessage } from '../../utils';
import { EstimatedSize, FreeDiskSpace, TriggerExportTask } from '../export-layer';
import { GetExportEstimatedSizeInput, GetFreeDiskSpaceInput, TriggerExportTaskInput } from '../inputTypes';

@Resolver()
export class ExportLayerResolver {
  private readonly logger: Logger;
  private readonly exportLayerManager: ExportLayerManager;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.exportLayerManager = container.resolve(ExportLayerManager);
  }

  @Query((type) => EstimatedSize)
  public async getEstimatedSize(
    @Arg('data')
    data: GetExportEstimatedSizeInput,
    @Ctx()
    ctx: IContext
  ): Promise<EstimatedSize> {
    try {
      const estimatedSize = await this.exportLayerManager.getEstimatedSize(data, ctx);
      return estimatedSize;
    } catch (err) {
      this.logger.error(`[ExportLayer][getEstimatedSize][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  @Query((type) => FreeDiskSpace)
  public async getFreeDiskSpace(
    @Arg('data')
    data: GetFreeDiskSpaceInput,
    @Ctx()
    ctx: IContext
  ): Promise<FreeDiskSpace> {
    try {
      const freeDiskSpace = await this.exportLayerManager.getFreeDiskSpace(data, ctx);
      return freeDiskSpace;
    } catch (err) {
      this.logger.error(`[ExportLayer][getFreeDiskSpace][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  @Query((type) => TriggerExportTask)
  public async triggerExportTask(
    @Arg('data')
    data: TriggerExportTaskInput,
    @Ctx()
    ctx: IContext
  ): Promise<TriggerExportTask> {
    try {
      const exportJobData = await this.exportLayerManager.triggerExportTask(data, ctx);
      return exportJobData;
    } catch (err) {
      this.logger.error(`[ExportLayer][triggerExportTask][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }
}
