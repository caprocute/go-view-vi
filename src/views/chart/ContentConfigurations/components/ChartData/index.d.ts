import { RequestHttpEnum, RequestHttpIntervalEnum, RequestDataTypeEnum, SelectHttpTimeNameObj } from '@/enums/httpEnum'

// 匹配结果
export enum DataResultEnum {
  NULL = 0,
  SUCCESS = 1,
  FAILURE = 2,
}

export enum TimelineTitleEnum {
  FILTER = 'Data filtering',
  MAPPING = 'Data mapping',
  CONTENT = 'Data content',
}

export enum SelectCreateDataEnum {
  STATIC = 'Data at rest',
  AJAX = 'Dynamic requests',
  Pond = 'Public interfaces',
}

export interface SelectCreateDataType {
  label: SelectCreateDataEnum
  value: RequestDataTypeEnum
  disabled?: boolean
}

// ajax 请求类型
export interface SelectHttpType {
  label: RequestHttpEnum
  value: RequestHttpEnum
  disabled?: boolean
  style?: object
}

// 类型选项
export const selectTypeOptions: SelectHttpType[] = [
  {
    label: RequestHttpEnum.GET,
    value: RequestHttpEnum.GET,
    style: {
      color: 'greenyellow',
      fontWeight: 'bold'
    }
  },
  {
    label: RequestHttpEnum.POST,
    value: RequestHttpEnum.POST,
    style: {
      color: 'skyblue',
      fontWeight: 'bold'
    }
  },
  {
    label: RequestHttpEnum.PUT,
    value: RequestHttpEnum.PUT,
    style: {
      color: 'goldenrod',
      fontWeight: 'bold'
    }
  },
  {
    label: RequestHttpEnum.PATCH,
    value: RequestHttpEnum.PATCH,
    style: {
      color: 'violet',
      fontWeight: 'bold'
    }
  },
  {
    label: RequestHttpEnum.DELETE,
    value: RequestHttpEnum.DELETE,
    disabled: true,
    style: {
      fontWeight: 'bold'
    }
  },
]

// ajax 请求间隔
export interface SelectHttpTimeType {
  label: string
  value: RequestHttpIntervalEnum
  disabled?: boolean
}

// 时间选项
export const selectTimeOptions: SelectHttpTimeType[] = [
  {
    label: SelectHttpTimeNameObj[RequestHttpIntervalEnum.SECOND],
    value: RequestHttpIntervalEnum.SECOND
  },
  {
    label: SelectHttpTimeNameObj[RequestHttpIntervalEnum.MINUTE],
    value: RequestHttpIntervalEnum.MINUTE
  },
  {
    label: SelectHttpTimeNameObj[RequestHttpIntervalEnum.HOUR],
    value: RequestHttpIntervalEnum.HOUR
  },
  {
    label: SelectHttpTimeNameObj[RequestHttpIntervalEnum.DAY],
    value: RequestHttpIntervalEnum.DAY
  },
]