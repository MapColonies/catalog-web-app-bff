import { IngestionResultData } from '../../graphql/ingestion';
import { IngestionData, SourceValidationInputParams } from '../../graphql/inputTypes';
import { SourceValidation } from '../../graphql/sourceValidation';
import { IContext } from '../interfaces';

export interface IIngestionManagerService {
  ingest: (data: IngestionData, ctx: IContext) => Promise<IngestionResultData>;
  updateGeopkg?: (data: IngestionData, ctx: IContext) => Promise<IngestionResultData | null>;
}

export interface ISourceInfoService {
  sourceInfo: (data: SourceValidationInputParams, ctx: IContext) => Promise<SourceValidation>;
}
