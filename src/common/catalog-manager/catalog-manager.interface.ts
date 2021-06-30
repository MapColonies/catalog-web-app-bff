import { LayerMetadataUnionType } from '../../graphql/resolvers/csw.resolver';

// eslint-disable-next-line import/exports-last
export interface ICatalogManagerService {
  updateMetadata: (data: LayerMetadataUnionType) => Promise<LayerMetadataUnionType>;
}
