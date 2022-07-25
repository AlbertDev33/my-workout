export interface IConfirmEmailService {
  execute(userId: string, userToken: string): Promise<void>;
}
