<template>
  <collapse-item name="Information" :expanded="true">
    <setting-item-box name="Character" :alone="true">
      <setting-item>
        <n-input v-model:value="optionData.dataset" type="textarea" size="small"></n-input>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="Link" :alone="true">
      <setting-item>
        <n-input-group>
          <n-select
            v-model:value="optionData.linkHead"
            size="small"
            :style="{ width: '80%' }"
            :options="linkHeadOptions"
          />
          <n-input v-model:value="optionData.link" size="small"></n-input>
          <n-button :disabled="!optionData.link" secondary size="small" @click="handleLinkClick">Jump</n-button>
        </n-input-group>
      </setting-item>
    </setting-item-box>
  </collapse-item>

  <collapse-item name="Style" :expanded="true">
    <setting-item-box name="Character">
      <setting-item name="Color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.fontColor"></n-color-picker>
      </setting-item>
      <setting-item name="FontSize">
        <n-input-number v-model:value="optionData.fontSize" size="small" placeholder="Font size"></n-input-number>
      </setting-item>
      <setting-item name="Font weight">
        <n-select v-model:value="optionData.fontWeight" size="small" :options="fontWeightOptions" />
      </setting-item>
      <setting-item name="X-axis padding">
        <n-input-number v-model:value="optionData.paddingX" size="small" placeholder="Enter padding"></n-input-number>
      </setting-item>
      <setting-item name="Y-axis padding">
        <n-input-number v-model:value="optionData.paddingY" size="small" placeholder="Enter padding"></n-input-number>
      </setting-item>

      <setting-item name="Horizontal alignment">
        <n-select v-model:value="optionData.textAlign" size="small" :options="textAlignOptions" />
      </setting-item>
      <setting-item name="Sentence Direction">
        <n-select v-model:value="optionData.writingMode" size="small" :options="verticalOptions" />
      </setting-item>

      <setting-item name="Word spacing">
        <n-input-number v-model:value="optionData.letterSpacing" size="small" placeholder="Enter word spacing"></n-input-number>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="Border">
      <setting-item name="Width">
        <n-input-number
          v-model:value="optionData.borderWidth"
          size="small"
          :min="0"
          placeholder="Width"
        ></n-input-number>
      </setting-item>
      <setting-item name="Color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.borderColor"></n-color-picker>
      </setting-item>
      <setting-item name="Rounded corners">
        <n-input-number
          v-model:value="optionData.borderRadius"
          size="small"
          :min="0"
          placeholder="Rounded corners"
        ></n-input-number>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="Background" :alone="true">
      <setting-item name="Background color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.backgroundColor"></n-color-picker>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option, WritingModeEnum, WritingModeObject, FontWeightEnum, FontWeightObject } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const textAlignOptions = [
  { label: 'Left-aligned', value: 'start' },
  { label: 'Center', value: 'center' },
  { label: 'Align right', value: 'end' }
]

const verticalOptions = [
  {
    label: WritingModeEnum.HORIZONTAL,
    value: WritingModeObject[WritingModeEnum.HORIZONTAL]
  },
  {
    label: WritingModeEnum.VERTICAL,
    value: WritingModeObject[WritingModeEnum.VERTICAL]
  }
]
const fontWeightOptions = [
  {
    label: FontWeightEnum.NORMAL,
    value: FontWeightObject[FontWeightEnum.NORMAL]
  },
  {
    label: FontWeightEnum.BOLD,
    value: FontWeightObject[FontWeightEnum.BOLD]
  }
]
const handleLinkClick = () => {
  window.open(props.optionData.linkHead + props.optionData.link)
}
const linkHeadOptions = [
  { label: 'http://', value: 'http://' },
  { label: 'https://', value: 'https://' }
]
</script>
