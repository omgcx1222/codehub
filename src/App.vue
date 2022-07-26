<template>
  <router-view v-slot="{ Component }">
    <!-- <keep-alive :exclude="['pubMoment', 'momentDetail']"> -->
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <van-tabbar route :style="{ display: $route.meta.tabbarHidden ? 'none' : '' }">
    <van-tabbar-item icon="smile" replace to="/moment">动态</van-tabbar-item>
    <van-tabbar-item icon="chat" replace to="/chat">消息</van-tabbar-item>
    <van-tabbar-item icon="manager" replace to="/my">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "App"
})
</script>

<style lang="less">
@import url("@/assets/base.css");
// @import url("vant/lib/index.css");
// @import url("vant/lib/toast/index.less");
</style>
