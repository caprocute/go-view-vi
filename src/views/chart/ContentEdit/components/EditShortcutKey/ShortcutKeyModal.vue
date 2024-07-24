<template>
  <n-modal v-model:show="modelShowRef" :mask-closable="true" @afterLeave="closeHandle">
    <n-table class="model-content" :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>Function</th>
          <th>Win shortcut key</th>
          <th>
            <n-space justify="space-between">
              <span> Mac shortcut key </span>
              <n-icon size="20" class="go-cursor-pointer" @click="closeHandle">
                <close-icon></close-icon>
              </n-icon>
            </n-space>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in shortcutKeyOptions" :key="index">
          <td>{{ item.label }}</td>
          <td>{{ item.win }}</td>
          <td v-if="item.macSource">{{ item.mac }}</td>
          <td v-else>
            <n-gradient-text :size="22">{{ item.mac.substr(0, 1) }}</n-gradient-text>
            + {{ item.mac.substr(3) }}
          </td>
        </tr>
      </tbody>
    </n-table>
  </n-modal>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { icon } from '@/plugins'
import { WinKeyboard, MacKeyboard } from '@/enums/editPageEnum'

const { CloseIcon } = icon.ionicons5
const modelShowRef = ref(false)

const emit = defineEmits(['update:modelShow'])

const props = defineProps({
  modelShow: Boolean
})


watch(() => props.modelShow, (newValue) => {
  modelShowRef.value = newValue
})

// 快捷键
const shortcutKeyOptions = [
  {
    label: 'Drag the canvas',
    win: `${WinKeyboard.SPACE.toUpperCase()} + 🖱️ `,
    mac: `${MacKeyboard.SPACE.toUpperCase()} + 🖱️ `,
    macSource: true
  },
  {
    label: 'Move Up/Right/Down/Left',
    win: `${WinKeyboard.CTRL.toUpperCase()} + ↑ or → or ↓ or ←`,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + ↑ `
  },
  {
    label: 'Lock',
    win: `${WinKeyboard.CTRL.toUpperCase()} + L `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + L `
  },
  {
    label: 'Unlock',
    win: `${WinKeyboard.CTRL.toUpperCase()} + ${WinKeyboard.SHIFT.toUpperCase()}+ L `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + ${MacKeyboard.SHIFT.toUpperCase()} + L `
  },
  {
    label: 'Show',
    win: `${WinKeyboard.CTRL.toUpperCase()} + H `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + H `
  },
  {
    label: 'Hide',
    win: `${WinKeyboard.CTRL.toUpperCase()} + ${WinKeyboard.SHIFT.toUpperCase()} + H `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + ${MacKeyboard.SHIFT.toUpperCase()} + H `
  },
  {
    label: 'Delete',
    win: 'Delete'.toUpperCase(),
    mac: `${MacKeyboard.CTRL.toUpperCase()} + Backspace `
  },
  {
    label: 'Replication',
    win: `${WinKeyboard.CTRL.toUpperCase()} + C `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + C `
  },
  {
    label: 'Shear',
    win: `${WinKeyboard.CTRL.toUpperCase()} + X `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + X `
  },
  {
    label: 'Paste',
    win: `${WinKeyboard.CTRL.toUpperCase()} + V `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + V `
  },
  {
    label: 'WalkBackwards',
    win: `${WinKeyboard.CTRL.toUpperCase()} + Z `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + Z `
  },
  {
    label: 'Forward',
    win: `${WinKeyboard.CTRL.toUpperCase()} + ${WinKeyboard.SHIFT.toUpperCase()} + Z `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + ${MacKeyboard.SHIFT.toUpperCase()} + Z `
  },
  {
    label: 'Multiple choices',
    win: `${WinKeyboard.CTRL.toUpperCase()} + 🖱️ `,
    mac: `${MacKeyboard.CTRL_SOURCE_KEY.toUpperCase()} + 🖱️ `
  },
  {
    label: 'Create a group',
    win: `${WinKeyboard.CTRL.toUpperCase()} + G / 🖱️ `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + G / 🖱️`
  },
  {
    label: 'Ungroup',
    win: `${WinKeyboard.CTRL.toUpperCase()} + ${WinKeyboard.SHIFT.toUpperCase()} + G `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + ${WinKeyboard.SHIFT.toUpperCase()} + G `
  },
  {
    label: 'Save',
    win: `${WinKeyboard.CTRL.toUpperCase()} + S `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + S `,
  },
]

const closeHandle = () => {
  emit('update:modelShow', false)
}
</script>

<style lang="scss" scoped>
.model-content {
  width: 50vw;
  padding-bottom: 20px;
  overflow: hidden;
  border-radius: 15px;
  td {
    padding: 5px 10px;
  }
}
</style>
