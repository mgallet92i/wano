import { DataSourceConfig } from '../../config/data-source.config';
import { DataSource } from './data-source';
import { Arangodb } from './arangodb';
import { logger } from '../../index';

export class DataSourceFactory {

    static createDatasource(type: string, config: DataSourceConfig): DataSource {
        switch (type) {
            case 'arangodb':
                return new Arangodb(config);
            default:
                logger.error(`database type unknown: ${ type }`);
                return null;
        }
    }
}