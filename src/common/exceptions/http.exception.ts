import { StatusCodes } from 'http-status-codes';

export class HttpException extends Error {
  statusCode: StatusCodes;
  errorCode: string;

  constructor(statusCode: StatusCodes, errorCode: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}
