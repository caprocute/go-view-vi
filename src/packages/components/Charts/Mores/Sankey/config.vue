<template>
  <div>
    <CollapseItem name="Sankey Diagram" :expanded="true">
      <SettingItemBox name="Style">
        <SettingItem name="Direction">
          <n-select
            v-model:value="sankeyConfig.orient"
            size="small"
            :options="orientList"
            placeholder="Select a direction"
          />
        </SettingItem>
        <SettingItem name="Tip tabs">
          <n-select
            v-model:value="optionData.tooltip.show"
            size="small"
            :options="toolTipSwitch"
            placeholder="Whether it is turned on"
          />
        </SettingItem>
      </SettingItemBox>
    </CollapseItem>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option, orientList, toolTipSwitch } from './config'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option & GlobalThemeJsonType>,
    required: true
  }
})

const sankeyConfig = computed<typeof option.series>(() => {
  return props.optionData.series
})

</script>
