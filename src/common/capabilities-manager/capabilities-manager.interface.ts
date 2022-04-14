import { Capability } from '../../graphql/capability';
import { CapabilitiesLayerSearchParams } from '../../graphql/inputTypes';

// eslint-disable-next-line import/exports-last
export interface ICapabilitiesManagerService {
  getCapabilities: (data: CapabilitiesLayerSearchParams) => Promise<Capability | undefined>;
}
