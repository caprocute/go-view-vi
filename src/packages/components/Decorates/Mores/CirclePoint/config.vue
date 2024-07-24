<template>
  <CollapseItem name="Lines" :expanded="true">
    <SettingItemBox name="Concreteness">
      <SettingItem name="Outer ring radius">
        <n-input-number
            size="small"
            v-model:value="optionData.outCircle"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="Inner circular radius">
        <n-input-number
            size="small"
            v-model:value="optionData.inCircle"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="The outer ring is thick">
        <n-input-number
            size="small"
            v-model:value="optionData.outCircleWidth"
        ></n-input-number>
      </SettingItem>

      <SettingItem name="Outer ring color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.outCircleColor"></n-color-picker>
      </SettingItem>
      <SettingItem name="Interior round color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.inCircleColor"></n-color-picker>
      </SettingItem>
    </SettingItemBox>

  </CollapseItem>

</template>

<script setup lang="ts">
import { PropType } from 'vue'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

</script>
