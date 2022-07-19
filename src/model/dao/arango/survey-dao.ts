import { Survey } from '../../entities/survey';
import { DocumentCollection } from 'arangojs/collection';
import { Document } from 'arangojs/documents';

export class SurveyDao { // todo: implements Dao<Survey>

    readonly COLLECTION_NAME: string = 'survey';

    collection: DocumentCollection<Survey>;

    // eslint-disable-next-line @typescript-eslint/typedef
    constructor({ dataBase }) {
        this.collection = dataBase.collection(this.COLLECTION_NAME);
    }

    async find(id: string): Promise<Document<Survey>> | null {
        return this.collection.document(id, true);
    }

    // async filter(): Promise<Document<Survey>[]> {
    //     try {
    //         return await this.collection.documents([]);
    //     } catch (e) {
    //         return [];
    //     }
    // }

    save(data: Survey) {
    }

    saveAll(data: Survey[]) {
    }

    update(data: Survey) {
    }

    delete(data: Survey) {
    }

    dispose() {

    }
}