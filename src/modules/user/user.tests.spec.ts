import { connection } from '@configs/typeorm.tests';
import { User } from '@models/user.entity';
import { CreateUserRequest } from 'interfaces/CreateUserRequest';
import { ICreateUserService } from 'interfaces/ICreateUserService';
import { Repository } from 'typeorm';
import { CreateUserService } from './createUser.service';
import { UserRepository } from './user.repository';

type SutType = {
  stub: ICreateUserService;
};

const makeSut = (): SutType => {
  const repositoryUser: Repository<User> = connection
    .repository()
    .getRepository(User);
  const userRepositoryStub = new UserRepository(repositoryUser);
  const stub = new CreateUserService(userRepositoryStub);

  return {
    stub,
  };
};

describe('User Repository', () => {
  beforeAll(async () => {
    await connection.crateDatabase();
    await connection.createConnection();
  });

  afterAll(async () => {
    await connection.close();
  });

  afterAll(async () => {
    await connection.drop();
  });

  it('should create a user', async () => {
    const { stub } = makeSut();

    const user: CreateUserRequest = {
      name: 'User_test',
      email: 'user@user.com',
      phoneNumber: '123456',
    };

    const createdUser = await stub.execute(user);
    expect(createdUser).toHaveProperty('id');
  });
});
