<template>
  <img class="list-img" v-lazy="imageInfo" alt="Chart image" />
</template>

<script setup lang="ts">
import { ref, PropType, watch } from 'vue'
import { fetchImages } from '@/packages'
import { ConfigType } from '@/packages/index.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<ConfigType>,
    required: true
  }
})

const imageInfo = ref('')

// 获取图片
const fetchImageUrl = async () => {
  imageInfo.value = await fetchImages(props.chartConfig)
}

watch(
  () => props.chartConfig.key,
  () => fetchImageUrl(),
  {
    immediate: true
  }
)
</script>
