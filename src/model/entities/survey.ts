export class Survey {

    private _title: string;

    private _category: string;

    constructor(title: string, category: string) {
        this._title = title;
        this._category = category;
    }

    get title(): string {
        return this._title;
    }

    get category(): string {
        return this._category;
    }
}