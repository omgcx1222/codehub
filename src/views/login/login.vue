<template>
  <div class="login">
    <div class="back">
      <van-icon class="icon" name="arrow-left" size="1.1em" />
    </div>
    <account ref="accountRef" />
    <van-button type="primary" @click="login">登录</van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import account from "./components/account.vue"

export default defineComponent({
  components: {
    account
  },
  setup() {
    const accountRef = ref<InstanceType<typeof account>>()
    const login = () => {
      accountRef.value?.login()
    }

    return {
      accountRef,
      login
    }
  }
})
</script>

<style scoped lang="less">
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
