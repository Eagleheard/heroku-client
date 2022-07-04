export enum AuthorizationOptions {
  NAME_LENGTH = 20,
  PASSWORD_LENGTH = 8,
}

export enum userOptions {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

export const EMAIL_VALIDATION =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export enum ToastOptions {
  error = 'error',
  success = 'success',
}

export enum PaginationOptions {
  dots = '...',
}
