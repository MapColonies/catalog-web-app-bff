import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Logger } from '@map-colonies/js-logger';
import { Services } from '../../common/constants';
import { IContext } from '../../common/interfaces';
import { SourceValidatorManager } from '../../common/source-validator-manager/source-validator-manager';
import { extractErrorMessage } from '../../utils';
import { SourceGPKGValidationParams, SourceValidationParams } from '../inputTypes';
import { SourceValidation } from '../sourceValidation';

@Resolver()
export class SourceValidationResolver {
  private readonly logger: Logger;
  private readonly sourceValidator: SourceValidatorManager;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.sourceValidator = container.resolve(SourceValidatorManager);
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
    } catch (err) {
      this.logger.error(`[SourceValidation][validateSource][ERROR] ${extractErrorMessage(err)}`);
      throw err;
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
    } catch (err) {
      this.logger.error(`[SourceValidation][validateGPKGSource][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }
}
