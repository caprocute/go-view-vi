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
      <SettingItem name="Numeric units">
        <n-input
          v-model:value="optionData.unit"
          size="small"
          placeholder="Numeric units"
        ></n-input>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="Styles">
      <SettingItem name="Body color">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.color"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="Data color">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.textColor"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="Bottom line">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.borderColor"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="Font style">
       <SettingItem name="Ordinal font">
        <n-input-number
          size="small"
          v-model:value="optionData.indexFontSize"
          :min="12"
        />
      </SettingItem>
      <SettingItem name="Data font on the left">
        <n-input-number
          size="small"
          v-model:value="optionData.leftFontSize"
          :min="12"
        />
      </SettingItem>
      <SettingItem name="Data font on the right">
        <n-input-number
          size="small"
          v-model:value="optionData.rightFontSize"
          :min="12"
        />
      </SettingItem>
    </SettingItemBox>
      
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true,
  },
})
</script>
