import { Request, Response } from 'express';
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { ListUsers } from "./ListUsersService";

export class ListUsersController {
  async handle(req: Request, res: Response) {
    const prismaUsersRepository = new PrismaUsersRepository();
    const listUsers = new ListUsers(prismaUsersRepository);

    const users = await listUsers.execute();

    return res.json(users)
  }
}

