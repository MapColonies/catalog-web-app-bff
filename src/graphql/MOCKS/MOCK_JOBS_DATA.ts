import { ProductType } from '@map-colonies/mc-model-types';
import { Status } from '../job';

export const MOCK_JOBS_DATA = [
  {
    id: '108f23b2-a0af-433e-be30-981d89e10656',
    resourceId: '1_discete_ext',
    version: '1.0',
    type: 'Discrete-Tiling',
    description: 'My description',
    parameters: {},
    status: Status.InProgress,
    percentage: 0,
    reason: '',
    isCleaned: false,
    priority: 0,
    producerName: 'IDFMU',
    productName: '1_discete_ext',
    productType: ProductType.ORTHOPHOTO,
    internalId: 'A very very long internalId',
    created: new Date('2021-05-24T05:33:22.199Z'),
    updated: new Date('2021-05-24T05:33:22.199Z'),
    taskCount: 19,
    completedTasks: 8,
    failedTasks: 4,
    expiredTasks: 0,
    pendingTasks: 6,
    inProgressTasks: 1,
  },
  {
    id: '5907d4de-3afc-41f2-bc32-a904e34adbc0',
    resourceId: '2_discete_ext',
    internalId: 'internalId',
    version: '1.0',
    type: '3D',
    description: 'My description',
    parameters: {},
    status: Status.Pending,
    percentage: 0,
    reason: '',
    isCleaned: false,
    priority: 0,
    producerName: 'IDFMU',
    productName: '2_discete_ext',
    productType: ProductType.ORTHOPHOTO,
    created: new Date('2021-05-24T05:33:51.990Z'),
    updated: new Date('2021-05-24T05:33:51.990Z'),
    taskCount: 2,
    completedTasks: 0,
    failedTasks: 0,
    expiredTasks: 0,
    pendingTasks: 1,
    inProgressTasks: 1,
  },
  {
    id: '5907d4de-3afc-41f2-bc32-a904e34adbc8',
    resourceId: '2_discete_ext very very long very very long ',
    internalId: 'internalId',
    version: '1.0',
    type: '3D',
    description: 'My description',
    parameters: {},
    status: Status.Failed,
    percentage: 0,
    reason: 'Very very very very very long Server responded with status 500',
    isCleaned: false,
    priority: 0,
    producerName: 'A very very long producer name',
    productName: 'A very very long product name',
    productType: ProductType.ORTHOPHOTO,
    created: new Date('2021-05-24T05:33:51.990Z'),
    updated: new Date('2021-05-24T05:33:51.990Z'),
    taskCount: 100000,
    completedTasks: 30000,
    failedTasks: 20000,
    expiredTasks: 0,
    pendingTasks: 30000,
    inProgressTasks: 20000,
  },
  {
    id: '5907d4de-3afc-41f2-bc32-a904e34adbu6',
    resourceId: '2_discete_ext',
    internalId: 'internalId',
    version: '1.0',
    type: '3D',
    description: 'My description',
    parameters: {},
    status: Status.Completed,
    percentage: 0,
    reason: '',
    isCleaned: false,
    priority: 0,
    producerName: 'IDFMU',
    productName: '2_discete_ext',
    productType: ProductType.ORTHOPHOTO,
    created: new Date('2021-05-24T05:33:51.990Z'),
    updated: new Date('2021-05-24T05:33:51.990Z'),
    taskCount: 2,
    completedTasks: 2,
    failedTasks: 0,
    expiredTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
  },
];
