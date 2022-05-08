import { Capability } from '../../graphql/capability';
import { CapabilitiesLayersSearchParams } from '../../graphql/inputTypes';

// eslint-disable-next-line import/exports-last
export interface ICapabilitiesManagerService {
  getCapabilities: (params: CapabilitiesLayersSearchParams) => Promise<Capability[]>;
}

export interface ICapabilitiesManagerInstance {
  getCapabilities: (idList: string[]) => Promise<Capability[]>;
}
