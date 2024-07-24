<template>
  <!-- 组件配置 -->
  <n-divider class="go-my-3" title-placement="left"></n-divider>
  <setting-item-box
    :itemRightStyle="{
      gridTemplateColumns: '6fr 2fr'
    }"
    style="padding-right: 25px"
  >
    <template #name>
      Address
      <n-tooltip trigger="hover" v-if="isDev()">
        <template #trigger>
          <n-icon size="21" :depth="3">
            <help-outline-icon></help-outline-icon>
          </n-icon>
        </template>
        <ul class="go-pl-0">
          Use of the development environment mock data，please enter
          <li v-for="item in apiList" :key="item.value">
            <n-text type="info"> {{ item.value }} </n-text>
          </li>
        </ul>
      </n-tooltip>
    </template>
    <setting-item name="How the request is made & URL address">
      <n-input-group>
        <n-select class="select-type-options" v-model:value="requestHttpType" :options="selectTypeOptions" />
        <n-input v-model:value.trim="requestUrl" :min="1" placeholder="Please enter an address (remove the pre-URL.)）">
          <template #prefix>
            <n-text>{{ requestOriginUrl }}</n-text>
            <n-divider vertical />
          </template>
        </n-input>
      </n-input-group>
      <!-- 组件url -->
    </setting-item>
    <setting-item name="The update interval of 0 will only initialize">
      <n-input-group>
        <n-input-number
          v-model:value.trim="requestInterval"
          class="select-time-number"
          min="0"
          :show-button="false"
          placeholder="Global data is used by default"
        >
        </n-input-number>
        <!-- 单位 -->
        <n-select class="select-time-options" v-model:value="requestIntervalUnit" :options="selectTimeOptions" />
      </n-input-group>
    </setting-item>
  </setting-item-box>
  <setting-item-box name="Choose how you want to" class="go-mt-0">
    <request-header :targetDataRequest="targetDataRequest"></request-header>
  </setting-item-box>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '@/views/chart/ContentConfigurations/components/hooks/useTargetData.hook'
import { selectTypeOptions, selectTimeOptions } from '@/views/chart/ContentConfigurations/components/ChartData/index.d'
import { RequestConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { RequestHeader } from '../RequestHeader'
import { isDev } from '@/utils'
import { icon } from '@/plugins'
import {
  graphUrl,
  chartDataUrl,
  chartSingleDataUrl,
  rankListUrl,
  scrollBoardUrl,
  numberFloatUrl,
  numberIntUrl,
  textUrl,
  imageUrl,
  radarUrl,
  heatMapUrl,
  scatterBasicUrl,
  mapUrl,
  capsuleUrl,
  wordCloudUrl,
  treemapUrl,
  threeEarth01Url,
  sankeyUrl
} from '@/api/mock'

const props = defineProps({
  targetDataRequest: Object as PropType<RequestConfigType>
})

const { HelpOutlineIcon } = icon.ionicons5
const { chartEditStore } = useTargetData()
const { requestOriginUrl } = toRefs(chartEditStore.getRequestGlobalConfig)
const { requestInterval, requestIntervalUnit, requestHttpType, requestUrl } = toRefs(
  props.targetDataRequest as RequestConfigType
)

const apiList = [
  {
    value: `【Chart】${chartDataUrl}`
  },
  {
    value: `【single data charts】${chartSingleDataUrl}`
  },
  {
    value: `【Text】${textUrl}`
  },
  {
    value: `【0~100 Integer】${numberIntUrl}`
  },
  {
    value: `【0~1Fractional】${numberFloatUrl}`
  },
  {
    value: `【Picture address】${imageUrl}`
  },
  {
    value: `【Ranked lists】${rankListUrl}`
  },
  {
    value: `【Scroll the table】${scrollBoardUrl}`
  },
  {
    value: `【Lei-hsien】${radarUrl}`
  },
  {
    value: `【Heatmap】${heatMapUrl}`
  },
  {
    value: `【Basic scatter plot】${scatterBasicUrl}`
  },
  {
    value: `【Map data】${mapUrl}`
  },
  {
    value: `【Capsule column diagram】${capsuleUrl}`
  },
  {
    value: `【Word clouds】${wordCloudUrl}`
  },
  {
    value: `【Tree diagram】${treemapUrl}`
  },
  {
    value: `【Three-dimensional Earth】${threeEarth01Url}`
  },
  {
    value: `【Sankey Diagram】${sankeyUrl}`
  },
  {
    value: `【Diagrams】${graphUrl}`
  }
]
</script>

<style lang="scss" scoped>
.select-time-number {
  width: 100%;
}
.select-time-options {
  width: 100px;
}
.select-type-options {
  width: 120px;
}
</style>
