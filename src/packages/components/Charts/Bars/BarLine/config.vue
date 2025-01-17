<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem
    v-for="(item, index) in seriesList"
    :key="index"
    :name="`Series${index + 1}`"
    :expanded="true"
  >
    <template #header>
      <n-text class="go-fs-13" depth="3">
        {{ item.type == 'bar' ? $t('edit.BarChart') : $t('edit.BarChart') }}

      </n-text>
    </template>
    <SettingItemBox name="Type">
      <SettingItem name="Width">
        <n-select
          :value="item.type"
          size="small"
          :options="[
            { label: 'Histogram', value: 'bar' },
            { label: 'Line chart', value: 'line' }
          ]"
          @update:value="(value: any) => {
            updateHandle(item, value)
          }"
        />
      </SettingItem>
 
    </SettingItemBox>
    <SettingItemBox name="Graphics" v-if="item.type == 'bar'">
      <SettingItem name="Width">
        <n-input-number
          v-model:value="item.barWidth"
          :min="1"
          :max="100"
          size="small"
          placeholder="Auto calculated"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="Rounded corners">
        <n-input-number v-model:value="item.itemStyle.borderRadius" :min="0" size="small"></n-input-number>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="Lines" v-if="item.type == 'line'">
      <SettingItem name="Width">
        <n-input-number
          v-model:value="item.lineStyle.width"
          :min="1"
          :max="100"
          size="small"
          placeholder="Auto calculated"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="Type">
        <n-select v-model:value="item.lineStyle.type" size="small" :options="lineConf.lineStyle.type"></n-select>
      </SettingItem>
      <setting-item>
        <n-space>
          <n-switch v-model:value="item.smooth" size="small" />
          <n-text>Curve</n-text>
        </n-space>
      </setting-item>
    </SettingItemBox>
    <SettingItemBox name="Solid point" v-if="item.type == 'line'">
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
        <n-input-number v-model:value="item.label.fontSize" size="small" :min="1"></n-input-number>
      </setting-item>
      <setting-item name="Tip color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.label.color"></n-color-picker>
      </setting-item>
      <setting-item name="Position">
        <n-select
          v-model:value="item.label.position"
          :options="[
            { label: 'Top', value: 'top' },
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
            { label: 'Bottom', value: 'bottom' }
          ]"
        />
      </setting-item>
    </setting-item-box>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed, toRaw } from 'vue'
import { merge, cloneDeep } from 'lodash';

import GlobalSetting from '@/components/Pages/ChartItemSetting/GlobalSetting.vue'
import CollapseItem from '@/components/Pages/ChartItemSetting/CollapseItem.vue'
import SettingItemBox from '@/components/Pages/ChartItemSetting/SettingItemBox.vue'
import SettingItem from '@/components/Pages/ChartItemSetting/SettingItem.vue'

import { lineConf } from '@/packages/chartConfiguration/echarts'
import { GlobalThemeJsonType } from '@/settings/chartThemes'
import { barSeriesItem, lineSeriesItem } from './config'


const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const seriesList = computed(() => {
  return props.optionData.series
})

const updateHandle = (item:any, value:string) => {
  const _label = cloneDeep(toRaw(item.label))
  lineSeriesItem.label = _label
  if (value === 'line') {
    merge(item, lineSeriesItem)
  } else {
    merge(item, barSeriesItem)
  }
}
</script>
