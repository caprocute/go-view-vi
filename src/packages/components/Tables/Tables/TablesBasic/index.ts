import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const TablesBasicConfig: ConfigType = {
  key: 'TablesBasic',
  chartKey: 'VTablesBasic',
  conKey: 'VCTablesBasic',
  title: 'Basic paginated table',
  category: ChatCategoryEnum.TABLE,
  categoryName: ChatCategoryEnumName.TABLE,
  package: PackagesCategoryEnum.TABLES,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'tables_basic.png'
}
