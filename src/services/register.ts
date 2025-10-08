import { prisma } from "@/lib/prisma.js";
import { hash } from "bcryptjs";

interface IRegisterService {
  name: string;
  email: string;
  password: string;
}

export async function registerService({name, email, password}: IRegisterService) {
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
}
