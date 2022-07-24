import pino, { Logger } from 'pino';
import { pinoOptions } from './config/logger.config';
import { App } from './app';
import fs from 'fs';
import { arangoDsConfig } from './config/data-source.config';
import { serverConfig } from './config/server.config';

const version: string = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
export const logger: Logger = pino(pinoOptions);
const app: App = App.getInstance(arangoDsConfig, serverConfig);
app.run().then(() => logger.info(`Application wano v${ version } is running`));