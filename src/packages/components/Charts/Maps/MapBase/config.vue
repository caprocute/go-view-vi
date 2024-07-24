<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem name="Map" :expanded="true">
    <SettingItemBox name="Map area">
      <SettingItem name="Default to China">
        <n-select
          size="small"
          v-model:value="mapRegion.adcode"
          :options="mapRegionOptions"
          value-field="adcode"
          label-field="name"
        />
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="Area color">
      <SettingItem name="0%Color">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].itemStyle.areaColor.colorStops[0].color"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="100%Color">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].itemStyle.areaColor.colorStops[1].color"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="Shadow">
      <SettingItem name="Color">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].itemStyle.shadowColor"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="Degree of ambiguity">
        <n-input-number
          v-model:value="seriesList[1].itemStyle.shadowBlur"
          :min="0"
          size="small"
          placeholder="Please enter the level of blur"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="Horizontal offset">
        <n-input-number
          v-model:value="seriesList[1].itemStyle.shadowOffsetX"
          size="small"
          placeholder="Please enter the horizontal offset size"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="Vertical offset">
        <n-input-number
          v-model:value="seriesList[1].itemStyle.shadowOffsetY"
          size="small"
          placeholder="Please enter a vertical offset size"
        ></n-input-number>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="The name of the geographic information">
      <SettingItem name="Display">
        <n-space>
          <n-switch v-model:value="seriesList[1].label.show" size="small"></n-switch>
        </n-space>
      </SettingItem>
      <SettingItem name="Font color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[1].label.color"></n-color-picker>
      </SettingItem>
      <SettingItem name="Font size">
        <n-input-number
          v-model:value="seriesList[1].label.fontSize"
          :min="1"
          size="small"
          placeholder="Please enter a font size"
        ></n-input-number>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="Hover to focus">
      <SettingItem name="Disabled (preview visible)">
        <n-space>
          <n-switch v-model:value="seriesList[1].emphasis.disabled" size="small"></n-switch>
        </n-space>
      </SettingItem>
      <SettingItem name="Color">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].emphasis.itemStyle.areaColor"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="Font size">
        <n-input-number
          v-model:value="seriesList[1].emphasis.label.fontSize"
          :min="1"
          size="small"
          placeholder="Please enter a font size"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="Shadow">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].emphasis.itemStyle.shadowColor"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="Border size">
        <n-input-number
          v-model:value="seriesList[1].emphasis.itemStyle.borderWidth"
          :min="1"
          size="small"
          placeholder="Please enter the border size"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="Text color">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].emphasis.label.color"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="Hovering pop-ups">
      <SettingItem name="Display">
        <n-space>
          <n-switch v-model:value="seriesList[1].tooltip.show" size="small"></n-switch>
        </n-space>
      </SettingItem>
      <SettingItem name="Font size">
        <n-input-number
          v-model:value="seriesList[1].tooltip.textStyle.fontSize"
          :min="1"
          size="small"
          placeholder="Please enter a font size"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="Font color">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].tooltip.textStyle.color"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="Background color">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].tooltip.backgroundColor"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="Area borders">
      <SettingItem name="Color">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].itemStyle.borderColor"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="Width size">
        <n-input-number
          v-model:value="seriesList[1].itemStyle.borderWidth"
          :min="1"
          size="small"
          placeholder="Please enter the border size"
        ></n-input-number>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="Other" v-if="mapRegion.adcode === 'china'">
      <SettingItem>
        <n-checkbox v-model:checked="mapRegion.showHainanIsLands" size="small">Show south sea islands</n-checkbox>
      </SettingItem>
      <SettingItem v-if="seriesList[2]">
        <n-checkbox v-model:checked="mapRegion.enter" size="small">Click to enter the next level</n-checkbox>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="Back icon" v-if="mapRegion.enter">
      <SettingItem name="Color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="mapRegion.backColor"></n-color-picker>
      </SettingItem>
      <SettingItem name="Size">
        <n-input-number
          v-model:value="mapRegion.backSize"
          :min="1"
          size="small"
          placeholder="Please enter a font size"
        ></n-input-number>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
  <CollapseItem name="Tag" :expanded="true">
    <SettingItemBox name="Style">
      <SettingItem name="Size">
        <n-input-number v-model:value="seriesList[0].symbolSize" size="small" :min="0"></n-input-number>
      </SettingItem>
      <SettingItem name="Color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[0].itemStyle.color"></n-color-picker>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="Text">
      <SettingItem name="Display">
        <n-space>
          <n-switch v-model:value="seriesList[0].label.show" size="small"></n-switch>
        </n-space>
      </SettingItem>
      <SettingItem name="Font size">
        <n-input-number v-model:value="seriesList[0].label.fontSize" size="small" :min="0"></n-input-number>
      </SettingItem>
      <SettingItem name="Font color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[0].label.color"></n-color-picker>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="Ripples">
      <SettingItem name="The size of a ripple">
        <n-input-number
          v-model:value="seriesList[0].rippleEffect.scale"
          :min="1"
          size="small"
          placeholder="Please enter the size of the ripples"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="Ripple color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[0].rippleEffect.color"></n-color-picker>
      </SettingItem>
      <SettingItem name="How the ripples are drawn">
        <n-select size="small" v-model:value="seriesList[0].rippleEffect.brushType" :options="rippleEffectOptions" />
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>

  <CollapseItem v-if="seriesList[2]" name="Flying wires" :expanded="true">
    <SettingItemBox name="Arrow">
      <SettingItem name="Speed">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-input-number v-model:value="seriesList[2].effect.period" size="small" :min="0"></n-input-number>
          </template>
          The smaller the value, the faster the speed
        </n-tooltip>
      </SettingItem>
      <SettingItem name="Trails">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-input-number
              v-model:value="seriesList[2].effect.trailLength"
              size="small"
              :min="0"
              :max="1"
            ></n-input-number>
          </template>
          Effect trail length[0,1]the larger the value，the longer and heavier the wake is
        </n-tooltip>
      </SettingItem>
      <SettingItem name="Size">
        <n-input-number v-model:value="seriesList[2].effect.symbolSize" size="small" :min="0"></n-input-number>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="Deployment">
      <SettingItem name="Color">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[2].lineStyle.normal.color"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="Width">
        <n-input-number v-model:value="seriesList[2].lineStyle.normal.width" size="small" :min="1"></n-input-number>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { GlobalSetting } from '@/components/Pages/ChartItemSetting'
import { ref } from 'vue'
import mapChinaJson from './mapGeojson/china.json'

const mapRegionOptions = ref([
  {
    adcode: 'china',
    name: 'China'
  }
])

const rippleEffectOptions = ref([
  {
    value: 'fill',
    label: 'Solid'
  },
  {
    value: 'stroke',
    label: 'Hollow'
  }
])

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const initMapRegionOptions = () => {
  mapChinaJson.features.forEach((element: any) => {
    if (element.properties.name) {
      mapRegionOptions.value.push({ ...element.properties })
    }
  })
}
initMapRegionOptions()

const seriesList = computed(() => {
  return props.optionData.series
})

const mapRegion = computed(() => {
  return props.optionData.mapRegion
})
</script>
