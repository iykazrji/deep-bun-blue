export async function healthRoutes(fastify) {
	fastify.get("/", (req, res) => {
		res.send({ status: "ok" });
	});
}
