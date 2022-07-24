import { Database } from 'arangojs';
import { ArangoDataSourceConfig } from '../../config/data-source.config';
import { DataSource } from './data-source';
import { logger } from '../../index';

export class ArangoDataSource implements DataSource {

    private _config: ArangoDataSourceConfig;

    private _db: Database;

    constructor(config: ArangoDataSourceConfig) {
        this._config = config;
    }

    get db(): Database {
        return this._db;
    }

    get config(): ArangoDataSourceConfig {
        return this._config;
    }

    async connect(): Promise<boolean> {
        if (this._db != null) {
            this.close();
        }

        if (this._config.architecture === 'single' && this._config.authMode === 'basic') {
            // todo: check config format
            this._db = new Database(this._config);

            if (Array.isArray(this._config.url) && this._config.loadBalancingStrategy !== 'NONE') {
                await this._db.acquireHostList();
            }

            let exist: boolean;
            try {
                exist = await this._db.exists();
            } catch (e) {
                logger.error(e.message);
                exist = false;
            }

            return exist;
        }

        // if (this._config.architecture === 'single' &&
        //     this._config.authMode === 'basic' &&
        //     this._config.authMode === 'basic'
        // ) {
        //
        // }

        // await db.waitForPropagation({ path: `/_api/gharial/${graph.name}` }, 10000);

        // mode cluster
        // const db = new Database({ loadBalancingStrategy: "ROUND_ROBIN" });
        // await system.acquireHostList();
        // const analyzer = db.analyzer("my-analyzer");
        // await analyzer.create();
        // await db.waitForPropagation(
        //     { path: `/_api/analyzer/${encodeURIComponent(analyzer.name)}` },
        //     30000
        // );
        // Analyzer has been propagated to all coordinators and can safely be used


        return false;
    }

    close() {
        this._db.close();
    }
}