<template>
  <collapse-item name="Input box configuration" :expanded="true">
    <setting-item-box name="Default value" :alone="true">
      <n-input  v-model:value="optionData.dataset"  placeholder="If not entered, the default value is 0"/>
    </setting-item-box>
  </collapse-item>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { option } from './config'
defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>