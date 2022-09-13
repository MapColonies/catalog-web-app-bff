import { RecordUpdatePartial } from '../../graphql/inputTypes';

// eslint-disable-next-line import/exports-last
export interface ICatalogManagerService {
  updateStatus: (data: RecordUpdatePartial) => Promise<RecordUpdatePartial>;
  updateMetadata: (data: RecordUpdatePartial) => Promise<RecordUpdatePartial>;
}
