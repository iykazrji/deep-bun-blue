import { createServer as server } from "./server";

const PORT = process.env.PORT || "3000";
const init = async () => {
	const fastify = await server();

	fastify.listen(
		{ port: Number.parseInt(PORT), host: "0.0.0.0" },
		(err, address) => {
			if (err) throw err;
			console.log(`fastify 🚀 server listening on ${address}`);
		}
	);

	return fastify;
};

module.exports = init();
