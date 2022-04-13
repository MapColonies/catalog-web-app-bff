import { Capability } from '../../graphql/capability';
import { LayerSearchParams } from '../../graphql/inputTypes';

// eslint-disable-next-line import/exports-last
export interface ICapabilitiesManagerService {
  getCapabilities: (data: LayerSearchParams) => Promise<Capability | undefined>;
}
