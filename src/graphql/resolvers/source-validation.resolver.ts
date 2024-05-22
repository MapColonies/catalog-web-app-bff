import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { IContext } from '../../common/interfaces';
import { SourceValidationParams } from '../inputTypes';
import { SourceValidator } from '../source-validator';
import { SourceValidation } from '../sourceValidation';

@Resolver()
export class SourceValidationResolver {
  private readonly sourceValidator: SourceValidator;

  public constructor() {
    this.sourceValidator = container.resolve(SourceValidator);
  }

  @Query((type) => [SourceValidation])
  public async validateSource(
    @Arg('data')
    data: SourceValidationParams,
    @Ctx()
    ctx: IContext
  ): Promise<SourceValidation[]> {
    const sourceValidationResponse = await this.sourceValidator.validateSource(data, ctx);

    return sourceValidationResponse;
  }
}
