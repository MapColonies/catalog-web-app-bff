import { container } from 'tsyringe';
import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { Logger } from '@map-colonies/js-logger';
import { BasemapManager } from '../../common/basemap-manager/basemap-manager';
import { Services } from '../../common/constants';
import { IContext } from '../../common/interfaces';
import { extractErrorMessage } from '../../utils';
import { Basemap, BasemapExportPackage, CreateBasemapInput, ImportReview, UpdateBasemapInput } from '../basemap';

@Resolver()
export class BasemapResolver {
  private readonly logger: Logger;
  private readonly basemapManager: BasemapManager;

  public constructor() {
    this.logger = container.resolve(Services.LOGGER);
    this.basemapManager = container.resolve(BasemapManager);
  }

  @Query(() => [Basemap])
  public async basemaps(@Ctx() ctx: IContext): Promise<Basemap[]> {
    try {
      return await this.basemapManager.getBasemaps(ctx);
    } catch (err) {
      this.logger.error(`[BasemapManager][basemaps][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  @Query(() => Basemap, { nullable: true })
  public async basemap(@Arg('id') id: string, @Ctx() ctx: IContext): Promise<Basemap> {
    try {
      return await this.basemapManager.getBasemap(id, ctx);
    } catch (err) {
      this.logger.error(`[BasemapManager][basemap][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  @Mutation(() => Basemap)
  public async createBasemap(@Arg('data') data: CreateBasemapInput, @Ctx() ctx: IContext): Promise<Basemap> {
    try {
      return await this.basemapManager.createBasemap(data, ctx);
    } catch (err) {
      this.logger.error(`[BasemapManager][createBasemap][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  @Mutation(() => Basemap)
  public async updateBasemap(@Arg('id') id: string, @Arg('data') data: UpdateBasemapInput, @Ctx() ctx: IContext): Promise<Basemap> {
    try {
      return await this.basemapManager.updateBasemap(id, data, ctx);
    } catch (err) {
      this.logger.error(`[BasemapManager][updateBasemap][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  @Mutation(() => String)
  public async deleteBasemap(@Arg('id') id: string, @Ctx() ctx: IContext): Promise<string> {
    try {
      return await this.basemapManager.deleteBasemap(id, ctx);
    } catch (err) {
      this.logger.error(`[BasemapManager][deleteBasemap][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  @Query(() => BasemapExportPackage)
  public async exportBasemap(@Arg('id') id: string, @Ctx() ctx: IContext): Promise<BasemapExportPackage> {
    try {
      return await this.basemapManager.exportBasemap(id, ctx);
    } catch (err) {
      this.logger.error(`[BasemapManager][exportBasemap][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }

  @Mutation(() => ImportReview)
  public async validateBasemapImport(
    @Arg('fileBase64') fileBase64: string,
    @Arg('filename') filename: string,
    @Ctx() ctx: IContext
  ): Promise<ImportReview> {
    try {
      return await this.basemapManager.validateBasemapImport(fileBase64, filename, ctx);
    } catch (err) {
      this.logger.error(`[BasemapManager][validateBasemapImport][ERROR] ${extractErrorMessage(err)}`);
      throw err;
    }
  }
}
