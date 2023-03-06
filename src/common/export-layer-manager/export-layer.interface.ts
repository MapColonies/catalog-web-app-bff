import { IContext } from '../interfaces';

export interface IExportLayerManagerService {
  getEstimatedSize: (data: unknown, ctx: IContext) => Promise<unknown>;
  getFreeDiskSpace: (data: unknown, ctx: IContext) => Promise<unknown>;
  triggerExportTask: (data: unknown, ctx: IContext) => Promise<unknown>; // Gets record type as one of the params
}
