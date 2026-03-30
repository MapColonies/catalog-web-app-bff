// import { Domain } from "@map-colonies/types";
import { Field, ObjectType } from 'type-graphql';
import { LayerMetadataMixedUnion, LayerMetadataUnionType } from './resolvers/csw.resolver';
import { Domain } from './domain';

const DOMAIN_RASTER = `_${Domain.RASTER}` as const;
const DOMAIN_3D = `_${Domain['3D']}` as const;
const DOMAIN_DEM = `_${Domain.DEM}` as const;
const DOMAIN_VECTOR = `_${Domain.VECTOR}` as const;

@ObjectType()
export class CSWQuerySummary {
  @Field(() => Number)
  public numberOfRecordsMatched: number;
  @Field(() => Number)
  public numberOfRecordsReturned: number;
  @Field(() => Number)
  public nextRecord: number;
}

@ObjectType()
export class CSWCatalog {
  @Field(() => [LayerMetadataMixedUnion])
  public records?: LayerMetadataUnionType[];
  @Field(() => CSWQuerySummary, { nullable: true })
  public cswQuerySummary?: CSWQuerySummary;
}

@ObjectType()
export class CSWCatalogs {
  @Field(() => CSWCatalog, { nullable: true })
  public [DOMAIN_RASTER]?: CSWCatalog;
  @Field(() => CSWCatalog, { nullable: true })
  public [DOMAIN_DEM]?: CSWCatalog;
  @Field(() => CSWCatalog, { nullable: true })
  public [DOMAIN_VECTOR]?: CSWCatalog;
  @Field(() => CSWCatalog, { nullable: true })
  public [DOMAIN_3D]?: CSWCatalog;
}
