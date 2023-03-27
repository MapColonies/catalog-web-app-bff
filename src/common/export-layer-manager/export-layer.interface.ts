import { EstimatedSize, FreeDiskSpace, TriggerExportTask } from '../../graphql/export-layer';
import { GetExportEstimatedSizeInput, GetFreeDiskSpaceInput, TriggerExportTaskInput } from '../../graphql/inputTypes';
import { IContext } from '../interfaces';

export interface IExportLayerManagerService {
  getEstimatedSize: (data: GetExportEstimatedSizeInput, ctx: IContext) => Promise<EstimatedSize>;
  getFreeDiskSpace: (data: GetFreeDiskSpaceInput, ctx: IContext) => Promise<FreeDiskSpace>;
  triggerExportTask: (data: TriggerExportTaskInput, ctx: IContext) => Promise<TriggerExportTask>;
}
