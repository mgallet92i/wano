import { Database as ArangoDataBase } from 'arangojs';
import { DataSourceConfig } from '../../config/data-source.config';

export type DataBase = ArangoDataBase; // todo: mongo, ...

export interface DataSource {

    config: DataSourceConfig;

    db: DataBase;

    connect(): Promise<boolean>;

    close(): void;
}