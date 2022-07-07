export type MailVariables = {
  name?: string;
  link?: string;
};

export type MailParameters = {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  template: string;
  'h:X-Mailgun-Variables': MailVariables;
};

export interface ISendMailService {
  execute(mailParameters: MailParameters): Promise<void>;
}
