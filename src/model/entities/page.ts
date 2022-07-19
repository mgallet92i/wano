export class Page {

    private title: string;

    private description: string;

    private pageSkipLogic: string;

    constructor(title: string, description: string, pageSkipLogic: string) {
        this.title = title;
        this.description = description;
        this.pageSkipLogic = pageSkipLogic;
    }
}