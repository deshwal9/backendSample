import Fastify from 'fastify';
import proxy from '@fastify/http-proxy';
import cors from '@fastify/cors';

const server = Fastify({ logger: true });

const env = {
  port: parseInt(process.env.PORT || '3000', 10),
  studentServiceUrl: process.env.STUDENT_SERVICE_URL || 'http://localhost:3001'
};

server.get('/health', async () => ({ status: 'ok', service: 'gateway-service' }));

server.setNotFoundHandler((_req, reply) => reply.code(404).send({ error: 'Not Found' }));

async function start() {
  try {
    await server.register(cors, { origin: true });
    await server.register(proxy, {
      upstream: env.studentServiceUrl,
      prefix: '/api',
      http2: false,
      rewritePrefix: '/'
    });
    await server.listen({ port: env.port, host: '0.0.0.0' });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

start();

