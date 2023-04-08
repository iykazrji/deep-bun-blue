import Fastify from "fastify";
import fastifyCors from "@fastify/cors";

// Routes
import { healthRoutes } from "../src/routes/health";
import { usersRoutes } from "../src/routes/users";

// Plugins
import db from "./plugins/db";

const fastify = Fastify({ logger: true });

export const createServer = async () => {
	await fastify.register(fastifyCors);

	await fastify.register(db);

	await fastify.register(healthRoutes, {
		prefix: "/health",
	});

	await fastify.register(usersRoutes, {
		prefix: "/users",
	});

	fastify.setErrorHandler((error, req, res) => {
		req.log.error(error.toString());
		res.send({ error });
	});

	return fastify;
};
