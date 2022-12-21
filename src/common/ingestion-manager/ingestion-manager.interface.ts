import { IngestionData } from '../../graphql/inputTypes';
import { IContext } from '../interfaces';

// eslint-disable-next-line import/exports-last
export interface IIngestionManagerService {
  ingest: (data: IngestionData, ctx: IContext) => Promise<IngestionData>;
  updateGeopkg?: (data: IngestionData, ctx: IContext) => Promise<IngestionData | null>;
}
