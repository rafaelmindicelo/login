import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaUsersRepository } from '../../repositories/prisma/PrismaUsersRepository';
import { Login } from './LoginService';

const SECRET = process.env.SECRET as string;

export class LoginController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const prismaUsersRepository = new PrismaUsersRepository();
    const login = new Login(prismaUsersRepository);

    try {
      const user = await login.execute({ email, password });
      const token = jwt.sign(
        { userId: user.id, userEmail: user.email },
        SECRET,
        { expiresIn: 300 },
      );
      return res.status(200).json({ auth: true, token }).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ error: error.message }).send();
      }
    }
  }
}
