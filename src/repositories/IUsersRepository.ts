import { User } from '@entities/User';

export interface IUsersRepository {
  create(user: User): Promise<void>;
  findAll(): Promise<User[] | []>;
  findOneByEmail(email: string): Promise<User | null>;
}
