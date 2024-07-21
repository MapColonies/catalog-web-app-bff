import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Logger } from 'pino';
import { IContext } from '../../common/interfaces';
import { SourceValidationParams } from '../inputTypes';
import { SourceValidator } from '../source-validator';
import { SourceValidation } from '../sourceValidation';
import { SourceInfo } from '../sourceInfo';
import { Services } from '../../common/constants';

@Resolver()
export class SourceValidationResolver {
  private readonly sourceValidator: SourceValidator;
  private readonly logger: Logger;

  public constructor() {
    this.sourceValidator = container.resolve(SourceValidator);
    this.logger = container.resolve(Services.LOGGER);
  }

  @Query((type) => [SourceInfo])
  public async validateSource(
    @Arg('data')
    data: SourceValidationParams,
    @Ctx()
    ctx: IContext
  ): Promise<SourceInfo[]> {
    let sourcesInfoResponse: SourceInfo[] = [];
    try {
      const sourceValidationResponse = await this.sourceValidator.validateSources(data, ctx);
      if (sourceValidationResponse.isValid) {
        sourcesInfoResponse = await this.sourceValidator.sourcesInfo(data, ctx);
      }
    } catch (error) {
      this.logger.error(error as string);
      throw error;
    }

    return sourcesInfoResponse;
  }
}
