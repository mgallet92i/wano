import Fastify, { FastifyInstance, HookHandlerDoneFunction } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import surveyController from './controllers/survey.controller';
import { IncomingMessage, Server, ServerResponse } from 'http';
import pino, { Logger } from 'pino';
import { pinoOptions } from './config/logger.config';
import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix';
import { serverConfig } from './config/app.config';
import { asClass, asValue, Lifetime } from 'awilix';
import { SurveyService } from './services/survey.service';
import { arangodbConfig } from './config/data-source.config';
import { DataSource } from './model/datasource/data-source';
import { DataSourceFactory } from './model/datasource/data-source.factory';
import { SurveyDao } from './model/dao/arango/survey-dao';

export const logger: Logger = pino(pinoOptions);

// 1st connect to datasource
const datasource: DataSource = DataSourceFactory.createDatasource('arangodb', arangodbConfig);

// todo: exists() is not generic (specific method of arangodb)
//const dbExist: boolean = await datasource.db.exists();


// todo: make singleton object ???
export const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = Fastify({ logger: true })
    .withTypeProvider<TypeBoxTypeProvider>();

app.register(fastifyAwilixPlugin, { disposeOnClose: true, disposeOnResponse: false });
diContainer.register(
    {
        dataBase: asValue(datasource.db),
        userService: asClass(SurveyService, { lifetime: Lifetime.SINGLETON }),
        surveyDao: asClass(SurveyDao, { lifetime: Lifetime.SINGLETON })
    }
);

app.register(surveyController);

app.listen(
    { port: serverConfig.port, host: serverConfig.host },
    (err: Error, address: string) => {
        if (err) {
            logger.error(err);
            process.exit(1);
        }
        logger.info(`Server listening at ${ address }`);
    }
);

app.addHook('onClose', (instance: any, done: HookHandlerDoneFunction) => {
    datasource.db.close();
    done();
});