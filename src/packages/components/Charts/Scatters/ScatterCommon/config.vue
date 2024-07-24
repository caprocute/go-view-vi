<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData" :in-chart="true"></global-setting>

  <CollapseItem :name="`Scatter-${index + 1}`" expanded v-for="(item, index) in optionData.series" :key="index">
    <SettingItemBox name="Style">
      <SettingItem name="Type">
        <n-select v-model:value="item.type" size="small" :options="ScatterEffectTypeEnumList" placeholder="Choose" />
      </SettingItem>
      <SettingItem name="Size">
        <n-input-number v-model:value="item.symbolSize" size="small" :min="1"></n-input-number>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="Scaled domains">
      <SettingItem name="Thickness (0 is not displayed)">
        <n-input-number v-model:value="item.markArea.itemStyle.borderWidth" size="small" :min="0"></n-input-number>
      </SettingItem>
      <SettingItem name="Sign">
        <n-select
          v-model:value="item.markArea.itemStyle.borderType"
          size="small"
          :options="axisConfig.splitLint.lineStyle.type"
          placeholder="Choose"
        />
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="Punctuation">
      <SettingItem name="Shape">
        <n-select v-model:value="item.markPoint.symbol" size="small" :options="SymbolEnumList" placeholder="Choose" />
      </SettingItem>
      <SettingItem name="Size">
        <n-input-number v-model:value="item.markPoint.symbolSize" size="small" :min="0"></n-input-number>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'
import { ScatterEffectTypeEnumList, SymbolEnumList } from '../shard'
import { axisConfig } from '@/packages/chartConfiguration/echarts/index'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType & typeof option>,
    required: true
  }
})
</script>
