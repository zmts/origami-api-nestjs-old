export const VALIDATION = {
  message: 'Invalid request',
  status: 400,
  statusCode: 'VALIDATION_ERROR',
}
export const BAD_REQUEST = {
  message: 'Bad request',
  status: 400,
  statusCode: 'BAD_REQUEST_ERROR',
}
export const EMPTY_BODY = {
  message: 'Empty body is not allowed. Please fill the body',
  status: 400,
  statusCode: 'EMPTY_BODY_ERROR',
}
export const AUTH = {
  message: 'Authorization error',
  status: 401,
  statusCode: 'AUTH_ERROR',
}
export const ACCESS = {
  message: 'Access denied',
  status: 403,
  statusCode: 'ACCESS_ERROR',
}
export const NO_ANONYMOUS_ACCESS = {
  message: 'Access denied. No anonymous access',
  status: 403,
  statusCode: 'NO_ANONYMOUS_ACCESS_ERROR',
}
export const NOT_FOUND = {
  message: 'Empty response, not found',
  status: 404,
  statusCode: 'NOT_FOUND_ERROR',
}
export const SERVER = {
  message: 'Server error occurred',
  status: 500,
  statusCode: 'SERVER_ERROR',
}
export const TOKEN_EXPIRED = {
  message: 'Token expired',
  status: 419,
  statusCode: 'TOKEN_EXPIRED_ERROR'
}
export const TOKEN_VERIFY = {
  message: 'Token verify error',
  status: 401,
  statusCode: 'TOKEN_VERIFY_ERROR'
}
export const EXTERNAL = {
  message: 'External service error occurred',
  status: 500,
  statusCode: 'EXTERNAL_ERROR',
}
export const DB_DUPLICATE_CONFLICT = {
  message: 'Duplicate conflict. Resource already exists',
  status: 409,
  statusCode: 'DB_DUPLICATE_CONFLICT_ERROR',
}
export const REDIS = {
  message: 'Redis error occurred',
  status: 500,
  statusCode: 'REDIS_ERROR'
}
export const PREDICTED_WARNING = {
  status: 500, message: 'Server works fine. Predicted warning happened',
  statusCode: 'PREDICTED_WARNING_ERROR'
}
export const DB = {
  message: 'DB error occurred',
  status: 500, statusCode: 'DB_ERROR'
}
export const TOO_MANY_REQUESTS = {
  status: 429,
  statusCode: 'TOO_MANY_REQUESTS',
  message: 'Too Many Requests',
}
export const NETWORK = {
  message: 'Network error occurred',
  status: 500,
  statusCode: 'NETWORK_ERROR',
}
