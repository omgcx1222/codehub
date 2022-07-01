<template>
  <div class="user-header">
    <div class="avatar">
      <img v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" alt="" />
      <img v-else src="@/assets/img/user.png" />
    </div>
    <div class="nickname">
      <span>{{ userInfo.nickname ?? "未登录" }}</span>
      <span class="signature">{{ userInfo.signature ?? "因为个性所以没签名" }}</span>
    </div>
    <div class="login">
      <hqq-tag v-if="!userInfo.token" @click="login(1)" value="去登录"></hqq-tag>
      <hqq-tag v-else @click="login(0)" value="退出登录"></hqq-tag>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "@/store"
import { useRouter } from "vue-router"
import hqqTag from "@/components/hqqTag.vue"

export default defineComponent({
  components: {
    hqqTag
  },
  setup() {
    const store = useStore()
    const userInfo = computed(() => store.state.loginModule.userInfo)

    const router = useRouter()
    const login = (type: 1 | 0) => {
      if (type) {
        router.push({
          path: "/login"
        })
      } else {
        store.dispatch("loginModule/loginOutAction")
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
.user-header {
  // width: 100%;
  padding: 50px 15px 30px;
  // height: 300px;
  display: flex;
  .avatar {
    width: 60px;
    height: 60px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .nickname {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-weight: 600;
    span {
      padding-left: 15px;
    }
    .signature {
      font-size: 12px;
      font-weight: 500;
      color: var(--dark-color2);
    }
  }
  .login {
    line-height: 60px;
  }
}
</style>
