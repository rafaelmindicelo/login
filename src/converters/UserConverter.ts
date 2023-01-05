import { User as RawUser } from '@prisma/client';
import { User } from '@entities/User';

export class UserConverter {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.created_at,
    };
  }

  static toDomain(user: RawUser): User {
    return new User(
      {
        name: user.name,
        email: user.email,
        password: user.password,
        created_at: user.created_at,
      },
      user.id,
    );
  }
}
