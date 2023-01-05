import { User } from '../../entities/User';

export class ListUsersResponse {
  public static of(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    };
  }
}
