export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class DontExistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DontExistError';
  }
}
