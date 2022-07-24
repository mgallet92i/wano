export interface Dao<T> {

    find(id: string): Promise<T> | null;

    // findAll(): T[];
    //
    save(data: T): Promise<string>;

    //
    // saveAll(data: T[]);
    //
    // update(data: T);
    //
    // delete(data: T);
}