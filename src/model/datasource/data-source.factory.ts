import { DataSourceConfig } from '../../config/data-source.config';
import { DataSource } from './data-source';
import { ArangoDataSource } from './arango-data-source';
import { logger } from '../../index';

export class DataSourceFactory {

    static async createDatasource(config: DataSourceConfig): Promise<DataSource> {
        let ds: DataSource;

        switch (config.type) {
            case 'arangodb':
                ds = new ArangoDataSource(config);
                break;
            default:
                logger.error(`database type unknown: ${ config.type }`);
                return null;
        }

        const isConnected: boolean = await ds.connect();
        if (!isConnected) {
            return null;
        }

        return ds;
    }
}