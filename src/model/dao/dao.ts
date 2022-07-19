export interface Dao<T> {

    find(id: string): T | null;

    findAll(): T[];

    save(data: T);

    saveAll(data: T[]);

    update(data: T);

    delete(data: T);
}