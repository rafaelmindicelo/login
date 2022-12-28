import { User } from "../entities/User"

export class UserConverter {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.created_at
    }
  }

  static toDomain(user: Partial<User>): User {
    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.created_at
    })
  }
}