import { Config } from 'arangojs/connection';

export interface ArangoDataSourceConfig extends Config {
    type: string;
    model: 'collection' | 'graph';
    authMode: 'basic' | 'bearer';
    architecture?: 'single' | 'cluster';
}

export type DataSourceConfig = ArangoDataSourceConfig; // Mongodb | ...

// single server, no replica
export const arangoDsConfig: ArangoDataSourceConfig = {
    type: 'arangodb',
    architecture: 'single',
    model: 'graph',
    authMode: 'basic',
    databaseName: 'wanodb',
    url: 'http://localhost:8529',
    auth: { username: 'wano', password: 'philly27' },
    loadBalancingStrategy: 'ROUND_ROBIN'
};


// single server, leader-followers (url.length > 1)
// TODO

// cluster
// TODO
