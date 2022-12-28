import { Request, Response } from 'express';
import { PrismaUsersRepository } from '../../repositories/prisma/PrismaUsersRepository';
import { CreateUserService } from "./CreateUserService";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const prismaUsersRepository = new PrismaUsersRepository();

    const createUser = new CreateUserService(prismaUsersRepository);

    try {
      await createUser.execute({
        name,
        email,
        password
      });

      return res.status(201).send()
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message }).send()
      }
    }
  }
}