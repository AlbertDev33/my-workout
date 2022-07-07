export const DATABASE_TYPE = 'postgres';

export enum InjectTokens {
  SendMailService = 'ISendMailService',
  CreateUserService = 'ICreateUserService',
  UserRepository = 'IUserRepository',
}

export enum ErrorMessage {
  USER_ALREADY_EXIST = 'User already registered.',
}
