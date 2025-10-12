
import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUsersRespositiory } from "@/repositories/prisma/prisma-user-repository.js";
import { RegisterService } from "@/services/register.js";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  try {
    const prismaUsersRespositiory = new PrismaUsersRespositiory();
    const registerService = new RegisterService(prismaUsersRespositiory)

    await registerService.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    return res.status(409).send();
  }

  return res.status(201).send();
}
