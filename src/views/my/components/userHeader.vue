<template>
  <div class="user-header">
    <div>
      <div></div>
      <div @click="login">去登录</div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const login = () => {
      router.push({
        path: "/login"
      })
      store.commit("isTabbarShow", false)
    }
    return {
      login
    }
  }
})
</script>

<style scoped lang="less">
.user-header {
  width: 100%;
  height: 300px;
  background-color: var(--van-badge-color);
}
</style>
