import { FastifyReply } from "fastify";

export async function usersRoutes(fastify) {
	fastify.get("/", async (_, res: FastifyReply) => {
		try {
			const users = await fastify.db.user.findMany();
			res.status(200).send({
				message: "Users fetched successfully",
				users,
			});
		} catch (e) {
			res.status(500).send({ error: e.message });
		}
	});

	fastify.get("/:name", async (req, res: FastifyReply) => {
		const { name } = req.params;
		try {
			const user = await fastify.db.user.findUnique({
				where: {
					name,
				},
			});

			res.status(200).send(user);
		} catch (e) {
			res.status(500).send({ error: e.message });
		}
	});

	fastify.post("/", async (req, res: FastifyReply) => {
		const { name, email } = req.body;

		try {
			const user = await fastify.db.user.create({
				data: {
					name,
					email,
				},
			});

			res.status(200).send({
				message: "User created successfully",
				user,
			});
		} catch (e) {
			res.status(409).send({ error: e.message });
		}
	});

	fastify.put("/:name", async (req, res: FastifyReply) => {
		const { name } = req.params;
		const { email } = req.body;

		try {
			const user = await fastify.db.user.update({
				where: {
					name,
				},
				data: {
					email,
				},
			});

			res.send(user);
		} catch (e) {
			res.status(500).send({ error: e.message });
		}
	});
}
