import { UserConverter } from '../../converters/UserConverter';
import { prisma } from '../../database/client';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class PrismaUsersRepository implements IUsersRepository {
  async create({ name, email, password }: User): Promise<void> {
    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    return UserConverter.toDomain(user);
  }

  async findAll(): Promise<User[] | []> {
    const users = (
      await prisma.user.findMany({
        // select: {
        //   id: true,
        //   name: true,
        //   email: true,
        // },
      })
    ).map((user) => UserConverter.toDomain(user));

    return users;
  }
}
