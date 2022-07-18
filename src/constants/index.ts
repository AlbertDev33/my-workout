export const DATABASE_TYPE = 'postgres';

export enum InjectDependencies {
  SendMailService = 'ISendMailService',
  CreateUserService = 'ICreateUserService',
  UserRepository = 'IUserRepository',
  AuthService = 'IAuthService',
}

export enum ErrorMessage {
  USER_ALREADY_EXIST = 'User already registered.',
}
