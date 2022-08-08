<template>
  <div class="my">
    <div class="header">
      <hqq-header
        :img="userInfo.avatarUrl ?? undefined"
        :name="userInfo.nickname ?? '未登录'"
        :message="userInfo.signature ?? '因为个性所以没签名'"
        :rightText="userInfo.id ? '退出登录' : '去登录'"
        size="60px"
        @clickRight="login"
        :isPopoverShow="false"
      ></hqq-header>
    </div>

    <div class="menu">
      <menu-header></menu-header>
      <menu-option></menu-option>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "@/store"
import { useRouter } from "vue-router"
import { Dialog } from "vant"

import hqqHeader from "@/components/hqqHeader.vue"
import menuHeader from "./components/menuHeader.vue"
import menuOption from "./components/menuOption.vue"

export default defineComponent({
  components: {
    hqqHeader,
    menuHeader,
    menuOption
  },
  setup() {
    const store = useStore()
    const userInfo = computed(() => store.state.userInfo)

    const router = useRouter()
    const login = () => {
      if (!userInfo.value.id) {
        router.push({
          path: "/login"
        })
      } else {
        Dialog.confirm({
          message: "是否退出登录"
        }).then(() => {
          store.dispatch("loginModule/loginOutAction")
        })
      }
    }
    return {
      login,
      userInfo
    }
  }
})
</script>

<style scoped lang="less">
.my {
  width: 100%;
  height: calc(100vh - 50px);
  overflow: hidden;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
}
.header {
  font-size: 15px;
  padding: 50px 15px 30px;
  // :deep(.img) {
  //   width: 60px;
  //   height: 60px;
  // }
  // :deep(.title) {
  //   min-height: 60px;
  // }
  :deep(.name) {
    font-weight: 600;
  }
}
.menu {
  flex: 1;
  background-color: var(--menu-option-background-color);
  border-radius: 20px 20px 0 0;
  padding: 20px 15px 0;
}
</style>
