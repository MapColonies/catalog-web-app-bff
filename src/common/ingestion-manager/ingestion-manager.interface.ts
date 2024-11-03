import { IngestionData, SourceValidationParams } from '../../graphql/inputTypes';
import { SourceValidation } from '../../graphql/sourceValidation';
import { IContext } from '../interfaces';

// eslint-disable-next-line import/exports-last
export interface IIngestionManagerService {
  ingest: (data: IngestionData, ctx: IContext) => Promise<IngestionData>;
  updateGeopkg?: (data: IngestionData, ctx: IContext) => Promise<IngestionData | null>;
}

export interface ISourceInfoService {
  sourceInfo: (data: SourceValidationParams, ctx: IContext) => Promise<SourceValidation>;
}
