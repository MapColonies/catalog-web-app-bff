import { Logger } from '@map-colonies/js-logger';
import { IContext, IService } from '../common/interfaces';
import { extractErrorMessage, requestExecutor } from '../utils';
import { IWFSClientOptions } from './wfs-client/interfaces';
import WfsClient from './wfs-client/wfs-client';

export const WFS_CLIENT_PLACEHOLDER_BASE_URL = 'NOT_IN_USE.COM';

export interface CreateWfsClientOptions {
  service: IService;
  logger: Logger;
  context: IContext;
  logPrefix: string;
  unavailableMessage: string;
}

export const createWfsClient = ({ service, logger, context, logPrefix, unavailableMessage }: CreateWfsClientOptions): WfsClient => {
  const wfsClientOptions: IWFSClientOptions = {
    baseUrl: WFS_CLIENT_PLACEHOLDER_BASE_URL,
    requestExecutor: async (url, method, params): Promise<unknown> => {
      try {
        return await requestExecutor(service, method, params, context);
      } catch (err) {
        logger.error(`[${logPrefix}][requestExecutor][ERROR] ${extractErrorMessage(err)}`);
        throw new Error(unavailableMessage);
      }
    },
  };

  return new WfsClient(wfsClientOptions, logger);
};
