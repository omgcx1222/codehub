<template>
  <router-view v-slot="{ Component }">
    <!-- <keep-alive :exclude="['pubMoment', 'momentDetail']"> -->
    <transition :name="animationName" mode="in-out">
      <keep-alive :exclude="['momentDetail', 'chatDetail', 'changeInfo']">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <van-tabbar route :style="{ display: $route.meta.tabbarHidden ? 'none' : '' }">
    <van-tabbar-item icon="smile" replace to="/moment">动态</van-tabbar-item>
    <van-tabbar-item icon="chat" replace to="/chat" :badge="tips">消息</van-tabbar-item>
    <van-tabbar-item icon="manager" replace to="/my">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "@/store"

import { setStorage } from "@/utils/localStorage"

export default defineComponent({
  name: "App",
  setup() {
    const animationName = ref("")
    const router = useRouter()

    router.beforeEach((to, from) => {
      // 进入样式
      if (to.path === "/chatDetail" || to.path === "/momentDetail" || to.path === "/changeInfo") {
        animationName.value = "chat-detail-enter"
      } else if (from.path === "/chatDetail" || from.path === "/momentDetail" || from.path === "/changeInfo") {
        // 退出样式
        animationName.value = "chat-detail-leave"
      } else {
        animationName.value = ""
      }

      if (to.path === "/monent" || to.path === "/chat" || to.path === "/my") {
        // 在主页面
        setStorage("quit", 1)
      } else {
        // 在子页面
        setStorage("quit", 0)
      }
    })
    const store = useStore()
    const tips = computed(() => store.getters["chatModule/tips"])

    return {
      animationName,
      tips
    }
  }
})
</script>

<style lang="less">
@import url("@/assets/base.css");
// @import url("vant/lib/index.css");
// @import url("vant/lib/toast/index.less");
.chat-detail-enter-enter-active,
.chat-detail-leave-leave-active {
  transition: transform 0.3s ease;
}
.chat-detail-enter-enter-from {
  transform: translateX(100%);
}

.chat-detail-leave-leave-to {
  transform: translateX(100%);
}
</style>
