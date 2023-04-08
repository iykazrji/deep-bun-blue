import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

export default fp(async (server) => {
	const prisma = new PrismaClient();

	let connection_retries = 5;

	while (connection_retries) {
		try {
			await prisma.$connect();

			console.log("DB Connected Successfully 🎉🎉🎉");

			// Add Prisma to fastify instance
			server.decorate("db", prisma);

			break;
		} catch (error) {
			console.log(error);

			connection_retries -= 1;
			console.log("Retries left: ", connection_retries);

			// Add a 3second timer
			const x = 3;
			await new Promise((res) => setTimeout(res, 3000));
		}
	}
});
