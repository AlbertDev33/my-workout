import { connection } from '@configs/typeorm.tests';
import { CreateUserRequest } from '@interfaces/CreateUserRequest';
import { ICreateUserService } from '@interfaces/ICreateUserService';
import { User } from '@models/user.entity';
import { SendMailService } from '@modules/email/sendMail.service';
import { MailService } from '@modules/mailConfig/mail.service';
import { Repository } from 'typeorm';
import { validate } from 'uuid';

import { CreateUserService } from '../create-user.service';
import { UserRepository } from '../user.repository';
import { validUser } from './constants/index';

type SutType = {
  stub: ICreateUserService;
};

const makeSut = (): SutType => {
  const repositoryUser: Repository<User> = connection
    .repository()
    .getRepository(User);
  const mailService: MailService = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    send: () => {},
  } as any;
  const sendMailService = new SendMailService(mailService);
  const userRepositoryStub = new UserRepository(repositoryUser);
  const stub = new CreateUserService(userRepositoryStub, sendMailService);

  return {
    stub,
  };
};

describe('User Repository', () => {
  let createdUser: User;
  beforeAll(async () => {
    await connection.crateDatabase();
    await connection.createConnection();
    const { stub } = makeSut();
    createdUser = await stub.execute(validUser);
  });

  afterAll(async () => {
    await connection.close();
  });

  afterAll(async () => {
    await connection.drop();
  });

  it('should create a valid user', async () => {
    const isValidUUID = validate(createdUser.id);

    expect(createdUser).toHaveProperty('id');
    expect(isValidUUID).toBe(true);
  });

  it('should throw if user already existing', async () => {
    const { stub } = makeSut();
    const invalidUser = stub.execute(validUser);

    await expect(invalidUser).rejects.toThrow(
      Error('User already registered.'),
    );
  });
});
