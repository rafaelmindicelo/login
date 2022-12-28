import { IUsersRepository } from "../../repositories/IUsersRepository";
import bcrypt from 'bcrypt';
import { CreateUserRequest } from "./CreateUserRequest";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: IUserRequest) {

    const userExists = await this.usersRepository.findOneByEmail(email);

    if (userExists) {
      throw new Error('User already exists.')
    }

    if (name.trim().length === 0) {
      throw new Error('Property name is required.')
    }

    if (!email.match(emailValidation)) {
      throw new Error('Email is not valid.')
    }

    if (password.trim().length < 6) {
      throw new Error('Password must have more than 5 characters.')
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await this.usersRepository.create(
      new CreateUserRequest({
        name,
        email,
        password: hash
      }).toUser()
    )
  }
}