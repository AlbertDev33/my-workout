import { CreateUserRequest } from '@interfaces/CreateUserRequest';
declare global {
  namespace Express {
    interface Request {
      userId: string;
      userData: CreateUserRequest;
      refreshToken: string;
      accessToken: string;
    }
  }
}
