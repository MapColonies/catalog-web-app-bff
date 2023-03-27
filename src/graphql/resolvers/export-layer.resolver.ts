import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { ExportLayerManager } from '../../common/export-layer-manager/export-layer-manager';
import { IContext } from '../../common/interfaces';
import { EstimatedSize, FreeDiskSpace, TriggerExportTask } from '../export-layer';
import { GetExportEstimatedSizeInput, GetFreeDiskSpaceInput, TriggerExportTaskInput } from '../inputTypes';

@Resolver()
export class ExportLayerResolver {
  private readonly exportLayerManager: ExportLayerManager;

  public constructor() {
    this.exportLayerManager = container.resolve(ExportLayerManager);
  }

  @Query((type) => EstimatedSize)
  public async getEstimatedSize(
    @Arg('data')
    data: GetExportEstimatedSizeInput,
    @Ctx()
    ctx: IContext
  ): Promise<EstimatedSize> {
    const estimatedSize = await this.exportLayerManager.getEstimatedSize(data, ctx);

    return estimatedSize;
  }

  @Query((type) => FreeDiskSpace)
  public async getFreeDiskSpace(
    @Arg('data')
    data: GetFreeDiskSpaceInput,
    @Ctx()
    ctx: IContext
  ): Promise<FreeDiskSpace> {
    const freeDiskSpace = await this.exportLayerManager.getFreeDiskSpace(data, ctx);

    return freeDiskSpace;
  }

  @Query((type) => TriggerExportTask)
  public async triggerExportTask(
    @Arg('data')
    data: TriggerExportTaskInput,
    @Ctx()
    ctx: IContext
  ): Promise<TriggerExportTask> {
    const exportJobData = await this.exportLayerManager.triggerExportTask(data, ctx);

    return exportJobData;
  }
}
