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

export default defineComponent({
  name: "App",
  setup() {
    const animationName = ref("")
    const router = useRouter()
    router.beforeEach((to, from) => {
      // route.path === '/chatDetail' ? 'chat-detail' : ''
      if (to.path === "/chatDetail" || to.path === "/momentDetail" || to.path === "/changeInfo") {
        animationName.value = "chat-detail"
      } else if (from.path === "/chatDetail" || from.path === "/momentDetail" || from.path === "/changeInfo") {
        animationName.value = "chat-detail2"
      } else {
        animationName.value = ""
      }
    })

    const store = useStore()
    const rooms = computed(() => store.state.chatModule.chatRooms)
    const tips = computed(() => {
      return (
        rooms.value.reduce((pre, cur) => {
          return pre + (cur.tips ?? 0)
        }, 0) || ""
      )
    })

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
.chat-detail-enter-active,
.chat-detail2-leave-active {
  transition: transform 0.3s ease;
}
.chat-detail-enter-from {
  transform: translateX(100%);
}

.chat-detail2-leave-to {
  transform: translateX(100%);
}
</style>
