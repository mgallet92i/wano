import { app } from '../index';
import { Survey } from '../model/entities/survey';
import { SurveyDao } from '../model/dao/arango/survey-dao';
import { Document } from 'arangojs/documents';

export class SurveyService {

    surveyDao: SurveyDao;

    constructor() {
        this.surveyDao = app.diContainer.resolve<SurveyDao>('surveyDao');
    }

    async find(id: string): Promise<Survey> {
        const doc: Document<Survey> = await this.surveyDao.find(id);
        return new Survey(doc.title, doc.category); // todo: use automapper
    }
}