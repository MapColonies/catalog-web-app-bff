import { Capability } from '../../graphql/capability';
import { CapabilitiesLayersSearchParams } from '../../graphql/inputTypes';
import { IContext } from '../interfaces';

export interface ICapabilitiesManagerService {
  getCapabilities: (params: CapabilitiesLayersSearchParams, ctx: IContext) => Promise<Capability[]>;
}

export interface ICapabilitiesManagerInstance {
  getCapabilities: (idList: string[], ctx: IContext) => Promise<Capability[]>;
}
