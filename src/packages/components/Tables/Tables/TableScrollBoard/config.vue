<template>
  <CollapseItem name="List" :expanded="true">
    <SettingItemBox name="Base">
      <SettingItem name="Number of table rows">
        <n-input-number
          v-model:value="optionData.rowNum"
          :min="1"
          size="small"
          placeholder="Please enter Auto Calculation"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="Carousel time(s)">
        <n-input-number
          v-model:value="optionData.waitTime"
          :min="1"
          size="small"
          placeholder="Please enter a carousel time"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="Header height">
        <n-input-number
          v-model:value="optionData.headerHeight"
          :min="1"
          size="small"
          placeholder="Please enter the header height"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="Displays the line number">
        <n-switch size="small" v-model:value="optionData.index" />
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="Deployment" :alone="true">
      <SettingItem name="Header data">
        <n-input v-model:value="header" :min="1" size="small" placeholder="Header Data (','' Segmentation)"></n-input>
      </SettingItem>
      <SettingItem name="Column alignment">
        <n-input v-model:value="align" :min="1" size="small" placeholder="Alignment (english', 'split)"></n-input>
      </SettingItem>
      <SettingItem name="Column width">
        <n-input v-model:value="columnWidth" :min="1" size="small" placeholder="Column width (',' split)"></n-input>
      </SettingItem>
      <SettingItem name="Carousel">
        <n-select
          v-model:value="optionData.carousel"
          :options="[
            { label: 'A single carousel', value: 'single' },
            { label: 'Full page carousel', value: 'page' },
          ]"
        />
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="Styles">
      <SettingItem name="Header background color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.headerBGC"></n-color-picker>
      </SettingItem>
      <SettingItem name="Odd row background color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.oddRowBGC"></n-color-picker>
      </SettingItem>
      <SettingItem name="Even row background color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.evenRowBGC"></n-color-picker>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const header = ref()
const align = ref()
const columnWidth = ref()

watch(
  () => props.optionData,
  newData => {
    header.value = props.optionData.header.toString()
    align.value = props.optionData.align.toString()
    columnWidth.value = props.optionData.columnWidth.toString()
  },
  {
    deep: false,
    immediate: true
  }
)

watch([header, align, columnWidth], ([headerNew, alignNew, columnWidthNew], [headerOld, alignOld, columnWidthOld]) => {
  if (headerNew !== headerOld) {
    props.optionData.header = headerNew.split(',')
  }
  if (alignNew !== alignOld) {
    props.optionData.align = alignNew.split(',')
  }
  if (columnWidthNew !== columnWidthOld) {
    // @ts-ignore
    props.optionData.columnWidth = columnWidthNew.split(',')
  }
})
</script>
