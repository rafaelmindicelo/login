import { IUsersRepository } from "../../repositories/IUsersRepository";

export class ListUsers {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute() {
    return await this.usersRepository.findAll()
  }
}