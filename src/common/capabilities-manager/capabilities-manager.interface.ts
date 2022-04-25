import { Capability } from '../../graphql/capability';

// eslint-disable-next-line import/exports-last
export interface ICapabilitiesManagerService {
  getCapabilities: (idList: string[]) => Promise<Capability[]>;
}
