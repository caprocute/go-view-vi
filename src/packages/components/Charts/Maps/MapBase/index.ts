import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const MapBaseConfig: ConfigType = {
    key: 'MapBase',
    chartKey: 'VMapBase',
    conKey: 'VCMapBase',
    title: 'Map (optional provinces)',
    category: ChatCategoryEnum.MAP,
    categoryName: ChatCategoryEnumName.MAP,
    package: PackagesCategoryEnum.CHARTS,
    chartFrame: ChartFrameEnum.COMMON,
    image: 'map.png'
}