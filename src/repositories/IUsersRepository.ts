import { User } from "../entities/User";

export interface IUsersRepository {
  create(user: User): Promise<void>;
  findAll(): Promise<Partial<User[] | []>>;
  findOneByEmail(email: string): Promise<User | null>;
}