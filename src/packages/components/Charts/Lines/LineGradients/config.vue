<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem
    v-for="(item, index) in seriesList"
    :key="index"
    name="Single-line area chart"
    :expanded="true"
  >
    <SettingItemBox name="Lines">
      <SettingItem name="Width">
        <n-input-number
          v-model:value="item.lineStyle.width"
          :min="1"
          size="small"
          placeholder="Auto calculated"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="Type">
        <n-select
          v-model:value="item.lineStyle.type"
          size="small"
          :options="lineConf.lineStyle.type"
        ></n-select>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="Solid point">
      <SettingItem name="Size">
        <n-input-number
          v-model:value="item.symbolSize"
          :min="1"
          :max="100"
          size="small"
          placeholder="Auto calculated"
        ></n-input-number>
      </SettingItem>
    </SettingItemBox>
    <setting-item-box name="Label">
      <setting-item>
        <n-space>
          <n-switch v-model:value="item.label.show" size="small" />
          <n-text>Show label</n-text>
        </n-space>
      </setting-item>
      <setting-item name="Size">
        <n-input-number
          v-model:value="item.label.fontSize"
          size="small"
          :min="1"
        ></n-input-number>
      </setting-item>
      <setting-item name="Color">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.label.color"
        ></n-color-picker>
      </setting-item>
      <setting-item name="Position">
        <n-select
          v-model:value="item.label.position"
          :options="[
            { label: 'top', value: 'top' },
            { label: 'left', value: 'left' },
            { label: 'right', value: 'right' },
            { label: 'bottom', value: 'bottom' },
          ]"
        />
      </setting-item>
    </setting-item-box>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { lineConf } from '@/packages/chartConfiguration/echarts/index'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import {
  GlobalSetting,
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/Pages/ChartItemSetting'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  },
})

const seriesList = computed(() => {
  return props.optionData.series
})
</script>
