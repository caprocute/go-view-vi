<template>
  <CollapseItem name="Lines" :expanded="true">
    <SettingItemBox name="Number of polylines">
      <SettingItem name="Increase downward">
        <n-input-number size="small" :min="0" v-model:value="optionData.lineNum"></n-input-number>
      </SettingItem>
      <SettingItem name="Increase upwards">
        <n-input-number size="small" :min="0" v-model:value="optionData.lineNumUp"></n-input-number>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="Polyline style">
      <SettingItem name="The thickness of the polyline">
        <n-input-number size="small" :min="1" v-model:value="optionData.lineWidth"></n-input-number>
      </SettingItem>
      <SettingItem name="Background bar color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.backgroundCol"></n-color-picker>
      </SettingItem>
      <SettingItem name="Flow color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.animateCol"></n-color-picker>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
