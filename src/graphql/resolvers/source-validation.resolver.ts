import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Logger } from '@map-colonies/js-logger';
import { IContext } from '../../common/interfaces';
import { SourceGPKGValidationParams, SourceValidationParams } from '../inputTypes';
import { SourceValidatorManager } from '../../common/source-validator-manager/source-validator-manager';
import { Services } from '../../common/constants';
import { SourceValidation } from '../sourceValidation';

@Resolver()
export class SourceValidationResolver {
  private readonly sourceValidator: SourceValidatorManager;
  private readonly logger: Logger;

  public constructor() {
    this.sourceValidator = container.resolve(SourceValidatorManager);
    this.logger = container.resolve(Services.LOGGER);
  }

  @Query((type) => [SourceValidation])
  public async validateSource(
    @Arg('data')
    data: SourceValidationParams,
    @Ctx()
    ctx: IContext
  ): Promise<SourceValidation[]> {
    try {
      const sourceValidationResponse = await this.sourceValidator.sourceInfo(data, ctx);
      return [sourceValidationResponse];
    } catch (error) {
      this.logger.error(error as string);
      throw error;
    }
  }

  @Query((type) => [SourceValidation])
  public async validateGPKGSource(
    @Arg('data')
    data: SourceGPKGValidationParams,
    @Ctx()
    ctx: IContext
  ): Promise<SourceValidation[]> {
    try {
      const sourceValidationResponse = await this.sourceValidator.sourceInfo(data, ctx);
      return [sourceValidationResponse];
    } catch (error) {
      this.logger.error(error as string);
      throw error;
    }
  }
}
