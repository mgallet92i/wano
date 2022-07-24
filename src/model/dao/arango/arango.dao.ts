import { Document } from 'arangojs/documents';


export abstract class ArangoDao<T> {

    protected convert(source: Document<T>, target: T): T {
        return Object.fromEntries(Object.keys(target).map((k: string) => [k, source[k]])) as T;
    }

}