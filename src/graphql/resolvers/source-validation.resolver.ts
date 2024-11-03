import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { IContext } from '../../common/interfaces';
import { SourceValidationParams } from '../inputTypes';
import { SourceValidatorManager } from '../../common/source-validator-manager/source-validator-manager';
import { SourceValidation } from '../sourceValidation';

@Resolver()
export class SourceValidationResolver {
  private readonly sourceValidator: SourceValidatorManager;

  public constructor() {
    this.sourceValidator = container.resolve(SourceValidatorManager);
  }

  @Query((type) => [SourceValidation])
  public async validateSource(
    @Arg('data')
    data: SourceValidationParams,
    @Ctx()
    ctx: IContext
  ): Promise<SourceValidation[]> {
    const sourceValidationResponse = await this.sourceValidator.sourceInfo(data, ctx);

    return [sourceValidationResponse];
  }
}
