import { ApplicationError } from './application-error';

export class UnexpectedError extends ApplicationError {
  constructor(message = 'Algo inesperado aconteceu.') {
    super(message);
    this.name = 'UnexpectedError';
  }
}
