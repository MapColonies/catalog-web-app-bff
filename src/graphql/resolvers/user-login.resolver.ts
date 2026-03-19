import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Logger } from '@map-colonies/js-logger';
import { Services } from '../../common/constants';
import { IContext } from '../../common/interfaces';
import { extractErrorMessage } from '../../utils';
import { UserLoginParams } from '../inputTypes';
import { UserLogin } from '../userLogin';
import { UserLoginVerifier } from '../user-login-verifier';

@Resolver()
export class UserLoginResolver {
  private readonly logger: Logger;
  private readonly userLoginVerifier: UserLoginVerifier;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.userLoginVerifier = container.resolve(UserLoginVerifier);
  }

  @Query((type) => UserLogin)
  public async login(
    @Arg('data')
    data: UserLoginParams,
    @Ctx()
    ctx: IContext
  ): Promise<UserLogin> {
    try {
      const userLoginResponse = await this.userLoginVerifier.verifyAdmin(data, ctx);
      return userLoginResponse;
    } catch (err) {
      this.logger.error(`[UserLogin][login][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }
}
