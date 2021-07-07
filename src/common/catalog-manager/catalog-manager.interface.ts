import { RecordUpdatePartial } from '../../graphql/inputTypes';

// eslint-disable-next-line import/exports-last
export interface ICatalogManagerService {
  updateMetadata: (data: RecordUpdatePartial) => Promise<RecordUpdatePartial>;
}
