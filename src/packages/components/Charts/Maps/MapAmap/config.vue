<template>
  <collapse-item name="Base" :expanded="true">
    <setting-item-box name="Language type" :alone="true">
      <setting-item>
        <n-select size="small" v-model:value="optionData.mapOptions.lang" :options="langOptions" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="Key" :alone="true">
      <setting-item name="Be sure to use your own AutoNavi app key">
        <n-input v-model:value="optionData.mapOptions.amapKey" size="small"></n-input>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="Customize the map style ID" :alone="true">
      <setting-item>
        <n-input size="small" v-model:value="optionData.mapOptions.amapStyleKeyCustom" />
      </setting-item>
    </setting-item-box>
  </collapse-item>
  <collapse-item name="Map" :expanded="true">
    <setting-item-box name="Theme">
      <setting-item>
        <n-select size="small" v-model:value="optionData.mapOptions.amapStyleKey" :options="themeOptions" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="Display features" :alone="true">
      <n-checkbox-group v-model:value="optionData.mapOptions.features">
        <n-space item-style="display: flex;">
          <n-checkbox :value="item.value" :label="item.label" v-for="(item, index) in featuresOptions" :key="index" />
        </n-space>
      </n-checkbox-group>
    </setting-item-box>
    <setting-item-box name="Text annotation" :alone="true">
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.mapOptions.showLabel" size="small" />
          <n-text>Whether to display</n-text>
        </n-space>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="Position">
      <setting-item name="Longitude">
        <n-input-number v-model:value="optionData.mapOptions.amapLon" :show-button="false" size="small">
          <template #suffix>°</template>
        </n-input-number>
      </setting-item>
      <setting-item name="Latitude">
        <n-input-number v-model:value="optionData.mapOptions.amapLat" :show-button="false" size="small">
          <template #suffix>°</template>
        </n-input-number>
      </setting-item>
      <setting-item name="Initial scaling">
        <n-input-number v-model:value="optionData.mapOptions.amapZindex" :min="0" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="Mode" :alone="true">
      <setting-item>
        <n-radio-group v-model:value="optionData.mapOptions.viewMode" name="radiogroup">
          <n-space>
            <n-radio v-for="song in viewModeOptions" :key="song.value" :value="song.value">
              {{ song.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </setting-item>
    </setting-item-box>
    <template v-if="optionData.mapOptions.viewMode === '3D'">
      <setting-item-box>
        <setting-item name="SkyColor">
          <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.mapOptions.skyColor"></n-color-picker>
        </setting-item>
        <setting-item name="Pitch angle">
          <n-input-number v-model:value="optionData.mapOptions.pitch" :min="0" :max="83" size="small"></n-input-number>
        </setting-item>
      </setting-item-box>
    </template>
  </collapse-item>
  <collapse-item name="Label" :expanded="true">
    <setting-item-box name="Style">
      <setting-item name="Type">
        <n-select size="small" v-model:value="optionData.mapOptions.mapMarkerType" :options="MarkerOptions" />
      </setting-item>
      <setting-item name="Color">
        <n-color-picker v-model:value="optionData.mapOptions.marker.fillColor" size="small"></n-color-picker>
      </setting-item>
    </setting-item-box>
  </collapse-item>
  <collapse-item name="Layer" :expanded="true">
    <setting-item-box name="Satellite layer">
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.mapOptions.satelliteTileLayer.show" size="small" />
          <n-text>Whether to display</n-text>
        </n-space>
      </setting-item>
      <setting-item name="Superposition order values">
        <n-input-number
          v-model:value="optionData.mapOptions.satelliteTileLayer.zIndex"
          :min="0"
          size="small"
        ></n-input-number>
      </setting-item>
      <setting-item name="Transparency">
        <n-input-number
          v-model:value="optionData.mapOptions.satelliteTileLayer.opacity"
          :min="0"
          :max="1"
          step="0.1"
          size="small"
        ></n-input-number>
      </setting-item>
      <setting-item name="Zoom level range">
        <n-slider v-model:value="optionData.mapOptions.satelliteTileLayer.zooms" range :step="1" :max="18" :min="3" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="Road network layer">
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.mapOptions.roadNetTileLayer.show" size="small" />
          <n-text>Whether to display</n-text>
        </n-space>
      </setting-item>
      <setting-item name="Superposition order values">
        <n-input-number
          v-model:value="optionData.mapOptions.roadNetTileLayer.zIndex"
          :min="0"
          size="small"
        ></n-input-number>
      </setting-item>
      <setting-item name="Transparency">
        <n-input-number
          v-model:value="optionData.mapOptions.roadNetTileLayer.opacity"
          :min="0"
          :max="1"
          step="0.1"
          size="small"
        ></n-input-number>
      </setting-item>
      <setting-item name="Zoom level range">
        <n-slider v-model:value="optionData.mapOptions.roadNetTileLayer.zooms" range :step="1" :max="18" :min="3" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="real time traffic">
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.mapOptions.trafficTileLayer.show" size="small" />
          <n-text>Whether to display</n-text>
        </n-space>
      </setting-item>
      <setting-item name="Superposition order values">
        <n-input-number
          v-model:value="optionData.mapOptions.trafficTileLayer.zIndex"
          :min="0"
          size="small"
        ></n-input-number>
      </setting-item>
      <setting-item name="Transparency">
        <n-input-number
          v-model:value="optionData.mapOptions.trafficTileLayer.opacity"
          :min="0"
          :max="1"
          step="0.1"
          size="small"
        ></n-input-number>
      </setting-item>
      <setting-item name="Zoom level range">
        <n-slider v-model:value="optionData.mapOptions.trafficTileLayer.zooms" range :step="1" :max="18" :min="3" />
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option, MarkerEnum, ThemeEnum, LangEnum, ViewModeEnum, ShowHideEnum, FeaturesEnum } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const themeOptions = [
  {
    value: ThemeEnum.NORMAL,
    label: 'Standard'
  },
  {
    value: ThemeEnum.DARK,
    label: 'Phantom Black'
  },
  {
    value: ThemeEnum.LIGHT,
    label: 'Moonshine silver'
  },
  {
    value: ThemeEnum.WHITES_MOKE,
    label: 'Far Mountains'
  },
  {
    value: ThemeEnum.FRESH,
    label: 'The grass is blue'
  },
  {
    value: ThemeEnum.GREY,
    label: 'Ascot Grey'
  },
  {
    value: ThemeEnum.GRAFFITI,
    label: 'Grafitti'
  },
  {
    value: ThemeEnum.MACARON,
    label: 'Macarons'
  },
  {
    value: ThemeEnum.BLUE,
    label: 'Indigo blue'
  },
  {
    value: ThemeEnum.DARKBLUE,
    label: 'Polar Night Blue'
  },
  {
    value: ThemeEnum.WINE,
    label: 'Sauce seeds'
  }
]

const langOptions = [
  {
    value: LangEnum.ZH_CN,
    label: 'Chinese Simplified'
  },
  {
    value: LangEnum.EN,
    label: 'English'
  },
  {
    value: LangEnum.ZH_EN,
    label: 'Chinese and English'
  }
]

const viewModeOptions = [
  {
    value: ViewModeEnum.PLANE,
    label: '2D'
  },
  {
    value: ViewModeEnum.STEREOSCOPIC,
    label: '3D'
  }
]

const featuresOptions = [
  {
    value: FeaturesEnum.BG,
    label: 'Area polygons'
  },
  {
    value: FeaturesEnum.POINT,
    label: 'Annotation'
  },
  {
    value: FeaturesEnum.ROAD,
    label: 'Road'
  },
  {
    value: FeaturesEnum.BUILDING,
    label: 'Building'
  }
]

const MarkerOptions = [
  {
    value: MarkerEnum.CIRCLE_MARKER,
    label: 'Circular punctuation'
  },
  {
    value: MarkerEnum.MARKER,
    label: 'Locate punctuation'
  },
  {
    value: MarkerEnum.NONE,
    label: 'Hide punctuation'
  }
]
</script>
