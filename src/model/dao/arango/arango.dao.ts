import { Document } from 'arangojs/documents';

export abstract class ArangoDao<T> {

    private entityKeys: string[];

    constructor(type: new () => T) {
        this.entityKeys = Object.keys(new type());
    }

    /**
     * convert arango Document to "his" entity
     * need the attributes of the entity: this.entityKeys generate at construction
     * @param source - The Document
     */
    protected toEntity(source: Document<T>): T {
        return Object.fromEntries(this.entityKeys.map((k: string) => [k, source[k]])) as T;
    }

}