import { container } from 'tsyringe';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { IContext } from '../../common/interfaces';
import { UserLoginParams } from '../inputTypes';
import { UserLogin } from '../userLogin';
import { UserLoginVerifier } from '../user-login-verifier';

@Resolver()
export class UserLoginResolver {
  private readonly userLoginVerifier: UserLoginVerifier;

  public constructor() {
    this.userLoginVerifier = container.resolve(UserLoginVerifier);
  }

  @Query((type) => UserLogin)
  public async login(
    @Arg('data')
    data: UserLoginParams,
    @Ctx()
    ctx: IContext
  ): Promise<UserLogin> {
    const userLoginResponse = await this.userLoginVerifier.verifyAdminUser(data, ctx);

    return userLoginResponse;
  }
}
