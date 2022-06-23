<template>
  <div class="moment">
    <van-tabs v-model:active="tabActive" swipeable class="vant-tabs">
      <van-tab v-for="item in tabs" :title="item" :key="item">
        {{ item + "内容" }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  name: "moment",
  setup() {
    const tabs = ["推荐", "关注"]
    const tabActive = ref(0)

    return {
      tabs,
      tabActive
    }
  }
}
</script>

<style lang="less" scoped>
.moment {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.vant-tabs {
  :deep(.van-tab) {
    font-size: var(--moment-title-font-siez);
    color: var(--moment-title-color);
  }
  :deep(.van-tab--active) {
    color: var(--moment-title-active-color);
  }
  :deep(.van-tabs__nav) {
    width: 240px;
    margin: 0 auto;
    padding-bottom: 10px;
  }
  :deep(.van-tabs__line) {
    background-color: var(--moment-line-color);
  }
  :deep(.van-tabs__content) {
    height: calc(100vh - 44px - 50px);
  }
}
</style>
