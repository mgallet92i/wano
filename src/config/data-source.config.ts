import { Config as ArangodbConfig } from 'arangojs/connection';

export type DataSourceConfig = ArangodbConfig; // Mongodb | ...

export const arangodbConfig: ArangodbConfig = {
    databaseName: 'wanodb',
    url: 'http://localhost:8529',
    auth: { username: 'wano', password: 'philly27' }
};