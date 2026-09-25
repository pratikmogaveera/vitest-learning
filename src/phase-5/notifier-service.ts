export interface IEmailClient {
  send(to: string, message: string): void;
}

export class NotifierService {
  constructor(private emailClient: IEmailClient) {}
  notify(userId: string, message: string): void {
    this.emailClient.send(userId, message);
  }
}
