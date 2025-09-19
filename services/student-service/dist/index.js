import Fastify from 'fastify';
import mongoose from 'mongoose';
import cors from '@fastify/cors';
import { z } from 'zod';
const server = Fastify({ logger: true });
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true }
}, { timestamps: true });
const StudentModel = mongoose.model('Student', studentSchema);
const env = {
    port: parseInt(process.env.PORT || '3001', 10),
    mongoUri: process.env.MONGO_URI || 'mongodb+srv://ankit9deshwal9_db_user:KEhilmcJRcNlqUbI@studentservices.5ebb7rj.mongodb.net/'
};
server.get('/health', async () => ({ status: 'ok', service: 'student-service' }));
const CreateStudentBody = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    age: z.number().int().min(1)
});
server.post('/students', async (request, reply) => {
    const parsed = CreateStudentBody.safeParse(request.body);
    if (!parsed.success) {
        return reply.code(400).send({ error: 'Invalid body', details: parsed.error.format() });
    }
    try {
        const created = await StudentModel.create(parsed.data);
        return reply.code(201).send(created);
    }
    catch (error) {
        if (error?.code === 11000) {
            return reply.code(409).send({ error: 'Email already exists' });
        }
        request.log.error(error);
        return reply.code(500).send({ error: 'Failed to create student' });
    }
});
server.get('/students', async (_request, reply) => {
    try {
        const list = await StudentModel.find().sort({ createdAt: -1 }).lean();
        return reply.send(list);
    }
    catch (error) {
        return reply.code(500).send({ error: 'Failed to fetch students' });
    }
});
async function start() {
    try {
        await server.register(cors, { origin: true });
        await mongoose.connect(env.mongoUri);
        await server.listen({ port: env.port, host: '0.0.0.0' });
    }
    catch (error) {
        server.log.error(error);
        process.exit(1);
    }
}
start();
