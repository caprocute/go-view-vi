import { InteractEventOn, InteractActionsType } from '@/enums/eventEnum'

// 时间组件类型
export enum ComponentInteractEventEnum {
  DATE = 'date',
  DATE_TIME = 'datetime',
  DATE_RANGE = 'daterange',
  DATE_TIME_RANGE = 'datetimerange',
  MONTH = 'month',
  MONTH_RANGE = 'monthrange',
  YEAR = 'year',
  YEAR_RANGE = 'yearrange',
  QUARTER = 'quarter',
  QUARTER_RANGE = 'quarterrange'
}

// 联动参数
export enum ComponentInteractParamsEnum {
  DATE = 'date',
  DATE_START = 'dateStart',
  DATE_END = 'dateEnd',
  DATE_RANGE = 'daterange'
}

export enum DefaultTypeEnum {
  NONE = "none",
  STATIC = "static",
  DYNAMIC = "dynamic"
}

export enum DifferUnitEnum {
  DAY = 'd',
  WEEK = 'w',
  MONTH = 'M',
  QUARTER = 'Q',
  YEAR = 'y',
  HOUR = 'h',
  MINUTE = 'm',
  SECOND = 's',
  MILLISECOND = 'ms',
}

export const DifferUnitObject = {
  // https://day.js.org/docs/en/manipulate/add
  [DifferUnitEnum.DAY]: 'day',
  [DifferUnitEnum.WEEK]: 'week',
  [DifferUnitEnum.MONTH]: 'month',
  [DifferUnitEnum.QUARTER]: 'quarter',
  [DifferUnitEnum.YEAR]: 'year',
  [DifferUnitEnum.HOUR]: 'hour',
  [DifferUnitEnum.MINUTE]: 'minute',
  [DifferUnitEnum.SECOND]: 'second',
  [DifferUnitEnum.MILLISECOND]: 'millisecond',
}


const time = [
  {
    value: ComponentInteractParamsEnum.DATE,
    label: 'Date'
  }
]

const timeRange = [
  {
    value: ComponentInteractParamsEnum.DATE_START,
    label: 'Start time'
  },
  {
    value: ComponentInteractParamsEnum.DATE_END,
    label: 'End time'
  },
  {
    value: ComponentInteractParamsEnum.DATE_RANGE,
    label: 'Date range'
  }
]

// 定义组件触发回调事件
export const interactActions: InteractActionsType[] = [
  {
    interactType: InteractEventOn.CHANGE,
    interactName: 'Select Done',
    componentEmitEvents: {
      [ComponentInteractEventEnum.DATE]: time,
      [ComponentInteractEventEnum.DATE_TIME]: time,
      [ComponentInteractEventEnum.DATE_RANGE]: timeRange,
      [ComponentInteractEventEnum.MONTH]: time,
      [ComponentInteractEventEnum.MONTH_RANGE]: timeRange,
      [ComponentInteractEventEnum.QUARTER]: time,
      [ComponentInteractEventEnum.QUARTER_RANGE]: timeRange,
      [ComponentInteractEventEnum.YEAR]: time,
      [ComponentInteractEventEnum.YEAR_RANGE]: timeRange,
    }
  }
]
