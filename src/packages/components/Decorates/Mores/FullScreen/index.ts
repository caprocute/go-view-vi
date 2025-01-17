import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const FullScreenConfig: ConfigType = {
  key: 'FullScreen',
  chartKey: 'VFullScreen',
  conKey: 'VCFullScreen',
  title: 'Full-screen button',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'fullScreen.png'
}
