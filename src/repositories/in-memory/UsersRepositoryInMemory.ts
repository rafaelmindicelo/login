import { IUsersRepository } from '../IUsersRepository';
import { v4 as uuid } from 'uuid';
import { User } from '../../entities/User';

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findAll(): Promise<User[] | []> {
    return this.users;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }
}
