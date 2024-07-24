// Module Path Prefix Classification
export enum ModuleTypeEnum {
  SYSTEM = 'sys',
  // SYSTEM = '',
  PROJECT = 'project',
}

// Request Result Set
export enum ResultEnum {
  DATA_SUCCESS = 0,
  SUCCESS = 200,
  SERVER_ERROR = 500,
  SERVER_FORBIDDEN = 403,
  NOT_FOUND = 404,
  TOKEN_OVERDUE = 886,
  TIMEOUT = 60000,
}

// Data Related
export enum RequestDataTypeEnum {
  // Static Data
  STATIC = 0,
  // Request Data
  AJAX = 1,
  // Data Pool
  POND = 2,
}

// Request Body Type
export enum RequestContentTypeEnum {
  // Normal Request
  DEFAULT = 0,
  // SQL Request
  SQL = 1,
}

// Header
export enum RequestHttpHeaderEnum {
  TOKEN = 'Token',
  COOKIE = 'Cookie',
}

// Request Methods
export enum RequestHttpEnum {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}

/**
 * @description: Request Interval
 */
export enum RequestHttpIntervalEnum {
  // Second
  SECOND = 'second',
  // Minute
  MINUTE = 'minute',
  // Hour
  HOUR = 'hour',
  // Day
  DAY = 'day',
}

/**
 * @description: Request Interval Name
 */
export const SelectHttpTimeNameObj = {
  [RequestHttpIntervalEnum.SECOND]: 'second',
  [RequestHttpIntervalEnum.MINUTE]: 'minute',
  [RequestHttpIntervalEnum.HOUR]: 'hour',
  [RequestHttpIntervalEnum.DAY]: 'day',
}

/**
 * @description: Request Body Type
 */
export enum RequestBodyEnum {
  NONE = 'none',
  FORM_DATA = 'form-data',
  X_WWW_FORM_URLENCODED = 'x-www-form-urlencoded',
  JSON = 'json',
  XML = 'xml',
}

/**
 * @description: Request Body Type Array
 */
export const RequestBodyEnumList = [
  RequestBodyEnum.NONE,
  RequestBodyEnum.FORM_DATA,
  RequestBodyEnum.X_WWW_FORM_URLENCODED,
  RequestBodyEnum.JSON,
  RequestBodyEnum.XML,
]

/**
 * @description: Request Parameters Type
 */
export enum RequestParamsTypeEnum {
  PARAMS = 'Params',
  BODY = 'Body',
  HEADER = 'Header',
}

/**
 * @description: Request Parameters Body
 */
export type RequestParamsObjType = {
  [T: string]: string
}
export type RequestParams = {
  [RequestParamsTypeEnum.PARAMS]: RequestParamsObjType
  [RequestParamsTypeEnum.HEADER]: RequestParamsObjType
  [RequestParamsTypeEnum.BODY]: {
    [RequestBodyEnum.FORM_DATA]: RequestParamsObjType
    [RequestBodyEnum.X_WWW_FORM_URLENCODED]: RequestParamsObjType
    [RequestBodyEnum.JSON]: string
    [RequestBodyEnum.XML]: string
  }
}

// Common Content-Type Types
export enum ContentTypeEnum {
  // JSON
  JSON = 'application/json;charset=UTF-8',
  // Text
  TEXT = 'text/plain;charset=UTF-8',
  // XML
  XML = 'application/xml;charset=UTF-8',
  // application/x-www-form-urlencoded, generally used with qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data, for uploads
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}