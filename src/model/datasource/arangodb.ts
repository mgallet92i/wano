import { Config as ArangodbConfig } from 'arangojs/connection';
import { Database } from 'arangojs';

export class Arangodb {

    private _db: Database;

    constructor(config: ArangodbConfig) {
        this._db = new Database(config);
    }

    get db(): Database {
        return this._db;
    }
}