import { CreateIdService } from '@adapters/create-id/create-id.service';
import { AuthService } from '@auth/auth.service';
import { connection } from '@configs/typeorm.tests';
import { Tokens } from '@customTypes/tokens.type';
import { ICreateUserService } from '@interfaces/ICreateUserService';
import { User } from '@models/user.entity';
import { SendMailService } from '@modules/email/sendMail.service';
import { MailService } from '@modules/mailConfig/mail.service';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';

import { CreateUserService } from '../create-user.service';
import { UserRepository } from '../user.repository';
import { validUser } from './constants/index';

process.env.ACCESS_TOKEN_SECRET = 'secret';
process.env.REFRESH_TOKEN_SECRET = 'secret';

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
  const jwtServie = new JwtService();
  const authService = new AuthService(jwtServie, userRepositoryStub);
  const createId = new CreateIdService();
  const stub = new CreateUserService(
    userRepositoryStub,
    sendMailService,
    authService,
    createId,
  );

  return {
    stub,
  };
};

describe('User Repository', () => {
  let tokens: Tokens;
  beforeAll(async () => {
    await connection.crateDatabase();
    await connection.createConnection();
    const { stub } = makeSut();
    tokens = await stub.execute(validUser);
  });

  afterAll(async () => {
    await connection.close();
  });

  afterAll(async () => {
    await connection.drop();
  });

  it('should return access and refresh tokens', async () => {
    expect(tokens).toHaveProperty('accessToken');
    expect(tokens).toHaveProperty('refreshToken');
    expect(typeof tokens.accessToken).toBe('string');
    expect(typeof tokens.refreshToken).toBe('string');
  });

  it('should throw if user already existing', async () => {
    const { stub } = makeSut();
    const invalidUser = stub.execute(validUser);

    await expect(invalidUser).rejects.toThrow(
      Error('User already registered.'),
    );
  });
});
