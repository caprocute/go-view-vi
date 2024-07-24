<template>
  <n-radio-group :value="props.modelValue || INHERIT_VALUE" @update:value="handleChange">
    <n-space>
      <n-tooltip :show-arrow="false" trigger="hover" v-for="item in rendererList" :key="item.value">
        <template #trigger>
          <n-radio :value="item.value">
            {{ item.value }}
          </n-radio>
        </template>
        {{ item.desc }}
      </n-tooltip>
    </n-space>
  </n-radio-group>
</template>
<script setup lang="ts">
import { type EchartsRenderer } from '@/settings/chartThemes'

const props = defineProps<{ modelValue?: EchartsRenderer; includeInherit?: boolean }>()
const emits = defineEmits(['update:modelValue'])

const INHERIT_VALUE = 'inherit'

const handleChange = (val: EchartsRenderer & typeof INHERIT_VALUE) => {
  emits('update:modelValue', val === INHERIT_VALUE ? undefined : val)
}

const rendererList = [
  {
    value: 'svg',
    desc: 'Better performance in zoomed scenes'
  },
  {
    value: 'canvas',
    desc: 'It is recommended to select a large amount of data (empirical judgment > 1k) and a large number of interactions'
  },
  ...(props.includeInherit
    ? [
        {
          value: INHERIT_VALUE,
          desc: 'The global configuration is inherited by default'
        }
      ]
    : [])
]
</script>
