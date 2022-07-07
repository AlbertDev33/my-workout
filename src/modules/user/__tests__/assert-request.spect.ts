import { CreateUserRequest } from '@interfaces/CreateUserRequest';
import { IAssertRequestService } from '@interfaces/IAssertRequestService';

import { AssertRequestService } from '../assert-request.service';

type SutType = {
  stub: IAssertRequestService;
};

const makeSut = (): SutType => {
  const stub = new AssertRequestService();

  return {
    stub,
  };
};

describe('User Repository', () => {
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
