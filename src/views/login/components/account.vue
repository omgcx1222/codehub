<template>
  <div class="account">
    <div class="title">
      <span class="app-name">codehub</span>
      <span class="forgot-password">忘记密码？</span>
    </div>
    <div class="code">
      <label>
        <input type="text" />
        <van-icon class="icon" name="clear" size="20px" color="#bbb" />
      </label>
      <label>
        <input type="text" />
        <van-icon class="icon" name="clear" size="20px" color="#bbb" />
      </label>
      <label>
        <input type="password" />
        <van-icon class="icon" name="eye" size="23px" color="#bbb" />
      </label>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue"

export default defineComponent({
  setup() {
    const value1 = reactive({
      v1: ""
    })
    const value2 = ref("123")
    return {
      value1,
      value2
    }
  }
})
</script>

<style scoped lang="less">
// .account {
//   width: 100vw;
//   height: 100vh;
// }
// .main {
//   width: 100%;
// }

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

.code {
  padding: 20px;
  display: flex;
  flex-direction: column;
  label {
    flex: 1;
    display: flex;
    align-items: center;
    background-color: #ededed;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  input {
    flex: 1;
    height: 36px;
    font-size: 18px;
    background-color: #ededed;
    padding: 5px 0 5px 10px;
    border-radius: 5px;
    border: none;
  }
  .icon {
    width: 40px;
    text-align: center;
    line-height: 40px;
  }
}
</style>
