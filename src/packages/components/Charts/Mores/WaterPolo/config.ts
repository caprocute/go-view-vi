import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { WaterPoloConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const shapes = [
  {
    label: 'Circular',
    value: 'circle'
  },
  {
    label: 'Square',
    value: 'rect'
  },
  {
    label: 'A square with rounded corners',
    value: 'roundRect'
  },
  {
    label: 'Equilateral triangle',
    value: 'triangle'
  },
  {
    label: 'Lozenge',
    value: 'diamond'
  },
  {
    label: 'Water Drop',
    value: 'pin'
  },
  {
    label: 'Arrow',
    value: 'arrow'
  },
]

export const includes = []

export const option = {
  dataset: 0.5,
  series: [
    {
      type: 'liquidFill',
      shape: shapes[0].value,
      radius: '90%',
      data: [0],
      center: ['50%', '50%'],
      color: [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#446bf5',
            },
            {
              offset: 1,
              color: '#2ca3e2',
            },
          ],
          globalCoord: false,
        },
      ],
      backgroundStyle: {
        borderWidth: 1,
        color: 'rgba(51, 66, 127, 0.7)',
      },
      label: {
        normal: {
          textStyle: {
            fontSize: 50,
            color: '#fff',
          },
        },
      },
      outline: {
        show: false,
        borderDistance: 10,
        itemStyle: {
          borderWidth: 2,
          borderColor: '#112165'
        }
      }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  public key = WaterPoloConfig.key
  public chartConfig = cloneDeep(WaterPoloConfig)
  public option = echartOptionProfixHandle(option, includes)
}
