import { MailParameters } from './ISendMail';

export interface IMailService {
  send(mailParameters: MailParameters): Promise<void>;
}
