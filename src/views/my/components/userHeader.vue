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

export default defineComponent({
  setup() {
    const router = useRouter()
    const login = () => {
      router.push({
        path: "/login"
      })
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
