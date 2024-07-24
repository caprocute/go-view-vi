import { BaseEvent, EventLife, InteractEvents, InteractEventOn, InteractActionsType } from '@/enums/eventEnum'
import type { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import type { RequestConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'

export enum ChartFrameEnum {
  // Supports dataset of echarts framework
  ECHARTS = 'echarts',
  // UI component framework
  NAIVE_UI = 'naiveUI',
  // Custom components with data
  COMMON = 'common',
  // No data changes
  STATIC = 'static'
}

// Component configuration
export type ConfigType = {
  // Component key
  key: string
  // Canvas component key
  chartKey: string
  // Right-side settings panel component key
  conKey: string
  // Title
  title: string
  // Category
  category: string
  // Category name
  categoryName: string
  // Package
  package: string
  // Classification
  chartFrame?: ChartFrameEnum
  // Preview image
  image: string
  // Create the component from a specified path
  redirectComponent?: string
  // Preset dataset values (images/icons) for the component
  dataset?: any
  // Disable dragging or double-clicking to generate the component
  disabled?: boolean
  // Icon
  icon?: string
  // Events
  configEvents?: { [T: string]: Function }
}

// Data request
interface requestConfig {
  request: RequestConfigType
}

// Echarts data type
interface EchartsDataType {
  dimensions: string[]
  source: any[]
}

// Component status
export interface StatusType {
  lock: boolean
  hide: boolean
}

// Filter/Transform enums
export enum FilterEnum {
  // Enable
  FILTERS_SHOW = 'filterShow',

  // Opacity
  OPACITY = 'opacity',
  // Saturation
  SATURATE = 'saturate',
  // Contrast
  CONTRAST = 'contrast',
  // Hue
  HUE_ROTATE = 'hueRotate',
  // Brightness
  BRIGHTNESS = 'brightness',

  // Rotate
  ROTATE_Z = 'rotateZ',
  ROTATE_X = 'rotateX',
  ROTATE_Y = 'rotateY',

  // Skew
  SKEW_X = 'skewX',
  SKEW_Y = 'skewY',

  // Blend mode
  BLEND_MODE = 'blendMode'
}

export const BlendModeEnumList = [
  { label: 'Normal', value: 'normal' },
  { label: 'Multiply', value: 'multiply' },
  { label: 'Overlay', value: 'overlay' },
  { label: 'Screen', value: 'screen' },
  { label: 'Darken', value: 'darken' },
  { label: 'Lighten', value: 'lighten' },
  { label: 'Color Dodge', value: 'color-dodge' },
  { label: 'Color Burn', value: 'color-burn;' },
  { label: 'Hard Light', value: 'hard-light' },
  { label: 'Soft Light', value: 'soft-light' },
  { label: 'Difference', value: 'difference' },
  { label: 'Exclusion', value: 'exclusion' },
  { label: 'Hue', value: 'hue' },
  { label: 'Saturation', value: 'saturation' },
  { label: 'Color', value: 'color' },
  { label: 'Luminosity', value: 'luminosity' }
]

// Component instance class
export interface PublicConfigType {
  id: string
  isGroup: boolean
  attr: { x: number; y: number; w: number; h: number; zIndex: number; offsetX: number; offsetY: number }
  styles: {
    [FilterEnum.FILTERS_SHOW]: boolean
    [FilterEnum.OPACITY]: number
    [FilterEnum.SATURATE]: number
    [FilterEnum.CONTRAST]: number
    [FilterEnum.HUE_ROTATE]: number
    [FilterEnum.BRIGHTNESS]: number

    [FilterEnum.ROTATE_Z]: number
    [FilterEnum.ROTATE_X]: number
    [FilterEnum.ROTATE_Y]: number

    [FilterEnum.SKEW_X]: number
    [FilterEnum.SKEW_Y]: number
    [FilterEnum.BLEND_MODE]: string
    // Animations
    animations: string[]
  }
  preview?: {
    // Hide overflow in preview
    overFlowHidden?: boolean
  }
  filter?: string
  status: StatusType
  interactActions?: InteractActionsType[]
  events: {
    baseEvent: {
      [K in BaseEvent]?: string
    }
    advancedEvents: {
      [K in EventLife]?: string
    }
    interactEvents: {
      [InteractEvents.INTERACT_ON]: InteractEventOn | undefined
      [InteractEvents.INTERACT_COMPONENT_ID]: string | undefined
      [InteractEvents.INTERACT_FN]: { [name: string]: string }
    }[]
  }
}

export interface CreateComponentType extends PublicConfigType, requestConfig {
  key: string
  chartConfig: ConfigType
  option: GlobalThemeJsonType
  groupList?: Array<CreateComponentType>
}

// Grouped component instance class
export interface CreateComponentGroupType extends CreateComponentType {
  groupList: Array<CreateComponentType>
}

// Method to get the value type corresponding to a key in the component instance class
export type PickCreateComponentType<T extends keyof CreateComponentType> = Pick<CreateComponentType, T>[T]

// Package category enums
// Warning: donot change this enum value. this value must be match with folder package name
export enum PackagesCategoryEnum {
  CHARTS = 'Charts',
  TABLES = 'Tables',
  INFORMATIONS = 'Informations',
  PHOTOS = 'Photos',
  ICONS = 'Icons',
  DECORATES = 'Decorates'
}

// Package category names
export enum PackagesCategoryName {
  CHARTS = 'Charts',
  TABLES = 'Tables',
  INFORMATIONS = 'Inputs',
  PHOTOS = 'Photos',
  ICONS = 'Icons',
  DECORATES = 'Frames'
}

// Fetch component
export enum FetchComFlagType {
  VIEW,
  CONFIG
}

// Chart package type
export type PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ConfigType[]
  [PackagesCategoryEnum.INFORMATIONS]: ConfigType[]
  [PackagesCategoryEnum.TABLES]: ConfigType[]
  [PackagesCategoryEnum.PHOTOS]: ConfigType[]
  [PackagesCategoryEnum.ICONS]: ConfigType[]
  [PackagesCategoryEnum.DECORATES]: ConfigType[]
}
