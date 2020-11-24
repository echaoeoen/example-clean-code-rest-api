export class RestError extends Error {
  code?: number
  constructor(code: number, message?: string){
    super(message)
    this.code = code
  }
}

export class NotFoundError extends RestError {
  constructor(message?: string){
    super(404, message)
  }
}

export class InternalServerError extends RestError {
  constructor(message?: string){
    super(500, message)
  }
}

export class UnauthenticatedServerError extends RestError {
  constructor(message?: string){
    super(401, message)
  }
}

export class UnauthorizedServerError extends RestError {
  constructor(message?: string){
    super(403, message)
  }
}
