import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { GraphConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = []

// Graph layout options
export const GraphLayout = [
  { label: 'None', value: 'none' },
  { label: 'Circular', value: 'circular' },
  { label: 'Force', value: 'force' }
]

// Label switch options
export const LabelSwitch = [
  { label: 'On', value: 1 },
  { label: 'Off', value: 0 }
]

// Label position options
export const LabelPosition = [
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
  { label: 'Top', value: 'top' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Inside', value: 'inside' }
]

// Graph animation options
export const LayoutAnimation = [
  { label: 'On', value: 1 },
  { label: 'Off', value: 0 }
]

export const option = {
  dataset: { ...dataJson },
  tooltip: {},
  legend: {
    show: true,
    textStyle: {
      color: '#eee',
      fontSize: 14
    },
    data: dataJson.categories.map(function (a) {
      return a.name
    })
  },
  series: [
    {
      type: 'graph',
      layout: 'none', // none circular circular layout
      data: dataJson.nodes,
      links: dataJson.links,
      categories: dataJson.categories,
      label: {
        show: 1,
        position: 'right',
        formatter: '{b}'
      },
      labelLayout: {
        hideOverlap: true
      },
      lineStyle: {
        color: 'source', // Line color
        curveness: 0.2 // Line curvature
      },
      force: {
        repulsion: 100,
        gravity: 0.1,
        edgeLength: 30,
        layoutAnimation: 1,
        friction: 0.6
      }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = GraphConfig.key
  public chartConfig = cloneDeep(GraphConfig)
  // Chart configuration options
  public option = echartOptionProfixHandle(option, includes)
}
