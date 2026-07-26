import { IngestionResultData } from '../../graphql/ingestion';
import { IngestionData, RecordDeleteData, SourceValidationInputParams } from '../../graphql/inputTypes';
import { SourceValidation } from '../../graphql/sourceValidation';
import { IContext } from '../interfaces';

export interface IIngestionManagerService {
  ingest: (data: IngestionData, ctx: IContext) => Promise<IngestionResultData>;
  updateGeopkg?: (data: IngestionData, ctx: IContext) => Promise<IngestionResultData | null>;
  delete: (data: RecordDeleteData, ctx: IContext) => Promise<void>;
}

export interface ISourceInfoService {
  sourceInfo: (data: SourceValidationInputParams, ctx: IContext) => Promise<SourceValidation>;
}
