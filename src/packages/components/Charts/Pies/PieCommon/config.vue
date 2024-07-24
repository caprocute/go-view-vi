<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem name="Pie chart configuration" :expanded="true">
    <SettingItemBox name="Type">
      <SettingItem>
        <n-select v-model:value="optionData.type" size="small" :options="fontWeightOptions" />
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="Animation" :alone="true">
      <SettingItem>
        <n-space>
          <n-switch v-model:value="optionData.isCarousel" size="small"></n-switch>
          <n-text>{{ $t('chart.open') }}<n-text :depth="3">（{{ $t('chart.open') }}）</n-text></n-text>
        </n-space>
      </SettingItem>
      <SettingItem>
        <n-text :depth="3">When there is no mouse click on the legend scene，The legend can be forcibly opened</n-text>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="Label">
      <SettingItem>
        <n-space>
          <n-switch v-model:value="optionData.series[0].label.show" size="small"></n-switch>
          <n-text>Show label</n-text>
        </n-space>
      </SettingItem>
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.series[0].labelLine.show" size="small"></n-switch>
          <n-text>Leading line</n-text>
        </n-space>
      </setting-item>
      <SettingItem name="Position">
        <n-select v-model:value="optionData.series[0].label.position" size="small" :options="labelConfig.position" />
      </SettingItem>
      <setting-item name="The type of impression">
        <n-select v-model:value="optionData.series[0].label.formatter" size="small" :options="labelFormatterOptions" />
      </setting-item>
    </SettingItemBox>
    <setting-item-box name="Rounded corners">
      <setting-item>
        <n-space>
          <n-input-number
            v-model:value="optionData.series[0].itemStyle.borderRadius"
            size="small"
            :min="0"
          ></n-input-number>
          <n-text>Fillet size</n-text>
        </n-space>
      </setting-item>
      <setting-item>
        <n-space>
          <n-input-number
            v-model:value="optionData.series[0].itemStyle.borderWidth"
            size="small"
            :min="0"
          ></n-input-number>
          <n-text>Line width</n-text>
        </n-space>
      </setting-item>
    </setting-item-box>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, watch } from 'vue'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { PieTypeObject, PieTypeEnum } from './config'
import { labelConfig } from '@/packages/chartConfiguration/echarts'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})
const fontWeightOptions = [
  {
    label: PieTypeEnum.NORMAL,
    value: PieTypeObject[PieTypeEnum.NORMAL]
  },
  {
    label: PieTypeEnum.RING,
    value: PieTypeObject[PieTypeEnum.RING]
  },
  {
    label: PieTypeEnum.ROSE,
    value: PieTypeObject[PieTypeEnum.ROSE]
  }
]

const labelFormatterOptions = [
  { label: 'The data name', value: '{b}' },
  { label: 'Percentage', value: '{d}' },
  { label: 'Column Name: Percentage', value: '{b}:{d}%' }
]
</script>
