import bcrypt from 'bcrypt';
import { IUsersRepository } from '../../repositories/IUsersRepository';

export interface LoginRequest {
  email: string;
  password: string;
}
export class Login {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(request: LoginRequest) {
    const { email, password } = request;
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) {
      throw new Error('User/Password invalid.');
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (checkPassword) {
      return user;
    } else {
      throw new Error('User/Password invalid.');
    }
  }
}
