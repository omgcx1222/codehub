<template>
  <router-view v-slot="{ Component, route }">
    <!-- <keep-alive :exclude="['pubMoment', 'momentDetail']"> -->
    <keep-alive>
      <transition :name="route.path === '/chatDetail' ? 'chat-detail' : ''" mode="in-out">
        <component :is="Component" />
      </transition>
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
.chat-detail-enter-active,
.chat-detail-leave-active {
  transition: transform 0.3s ease;
}
.chat-detail-enter-from,
.chat-detail-leave-to {
  transform: translateX(100%);
}
</style>
