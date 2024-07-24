import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const ScatterCommonConfig: ConfigType = {
  key: 'ScatterCommon',
  chartKey: 'VScatterCommon',
  conKey: 'VCScatterCommon',
  title: 'Scatter plot',
  category: ChatCategoryEnum.SCATTER,
  categoryName: ChatCategoryEnumName.SCATTER,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'scatter-multi.png'
}
