import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import { COMPONENT_INTERACT_EVENT_KET } from '@/enums/eventEnum'
import { interactActions, ComponentInteractEventEnum } from './interact'
import { InputsSelectConfig } from './index'

export const option = {
  // Loại hiển thị của thành phần thời gian, phải khớp với dữ liệu được định nghĩa trong interactActions
  [COMPONENT_INTERACT_EVENT_KET]: ComponentInteractEventEnum.DATA,
  // Giá trị mặc định
  selectValue: '1',
  // Cấu hình hiển thị cho người dùng
  dataset: [
    {
      label: 'Lựa chọn 1',
      value: '1'
    },
    {
      label: 'Lựa chọn 2',
      value: '2'
    },
    {
      label: 'Lựa chọn 3',
      value: '3'
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = InputsSelectConfig.key
  public attr = { ...chartInitConfig, w: 260, h: 32, zIndex: -1 }
  public chartConfig = cloneDeep(InputsSelectConfig)
  public interactActions = interactActions
  public option = cloneDeep(option)
}
