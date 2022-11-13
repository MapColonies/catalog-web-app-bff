import { Capability } from '../../graphql/capability';
import { CapabilitiesLayersSearchParams } from '../../graphql/inputTypes';
import { IContext } from '../interfaces';

// eslint-disable-next-line import/exports-last
export interface ICapabilitiesManagerService {
  getCapabilities: (params: CapabilitiesLayersSearchParams, ctx: IContext) => Promise<Capability[]>;
}

export interface ICapabilitiesManagerInstance {
  getCapabilities: (idList: string[], ctx: IContext) => Promise<Capability[]>;
}
