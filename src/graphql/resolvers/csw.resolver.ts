import { Logger } from '@map-colonies/js-logger';
import { ProductType, RecordType } from '@map-colonies/mc-model-types';
import { container } from 'tsyringe';
import { Resolver, Query, Mutation, createUnionType, Arg } from 'type-graphql';
import { BestRecord, Layer3DRecord, LayerDemRecord, LayerRasterRecord, VectorBestRecord } from '../../AUTOGENERATED/GraphQLClass';
import { CatalogManager } from '../../common/catalog-manager/catalog-manager';
import { Services } from '../../common/constants';
import { IngestionManager } from '../../common/ingestion-manager/ingestion-manager';
import { CSW } from '../../csw/csw';
import { Ingestion3DData, IngestionDemData, IngestionRasterData, RecordUpdatePartial, SearchOptions, StringArray } from '../inputTypes';
import { StringArrayObjectType } from '../simpleTypes';

// eslint-disable-next-line @typescript-eslint/naming-convention
const LayerMetadataMixedUnion = createUnionType({
  name: 'LayerMetadataMixed',
  types: () => [Layer3DRecord, LayerRasterRecord, BestRecord, LayerDemRecord, VectorBestRecord] as const,
  resolveType: (value) => {
    if ('maxAccuracyCE90' in value) {
      return Layer3DRecord;
    } else if ('verticalDatum' in (value as LayerDemRecord)) {
      return LayerDemRecord;
    } else if ('discretes' in (value as BestRecord)) {
      return BestRecord;
    } else if (value.productType === ProductType.RASTER_VECTOR_BEST) {
      return VectorBestRecord;
    } else {
      return LayerRasterRecord;
    }
  },
}) as LayerMetadataUnionType;

@Resolver()
export class LayerMetadataMixedResolver {
  private readonly csw: CSW;
  private readonly catalogManager: CatalogManager;
  private readonly ingestionManager: IngestionManager;
  private readonly logger: Logger;

  public constructor() {
    this.csw = container.resolve(CSW);
    this.logger = container.resolve(Services.LOGGER);
    this.catalogManager = container.resolve(CatalogManager);
    this.ingestionManager = container.resolve(IngestionManager);
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((type) => [LayerMetadataMixedUnion])
  public async searchById(
    @Arg('idList', { nullable: false })
    idList: StringArray
  ): Promise<LayerMetadataUnionType[]> {
    try {
      const data = await this.csw.getRecordsById(idList.value);
      return data;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((type) => StringArrayObjectType)
  public async getDomain(
    @Arg('domain', { nullable: false })
    domain: string,
    @Arg('recordType', { nullable: false })
    recordType: RecordType
  ): Promise<StringArrayObjectType> {
    try {
      const data = await this.csw.getDomain(domain, recordType);

      return {
        value: data,
      };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((type) => String)
  public async updateMetadata(
    @Arg('data')
    data: RecordUpdatePartial
  ): Promise<string> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await this.catalogManager.updateMetadata(data);
      return 'ok';
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((type) => String)
  public async startRasterIngestion(
    @Arg('data')
    data: IngestionRasterData
  ): Promise<string> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await this.ingestionManager.ingest(data);
      return 'ok';
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((type) => String)
  public async start3DIngestion(
    @Arg('data')
    data: Ingestion3DData
  ): Promise<string> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await this.ingestionManager.ingest(data);
      return 'ok';
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((type) => String)
  public async startDemIngestion(
    @Arg('data')
    data: IngestionDemData
  ): Promise<string> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await this.ingestionManager.ingest(data);
      return 'ok';
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}

export type LayerMetadataUnionType = LayerDemRecord | Layer3DRecord | LayerRasterRecord | BestRecord | VectorBestRecord;
