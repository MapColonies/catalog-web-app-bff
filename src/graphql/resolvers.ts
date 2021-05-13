import { Logger } from '@map-colonies/js-logger';
import { container } from 'tsyringe';
import { Resolver, Query, createUnionType, NonEmptyArray, Arg } from 'type-graphql';
import { Layer3DRecord, LayerRasterRecord } from '../AUTOGENERATED/GraphQLClass';
import { Services } from '../common/constants';
import { CSW } from '../csw/csw';
import { SearchOptions } from './inputTypes';

type LayerMetadataUnionType = Layer3DRecord | LayerRasterRecord;

@Resolver()
class LayerMetadataMixedResolver {
  private readonly csw: CSW;
  private readonly logger: Logger;

  public constructor() {
    this.csw = container.resolve(CSW);
    this.logger = container.resolve(Services.LOGGER);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((type) => [LayerMetadataMixedUnion])
  public async search(
    @Arg('start', { nullable: true })
    start?: number,
    @Arg('end', { nullable: true })
    end?: number,
    @Arg('opts', { nullable: true })
    opts?: SearchOptions
  ): Promise<LayerMetadataUnionType[]> {
    try {
      const data = await this.csw.getRecords(start, end, opts);
      return data;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const LayerMetadataMixedUnion = createUnionType({
  name: 'LayerMetadataMixed',
  types: () => [Layer3DRecord, LayerRasterRecord] as const,
  resolveType: (value) => {
    if ('accuracyLE90' in value) {
      return Layer3DRecord;
    } else {
      return LayerRasterRecord;
    }
  },
}) as LayerMetadataUnionType;

// eslint-disable-next-line @typescript-eslint/ban-types
export function getResolvers(): NonEmptyArray<Function> | NonEmptyArray<string> {
  return [LayerMetadataMixedResolver];
}
