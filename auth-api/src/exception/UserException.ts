import AppException from "./AppException";

export default class UserException extends AppException {
  constructor(message: string, status: number) {
    super(message, status);
    Error.captureStackTrace(this, this.constructor);
  }
}
