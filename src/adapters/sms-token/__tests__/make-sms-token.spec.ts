import { IMakeSmsTokenService } from '@interfaces/IMakeSmsTokenService';

import { MakeSmsTokenService } from '../make-sms-token.service';

type MakeSut = {
  sut: IMakeSmsTokenService;
};

const makeSut = (): MakeSut => {
  const sut = new MakeSmsTokenService();

  return {
    sut,
  };
};

describe('Make SMS Token', () => {
  it('should return a token with 6 characters', async () => {
    const { sut } = makeSut();

    const stubToken = await sut.makeSmsToken();
    expect(stubToken).toHaveLength(6);
  });
});
