<template>
  <div class="moment">
    <van-tabs v-model:active="tabActive" swipeable class="vant-tabs">
      <van-tab v-for="item in tabs" :title="item" :key="item" @click="abc">
        {{ item + "内容" }}
        {{ obj2 }}
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
    const obj1 = {
      name: 123
    }
    const obj2 = ref(obj1)
    const abc = () => {
      console.log(obj1.name)

      // obj2.value = {
      //   name: 99999
      // }
      obj2.value.name = 321
      console.log(obj1.name)
    }

    return {
      tabs,
      tabActive,
      obj2,
      abc
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
  // tab的header
  :deep(.van-tabs__wrap) {
    background-color: var(--white-background-color);
  }
  // tab的父
  :deep(.van-tabs__nav) {
    width: 240px;
    margin: 0 auto;
    padding-bottom: 10px;
  }
  // 单个tab
  :deep(.van-tab) {
    font-size: var(--moment-title-font-siez);
    color: var(--moment-title-color);
  }
  // 激活的tab
  :deep(.van-tab--active) {
    color: var(--moment-title-active-color);
  }
  // 线
  :deep(.van-tabs__line) {
    background-color: var(--moment-line-color);
  }
  // 内容
  :deep(.van-tabs__content) {
    height: calc(100vh - 44px - 50px);
  }
}
</style>
