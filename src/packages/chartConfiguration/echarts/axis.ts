export const axisConfig = {
  // X轴位置
  xposition: [
    {
      label: 'Top',
      value: 'top'
    },
    {
      label: 'Bottom',
      value: 'bottom'
    }
  ],
  // Y轴位置
  yposition: [
    {
      label: 'Left',
      value: 'left'
    },
    {
      label: 'Right',
      value: 'right'
    }
  ],
  // 线条
  splitLint: {
    lineStyle: {
      type: [
        {
          label: 'Solid line',
          value: 'solid'
        },
        {
          label: 'DottedLine',
          value: 'dashed'
        },
        {
          label: 'DottedLines',
          value: 'dotted'
        }
      ]
    }
  },
  // 视觉映射
  visualMap: {
    orient: [
      {
        label: 'Vertical',
        value: 'vertical'
      },
      {
        label: 'Horizontal',
        value: 'horizontal'
      }
    ]
  }
}
