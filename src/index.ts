import Fastify, { FastifyInstance } from 'fastify';
import { host, port } from './config/config';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import surveyController from './controllers/survey.controller';

const server: FastifyInstance = Fastify({ logger: true })
    .withTypeProvider<TypeBoxTypeProvider>();

server.register(surveyController);

server.listen(
    { port, host },
    (err: Error, address: string) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${ address }`);
    });
