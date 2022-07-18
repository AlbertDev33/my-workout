import { RequestPayload } from '@customTypes/index';

declare global {
  namespace Express {
    interface Request {
      payload: RequestPayload;
    }
  }
}
