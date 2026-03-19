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
  numberOfRecordsMatched: number;
  @Field(() => Number)
  numberOfRecordsReturned: number;
  @Field(() => Number)
  nextRecord: number;
}

@ObjectType()
export class CSWCatalog {
  @Field(() => [LayerMetadataMixedUnion])
  records?: LayerMetadataUnionType[];
  @Field(() => CSWQuerySummary, { nullable: true })
  cswQuerySummary?: CSWQuerySummary;
}

@ObjectType()
export class CSWCatalogs {
  @Field(() => CSWCatalog, { nullable: true })
  [DOMAIN_RASTER]?: CSWCatalog;
  @Field(() => CSWCatalog, { nullable: true })
  [DOMAIN_DEM]?: CSWCatalog;
  @Field(() => CSWCatalog, { nullable: true })
  [DOMAIN_VECTOR]?: CSWCatalog;
  @Field(() => CSWCatalog, { nullable: true })
  [DOMAIN_3D]?: CSWCatalog;
}
