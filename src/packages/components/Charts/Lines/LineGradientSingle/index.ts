import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const LineGradientSingleConfig: ConfigType = {
  key: 'LineGradientSingle',
  chartKey: 'VLineGradientSingle',
  conKey: 'VCLineGradientSingle',
  title: 'Single-polyline gradient area chart',
  category: ChatCategoryEnum.LINE,
  categoryName: ChatCategoryEnumName.LINE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'line_gradient_single.png'
}
