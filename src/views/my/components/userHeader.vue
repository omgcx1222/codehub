<template>
  <div class="user-header">
    <div>
      <div>{{ userInfo }}</div>
      <div @click="login">去登录</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

export default defineComponent({
  setup() {
    const router = useRouter()
    const login = () => {
      router.push({
        path: "/login"
      })
    }

    const store = useStore()
    const userInfo = computed(() => store.state.loginModule.userInfo)
    return {
      login,
      userInfo
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
