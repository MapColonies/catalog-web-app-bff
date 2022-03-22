import { DeploymentWithServices } from '../../service-discovery';

export const MOCK_DEPS_AND_SERVICES: DeploymentWithServices[] = [
  {
    image: 'raster:V1.1.0',
    name: 'raster-overseer',
    status: true,
    services: [
      {
        addresses: ['123.123.123:1000'],
        name: 'overseer-raster',
        uid: '1231abcde',
      },
    ],
  },
  {
    image: 'dem:V1.2.2',
    name: 'dem-blah',
    status: true,
    services: [
      {
        addresses: ['123.123.125:1009'],
        name: 'dem-map',
        uid: '1231abcdef',
      },
      {
        addresses: ['123.123.111:101222'],
        name: 'dem-map2',
        uid: 'asdsadasd2321321',
      },
    ],
  },
  {
    image: '3d:V4.1.0',
    name: '3d-kuku',
    status: false,
    services: [
      {
        addresses: ['123.123.111:3343'],
        name: '3d-maps',
        uid: '1231abcdefg',
      },
      {
        addresses: ['123.123.111:222'],
        name: '3d-maps2',
        uid: '1231abcjjjjdefg',
      },
      {
        addresses: ['123.123.111:7765'],
        name: '3d-maps3',
        uid: '56546456456hh',
      },
    ],
  },
];
