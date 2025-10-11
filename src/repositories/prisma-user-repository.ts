import { prisma } from "@/lib/prisma.js";
import { Prisma } from "@prisma/client";

export class PrismaUsersRespositiory {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
