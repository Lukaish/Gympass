
import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { registerService } from "@/services/register.js";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  try {
    await registerService({
      name,
      email,
      password,
    });
  } catch (error) {
    return res.status(409).send();
  }

  return res.status(201).send();
}
