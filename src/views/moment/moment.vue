<template>
  <div class="moment">
    <van-tabs v-model:active="tabActive" swipeable class="vant-tabs">
      <van-tab v-for="item in tabs" :title="item" :key="item">
        {{ item + "内容" }}
      </van-tab>
    </van-tabs>
    <div class="suspension">
      <van-button class="pub-button" icon="edit" type="primary" round to="/pubMoment" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue"
import { useStore } from "vuex"
import { mometnListBody } from "@/network/moment/types"
export default {
  name: "moment",
  setup() {
    const tabs = ["推荐", "关注"]
    const tabActive = ref(0)

    const store = useStore()
    const getMoment = (payload?: mometnListBody) => {
      store.dispatch("momentModule/momentListAction", payload)
    }

    onMounted(() => {
      // pubMoment("芜湖")
      getMoment({ order: 1, limit: 100, offset: 0 })
    })

    return {
      tabs,
      tabActive,
      getMoment
    }
  }
}
</script>

<style lang="less" scoped>
.moment {
  width: 100%;
  height: calc(100vh - 50px);
  overflow: hidden;
  position: relative;
}
.suspension {
  position: absolute;
  bottom: 25px;
  right: 20px;
  .pub-button {
    width: 45px;
    height: 45px;
  }
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
