import { IConfig } from 'config';
import { inject, singleton } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { Services } from '../common/constants';
import { IContext } from '../common/interfaces';
import { UserLoginParams } from './inputTypes';

export interface IUserLogin {
  isValid: boolean;
}

@singleton()
export class UserLoginVerifier {
  private readonly adminPwd: string;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.adminPwd = this.config.get('adminPassword');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async verifyAdmin(userData: UserLoginParams, ctx?: IContext): Promise<IUserLogin> {
    this.logger.info(`[UserLoginVerifier][verifyAdmin]`);
    const isAdminVerified = this.adminPwd === userData.userPassword;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
      resolve({ isValid: isAdminVerified });
    });
  }
}
