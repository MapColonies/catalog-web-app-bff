import { RecordDeleteData, RecordUpdatePartial } from '../../graphql/inputTypes';
import { IContext } from '../interfaces';

export interface ICatalogManagerService {
  updateStatus: (data: RecordUpdatePartial, ctx: IContext) => Promise<RecordUpdatePartial>;
  updateMetadata: (data: RecordUpdatePartial, ctx: IContext) => Promise<RecordUpdatePartial>;
  deleteLayer: (data: RecordDeleteData, ctx: IContext) => Promise<void>;
}
