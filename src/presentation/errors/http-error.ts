import { AppError } from './app-error'

export class HttpError extends AppError {
  constructor(public message: string, public statusCode: number) {
    super(message, statusCode)
    this.name = 'HttpError'
  }
}
