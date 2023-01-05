import { User, UserProps } from '@entities/User';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  return new User({
    name: 'Username-Example',
    email: 'example@email.com',
    password: '123456',
    ...override,
  });
}
