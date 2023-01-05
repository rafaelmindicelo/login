import { IUsersRepository } from 'src/repositories/IUsersRepository';
import { makeUser } from '../../helpers/factories/MakeUser';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { ListUsers } from '../ListUsers/ListUsersService';
import { CreateUserService } from './CreateUserService';

describe('Create User', () => {
  let usersRepositoryInMemory: IUsersRepository;
  let createUserService: CreateUserService;
  let listAllUsers: ListUsers;

  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(usersRepositoryInMemory);
    listAllUsers = new ListUsers(usersRepositoryInMemory);
  });

  it('should be able to create an user', async () => {
    const userData = makeUser();

    await createUserService.execute(userData);
    const users = await listAllUsers.execute();

    expect(users).toHaveLength(1);
    expect(users[0]).toHaveProperty('_id');
  });

  it('should not be able to create an existing user', async () => {
    const users = await listAllUsers.execute();

    await createUserService.execute(
      makeUser({
        email: 'new-email-example@test.com',
      }),
    );

    await expect(
      createUserService.execute(
        makeUser({
          email: 'new-email-example@test.com',
        }),
      ),
    ).rejects.toEqual(new Error('User already exists.'));

    expect(users).toHaveLength(2);
  });

  it('should not be able to create an user without name', async () => {
    await expect(
      createUserService.execute(
        makeUser({ name: '  ', email: 'test@email.com' }),
      ),
    ).rejects.toEqual(new Error('Property name is required.'));
  });

  it('should not be able to create an user with an invalid email', async () => {
    await expect(
      createUserService.execute(makeUser({ email: 'invalid-email' })),
    ).rejects.toEqual(new Error('Email is not valid.'));
  });

  it('should not be able to create an user with less than 6 characters password', async () => {
    await expect(
      createUserService.execute(
        makeUser({ password: '123', email: 'test@email.com' }),
      ),
    ).rejects.toEqual(new Error('Password must have more than 5 characters.'));
  });
});
