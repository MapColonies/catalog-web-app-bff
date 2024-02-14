import { Logger } from '@map-colonies/js-logger';
import { IConfig } from 'config';
import { inject, singleton } from 'tsyringe';
import { Services } from '../common/constants';
import { IContext } from '../common/interfaces';
import { UserLoginParams } from './inputTypes';

export interface IUserLogin {
  isValid: boolean;
}

@singleton()
export class UserLoginVerifier {
  private readonly admin_pwd: string;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.admin_pwd = this.config.get('adminPassword');
  }

  public async verifyAdminUser(userData: UserLoginParams, ctx?: IContext): Promise<IUserLogin> {
    const isAdminVerified = this.admin_pwd === userData.userPassword;
    return new Promise((resolve, reject) => {
      resolve({ isValid: isAdminVerified });
    });
  }
}
