import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { SurveyParams } from './schemas/survey.schema';
import { SurveyService } from '../services/survey.service';
import { Survey } from '../model/entities/survey';

const surveyRoute: FastifyPluginAsync = async (fi: FastifyInstance) => {

    // get all surveys
    // fi.get(
    //     '/survey',
    //     async (request: FastifyRequest, reply: FastifyReply) => {
    //         try {
    //             const userService: SurveyService = fi.diContainer.resolve<SurveyService>('userService');
    //             const survey: Survey = await userService.find(request.id);
    //             return await reply
    //                 .code(200)
    //                 .send(survey);
    //         } catch (error) {
    //             request.log.error(error);
    //             return reply.send(500);
    //         }
    //     });

    // get survey by id
    fi.get<{ Params: SurveyParams }>(
        '/survey/:id',
        async (request: FastifyRequest<{ Params: SurveyParams }>, reply: FastifyReply) => {
            try {
                const surveyService: SurveyService = fi.diContainer.resolve<SurveyService>('surveyService');
                const survey: Survey = await surveyService.find(request.params.id);
                return await reply
                    .code(200)
                    .send(survey);
            } catch (error) {
                request.log.error(error);
                return reply.send(400);
            }
        });

    // save survey
    fi.post<{ Body: Survey }>(
        '/survey', // todo: use validator ??? => { schema: SurveySchema },
        async (request: FastifyRequest<{ Body: Survey }>, reply: FastifyReply) => {
            try {
                const surveyService: SurveyService = fi.diContainer.resolve<SurveyService>('surveyService');
                const surveyKey: string = await surveyService.save(request.body);
                return await reply
                    .code(200)
                    .send(surveyKey);
            } catch (error) {
                request.log.error(error);
                return reply.send(500);
            }
        });
};

export default fp(surveyRoute);