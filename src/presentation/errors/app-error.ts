import { FastifyReply, FastifyRequest } from 'fastify'

enum ErrorList {
  BadRequest = 'Requisição inválida',
  Unauthorized = 'Não autorizado',
  Forbidden = 'Acesso proibido',
  NotFound = 'Não encontrado',
  MethodNotAllowed = 'Método não permitido',
  Timeout = 'Tempo esgotado',
  ContentTooLarge = 'Conteúdo muito grande',
  InternalServerError = 'Erro interno do servidor',
}

const ErrorToStatusCode: Record<ErrorList, number> = {
  [ErrorList.BadRequest]: 400,
  [ErrorList.Unauthorized]: 401,
  [ErrorList.Forbidden]: 403,
  [ErrorList.NotFound]: 404,
  [ErrorList.MethodNotAllowed]: 405,
  [ErrorList.Timeout]: 408,
  [ErrorList.ContentTooLarge]: 413,
  [ErrorList.InternalServerError]: 500,
}

class ApiError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export class BadRequest extends ApiError {
  constructor(message?: string) {
    super(
      message || ErrorList.BadRequest,
      ErrorToStatusCode[ErrorList.BadRequest]
    )
  }
}

export class Unauthorized extends ApiError {
  constructor(message?: string) {
    super(
      message || ErrorList.Unauthorized,
      ErrorToStatusCode[ErrorList.Unauthorized]
    )
  }
}

export class Forbidden extends ApiError {
  constructor(message?: string) {
    super(
      message || ErrorList.Forbidden,
      ErrorToStatusCode[ErrorList.Forbidden]
    )
  }
}

export class NotFound extends ApiError {
  constructor(message?: string) {
    super(message || ErrorList.NotFound, ErrorToStatusCode[ErrorList.NotFound])
  }
}

export class MethodNotAllowed extends ApiError {
  constructor(message?: string) {
    super(
      message || ErrorList.MethodNotAllowed,
      ErrorToStatusCode[ErrorList.MethodNotAllowed]
    )
  }
}

export class Timeout extends ApiError {
  constructor(message?: string) {
    super(message || ErrorList.Timeout, ErrorToStatusCode[ErrorList.Timeout])
  }
}

export class ContentTooLarge extends ApiError {
  constructor(message?: string) {
    super(
      message || ErrorList.ContentTooLarge,
      ErrorToStatusCode[ErrorList.ContentTooLarge]
    )
  }
}

export class InternalServerError extends ApiError {
  constructor(message?: string) {
    super(
      message || ErrorList.InternalServerError,
      ErrorToStatusCode[ErrorList.InternalServerError]
    )
  }
}

export const errorHandler = async (
  error: Error & Partial<ApiError>,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const statusCode = error.statusCode || 500

  reply.status(statusCode).send({
    message: error.message,
    when: new Date(),
  })
}
