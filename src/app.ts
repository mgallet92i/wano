import { DataSource } from './model/datasource/data-source';
import { DataSourceFactory } from './model/datasource/data-source.factory';
import { DataSourceConfig } from './config/data-source.config';
import { logger } from './index';
import Fastify, { FastifyInstance, HookHandlerDoneFunction } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { ServerConfig } from './config/server.config';
import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix';
import { asClass, asValue, Lifetime } from 'awilix';
import { SurveyService } from './services/survey.service';
import { SurveyArangoDao } from './model/dao/arango/survey-arango.dao';
import surveyController from './controllers/survey.controller';

// import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

export class App {

    private static instance: App;

    fastifyInstance: FastifyInstance<Server, IncomingMessage, ServerResponse>;

    datasource: DataSource;

    dataSourceConfig: DataSourceConfig;

    serverConfig: ServerConfig;

    constructor(dataSourceConfig: DataSourceConfig, serverConfig: ServerConfig) {
        this.dataSourceConfig = dataSourceConfig;
        this.serverConfig = serverConfig;
    }

    public static getInstance(dataSourceConfig: DataSourceConfig, serverConfig: ServerConfig): App {
        if (!App.instance) {
            App.instance = new App(dataSourceConfig, serverConfig);
        }
        return App.instance;
    }

    async run() {
        this.datasource = await DataSourceFactory.createDatasource(this.dataSourceConfig);

        if (this.datasource == null) {
            logger.error('not data source found');

            process.exit(1);
            // todo: retry n times every xx seconds
        }

        if (this.datasource.db == null) {
            logger.error('not database found');
            process.exit(1);
        }

        // todo : use validator for input object ???
        // cf: https://www.fastify.io/docs/latest/Reference/Type-Providers/ => TypeBoxTypeProvider
        this.fastifyInstance = Fastify({ logger: true }); // .withTypeProvider<TypeBoxTypeProvider>();
        this.fastifyInstance.register(fastifyAwilixPlugin, { disposeOnClose: true, disposeOnResponse: false });

        // init the bean container
        diContainer.register(
            {
                dataBase: asValue(this.datasource.db),
                surveyService: asClass(SurveyService, { lifetime: Lifetime.SINGLETON }),
                surveyDao: asClass(SurveyArangoDao, { lifetime: Lifetime.SINGLETON })
            }
        );

        this.fastifyInstance.register(surveyController);

        this.fastifyInstance.listen(
            { port: this.serverConfig.port, host: this.serverConfig.host },
            (err: Error, address: string) => {
                if (err) {
                    logger.error(err);
                    process.exit(1);
                }
                logger.info(`Server listening at ${ address }`);
            }
        );

        this.fastifyInstance.addHook('onClose', (instance: any, done: HookHandlerDoneFunction) => {
            this.datasource.close();
            done();
        });
    }

}