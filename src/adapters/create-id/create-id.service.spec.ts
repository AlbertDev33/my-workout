import { ICreateIdService } from '@interfaces/ICreateIdService';
import { validate } from 'uuid';

import { CreateIdService } from './create-id.service';

type SutType = {
  sut: ICreateIdService;
};

const makeStub = (): SutType => {
  const sut = new CreateIdService();

  return {
    sut,
  };
};

describe('CreateIdService', () => {
  it('should be return a valid uuid', () => {
    const { sut } = makeStub();

    const fakeSut = sut.create();
    const isValidUUID = validate(fakeSut);
    expect(isValidUUID).toBe(true);
  });
});
