import { IConfig } from 'config';
import { inject, singleton } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { Services } from '../common/constants';
import { IContext } from '../common/interfaces';

export interface IDeletionCode {
  isValid: boolean;
}

@singleton()
export class DeletionCodeVerifier {
  private readonly deletionCode: string;

  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: Logger) {
    this.deletionCode = this.config.get('deletionCode');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async verifyDeletionCode(deletionCode: string, ctx?: IContext): Promise<IDeletionCode> {
    this.logger.info(`[DeletionCodeVerifier][verifyDeletionCode]`);
    const isDeletionCodeVerified = this.deletionCode === deletionCode;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
      resolve({ isValid: isDeletionCodeVerified });
    });
  }
}
