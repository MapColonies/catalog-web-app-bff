import { IngestionData } from '../../graphql/inputTypes';

// eslint-disable-next-line import/exports-last
export interface IIngestionManagerService {
  ingest: (data: IngestionData) => Promise<IngestionData>;
}
