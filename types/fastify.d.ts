import { PrismaClient } from "@prisma/client";
import { FastifyRequestType } from "fastify/types/type-provider";

type ExtendedParams = FastifyRequestType["params"] & {
	name: string;
};

declare module "fastify" {
	export interface FastifyInstance {
		db: PrismaClient;
	}
}
