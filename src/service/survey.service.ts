import { logger } from '../index';
import { Survey } from '../model/entity/survey';
import { Dao } from '../model/dao/dao';

export class SurveyService {

    surveyDao: Dao<Survey>;

    // eslint-disable-next-line @typescript-eslint/typedef
    constructor({ surveyDao }) {
        this.surveyDao = surveyDao;
    }

    async find(id: string): Promise<Survey> {
        try {
            return await this.surveyDao.find(id);
        } catch (e) {
            logger.error(e);
        }
    }

    async save(data: Survey): Promise<string> {
        try {
            return await this.surveyDao.save(data);
        } catch (e) {
            logger.error(e);
        }
    }
}