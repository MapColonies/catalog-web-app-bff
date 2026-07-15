import { container } from 'tsyringe';
import { Application } from 'express';
import { Tracing } from '@map-colonies/telemetry';
import { registerExternalValues } from './containerConfig';
import { ServerBuilder } from './serverBuilder';

async function getApp(tracing: Tracing): Promise<Application> {
  registerExternalValues(tracing);
  const app = await container.resolve(ServerBuilder).build();
  return app;
}

export { getApp };
