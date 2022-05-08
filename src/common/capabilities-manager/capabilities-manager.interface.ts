import { RecordType } from '@map-colonies/mc-model-types';
import { Capability } from '../../graphql/capability';

// eslint-disable-next-line import/exports-last
export interface ICapabilitiesManagerService {
  getCapabilities: (recordType: RecordType, idList: string[]) => Promise<Capability[]>;
}
