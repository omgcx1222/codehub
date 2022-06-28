<template>
  <div class="login">
    <div class="back">
      <van-icon class="icon" name="arrow-left" size="21" @click="back" />
    </div>
    <div class="title">
      <span class="app-name">codehub</span>
      <span class="forgot-password" v-show="isForgotPasswordShow">忘记密码？</span>
    </div>
    <account ref="accountRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import { useRouter } from "vue-router"
import account from "./components/account.vue"

export default defineComponent({
  components: {
    account
  },
  setup() {
    const accountRef = ref<InstanceType<typeof account>>()
    const isForgotPasswordShow = computed(() => accountRef.value?.loginType === "login")

    const router = useRouter()
    const back = () => {
      router.go(-1)
    }

    return {
      accountRef,
      isForgotPasswordShow,
      back
    }
  }
})
</script>

<style scoped lang="less">
.title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 20px;
  height: 135px;
  .app-name {
    color: #000;
    font-size: 45px;
    font-weight: 600;
  }
  .forgot-password {
    color: #8a8a8a;
    font-weight: 600;
    font-size: 16px;
  }
}
.back {
  // width: 100%;
  height: 44px;
  padding: 0 10px;
  font-size: 20px;
  .icon {
    width: 40px;
    line-height: 44px;
  }
}
</style>
