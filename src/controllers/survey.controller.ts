import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { SurveyService } from '../services/survey.service';
import { Survey } from '../model/entities/survey';
import { SurveyParams } from './schemas/survey.schema';

const surveyRoute: FastifyPluginAsync = async (app: FastifyInstance) => {

    // get all surveys
    // app.get(
    //     '/survey',
    //     async (request: FastifyRequest, reply: FastifyReply) => {
    //         try {
    //             const userService: SurveyService = app.diContainer.resolve<SurveyService>('userService');
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
    app.get<{ Params: SurveyParams }>(
        '/survey/:id',
        async (request: FastifyRequest<{ Params: SurveyParams }>, reply: FastifyReply) => {
            try {
                const surveyService: SurveyService = app.diContainer.resolve<SurveyService>('userService');
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
    // app.post<{ Body: Survey }>(
    //     '/survey',
    //     { schema: SurveySchema },
    //     async (request: FastifyRequest<{ Body: Survey }>, reply: FastifyReply) => {
    //         try {
    //             return await reply
    //                 .code(201)
    //                 .send(request.body.title);
    //         } catch (error) {
    //             request.log.error(error);
    //             return reply.send(500);
    //         }
    //     });
};

export default fp(surveyRoute);