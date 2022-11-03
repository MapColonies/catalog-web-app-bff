import { RecordUpdatePartial } from '../../graphql/inputTypes';
import { IContext } from '../interfaces';

// eslint-disable-next-line import/exports-last
export interface ICatalogManagerService {
  updateStatus: (data: RecordUpdatePartial, ctx: IContext) => Promise<RecordUpdatePartial>;
  updateMetadata: (data: RecordUpdatePartial, ctx: IContext) => Promise<RecordUpdatePartial>;
}
