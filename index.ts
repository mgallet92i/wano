import fastify, {FastifyInstance} from 'fastify';

const port: string | number = process.env.API_PORT || 5000;
const server: FastifyInstance = fastify();
server.listen(port, (err: Error, address: string) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
