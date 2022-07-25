import { IMakeSmsTokenService } from '@interfaces/IMakeSmsTokenService';

export class MakeSmsTokenService implements IMakeSmsTokenService {
  public async makeSmsToken(): Promise<string> {
    const smsToken = new Promise<string>((resolve) => {
      const min = 48;
      const max = 91;
      const firstLetterAsciiCode = 65;
      let tokenLength = 6;
      let smsToken = '';
      let calc = 0;
      while (tokenLength--) {
        calc = Math.floor(Math.random() * (max - min)) + min;
        if (calc > 57 && calc < 65) {
          calc =
            Math.floor(Math.random() * (max - firstLetterAsciiCode)) +
            firstLetterAsciiCode;
        }
        smsToken += String.fromCharCode(calc);
      }
      resolve(smsToken);
    });

    return smsToken;
  }
}
