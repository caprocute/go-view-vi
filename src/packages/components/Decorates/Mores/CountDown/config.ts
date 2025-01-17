import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { CountDownConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { chartInitConfig } from '@/settings/designSetting'
import { FlipType } from '@/components/Pages/Flipper'

type STYLE = 'HH:mm:ss' | 'colon'

export interface OptionType {
  dataset: number
  useEndDate: boolean
  endDate: number
  style: STYLE
  showDay: boolean
  flipperBgColor: string
  flipperTextColor: string
  flipperWidth: number
  flipperHeight: number
  flipperRadius: number
  flipperGap: number
  flipperType: FlipType
  flipperSpeed: number
}

export const option: OptionType = {
  dataset: 10 * 60, // 10 minutes
  useEndDate: false,
  endDate: new Date().getTime(), // Current time
  style: 'HH:mm:ss',
  showDay: false,
  flipperBgColor: '#16293E',
  flipperTextColor: '#4A9EF8FF',
  flipperWidth: 30,
  flipperHeight: 50,
  flipperRadius: 5,
  flipperGap: 10,
  flipperType: 'down',
  flipperSpeed: 450,
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = CountDownConfig.key
  public attr = { ...chartInitConfig, w: 500, h: 100, zIndex: -1 }
  public chartConfig = cloneDeep(CountDownConfig)
  public option = cloneDeep(option)
}
