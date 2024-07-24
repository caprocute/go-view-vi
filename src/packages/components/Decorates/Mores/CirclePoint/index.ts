import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const CirclePointConfig: ConfigType = {
    key: 'CirclePoint',
    chartKey: 'VCirclePoint',
    conKey: 'VCCirclePoint',
    title: 'Polka dot aura',
    category: ChatCategoryEnum.MORE,
    categoryName: ChatCategoryEnumName.MORE,
    package: PackagesCategoryEnum.DECORATES,
    chartFrame: ChartFrameEnum.STATIC,
    image: 'flow-circle.png'
}
