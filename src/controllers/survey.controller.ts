import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { Survey, SurveyParams, SurveySchema } from '../schemas/survey.schema';

const SurveyRoute: FastifyPluginAsync = async (server: FastifyInstance) => {

    // get all surveys
    server.get(
        '/survey',
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                return await reply
                    .code(200)
                    .send('hello world');
            } catch (error) {
                request.log.error(error);
                return reply.send(500);
            }
        });

    // get survey by id
    server.get<{ Params: SurveyParams }>(
        '/survey/:id',
        async (request: FastifyRequest<{ Params: SurveyParams }>, reply: FastifyReply) => {
            try {
                return await reply
                    .code(200)
                    .send(request.params.id);
            } catch (error) {
                request.log.error(error);
                return reply.send(400);
            }
        });

    // save survey
    server.post<{ Body: Survey }>(
        '/survey',
        { schema: SurveySchema },
        async (request: FastifyRequest<{ Body: Survey }>, reply: FastifyReply) => {
            try {
                return await reply
                    .code(201)
                    .send(request.body.title);
            } catch (error) {
                request.log.error(error);
                return reply.send(500);
            }
        });
};

export default fp(SurveyRoute);
