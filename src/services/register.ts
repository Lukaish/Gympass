import { prisma } from "@/lib/prisma.js";
import type { IUsersRepository } from "@/repositories/IUserRepository.js";
import { hash } from "bcryptjs";

interface IRegisterService {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: IRegisterService) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("E-mail already exists.");
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
