import { prisma } from "@/lib/prisma.js";
import { Prisma, type User } from "@prisma/client";
import type { IUsersRepository } from "../IUserRepository.js";

export class PrismaUsersRespositiory implements IUsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
