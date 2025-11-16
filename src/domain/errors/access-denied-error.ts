import { ApplicationError } from './application-error';

export class AccessDeniedError extends ApplicationError {
  constructor(message = 'Acesso negado.') {
    super(message);
    this.name = 'AccessDeniedError';
  }
}
