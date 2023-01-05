import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ListUsersResponse } from './ListUsersResponse';

export class ListUsers {
  constructor(private usersRepository: IUsersRepository) {}

  async execute() {
    const users = (await this.usersRepository.findAll()).map((user: User) =>
      ListUsersResponse.of(user),
    );

    return users;
  }
}
