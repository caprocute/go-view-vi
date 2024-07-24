<template>
  <collapse-item name="Table settings" :expanded="true">
    <n-tag type="primary">If the configuration does not respond，Please check the effect on the preview page</n-tag>
    <setting-item-box :alone="true" name="Alignment">
      <setting-item :alone="true">
        <n-select
          v-model:value="optionData.align"
          size="small"
          :options="[
            { label: 'Keep left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Keep right', value: 'right' },
          ]"
        />
      </setting-item>
    </setting-item-box>
    <setting-item-box :alone="false" name="Pagination settings">
      <setting-item name="Default page number" :alone="true">
        <n-input-number v-model:value="optionData.pagination.page" size="small" placeholder="Font size"></n-input-number>
      </setting-item>
      <setting-item name="Pagination" :alone="true">
        <n-select v-model:value="optionData.pagination.pageSize" size="small" :options="page" />
      </setting-item>
    </setting-item-box>
    <setting-item-box :alone="false" name="Tabular data">
      <SettingItem name="Header name" class="form_name">
        <div style="width: 260px">
          <n-input v-model:value="header" size="small" placeholder="Header data (',' split)"></n-input>
        </div>
      </SettingItem>
    </setting-item-box>
    <setting-item-box :alone="false" name="Table style">
      <SettingItem name="Display borders" :alone="true">
        <n-select v-model:value="(optionData as any).style.border" size="small" :options="borderFlag" />
      </SettingItem>
      <SettingItem name="Bottom border" :alone="true">
        <n-select
          v-model:value="(optionData as any).style.bottomBordered"
          size="small"
          :options="bottom_borderedFlag"
        />
      </SettingItem>
      <SettingItem name="Column dividing line" :alone="true">
        <n-select v-model:value="(optionData as any).style.singleLine" size="small" :options="columnFlag" />
      </SettingItem>
      <SettingItem name="Row dividing line" :alone="true">
        <n-select v-model:value="(optionData as any).style.singleColumn" size="small" :options="lineFlag" />
      </SettingItem>
      <SettingItem name="Zebra stripes" :alone="true">
        <n-select v-model:value="(optionData as any).style.striped" size="small" :options="stripedFlag" />
      </SettingItem>
      <setting-item name="Font size" :alone="true">
        <n-input-number
          v-model:value="optionData.style.fontSize"
          :min="12"
          size="small"
          placeholder="Font size"
        ></n-input-number>
      </setting-item>
      <setting-item name="Border width" :alone="true">
        <n-input-number
          v-model:value="optionData.style.borderWidth"
          :min="0"
          size="small"
          placeholder="Font size"
        ></n-input-number>
      </setting-item>
      <setting-item name="Border color" :alone="true">
        <n-color-picker size="small" :modes="['rgb']" v-model:value="optionData.style.borderColor"></n-color-picker>
      </setting-item>
      <setting-item name="Border style" :alone="true">
        <n-select v-model:value="optionData.style.borderStyle" size="small" :options="borderStyleFlag" />
      </setting-item>
      <SettingItem name="Table search (front-end static search)" :alone="true">
        <n-select v-model:value="optionData.inputShow" size="small" :options="inputSelect" />
      </SettingItem>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, watch, ref } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

const page = [
  { label: '2', value: 2 },
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '30', value: 30 }
]
const borderFlag = [
  { label: 'Display', value: 'on' },
  { label: 'Not shown', value: 'off' }
]
const columnFlag = [
  { label: 'Display', value: 'off' },
  { label: 'Not shown', value: 'on' }
]
const lineFlag = [
  { label: 'Display', value: 'off' },
  { label: 'Not shown', value: 'on' }
]
const bottom_borderedFlag = [
  { label: 'Display', value: 'on' },
  { label: 'Not shown', value: 'off' }
]
const stripedFlag = [
  { label: 'Display', value: 'on' },
  { label: 'Not shown', value: 'off' }
]
const borderStyleFlag = [
  { label: 'Solid border', value: 'solid' },
  { label: 'Dashed border', value: 'dashed' },
  { label: 'Dotted borders', value: 'dotted' },
  { label: 'Double-wire borders', value: 'double' }
]
const inputSelect = [
  { label: 'Deactivated', value: 'none' },
  { label: 'Enable', value: 'flex' }
]
const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const header = ref()
const median = ref<string[]>([])
props.optionData.dataset.dimensions.forEach(item => {
  median.value.push(item.title)
})

//转string
watch(
  () => props.optionData,
  () => {
    median.value = []
    props.optionData.dataset.dimensions.forEach(item => {
      median.value.push(item.title)
    })
    header.value = median.value.toString()
  },
  {
    deep: false,
    immediate: true
  }
)

//更新columns
watch([header], ([headerNew], [headerOld]) => {
  if (headerNew !== headerOld) {
    headerNew.split(',').forEach((item: string, index: number) => {
      if (index + 1 <= props.optionData.dataset.dimensions.length) {
        props.optionData.dataset.dimensions[index].title = headerNew.split(',')[index]
      }
    })
  }
})
</script>
