<template>
  <div class="account">
    <div class="title">
      <span class="app-name">codehub</span>
      <span class="forgot-password">忘记密码？</span>
    </div>
    <div class="code">
      <label>
        <input
          type="text"
          v-model="userInfo.nickname"
          placeholder="昵称(1~10任意字符)"
          @input="input($event, 'nickname')"
        />
      </label>
      <label>
        <input
          type="text"
          v-model="userInfo.username"
          placeholder="账号(4~16, 英文或数字)"
          @focus="isShow(true)"
          @blur="isShow(false)"
          @input="input($event, 'username')"
        />
        <span class="icon" @click="clear">
          <van-icon class="icon" name="clear" size="20px" color="#bbb" v-show="iconShow" />
        </span>
      </label>
      <label>
        <input
          :type="inputType"
          v-model="userInfo.password"
          placeholder="密码(4~16, 至少包含数字英文两种以上)"
          @focus="pFocus"
          @input="input($event, 'password')"
        />
        <span class="icon" @click="showPassword">
          <van-icon class="icon-i" name="eye" size="23px" :color="eyeColor" />
        </span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import { Toast } from "vant"

export default defineComponent({
  setup() {
    const userInfo = reactive({
      nickname: "",
      username: "",
      password: ""
    })
    const iconShow = ref(false)
    const isShow = (b: boolean) => {
      iconShow.value = b
    }
    const clear = () => {
      userInfo.username = ""
    }

    const inputType = ref("password")
    const eyeColor = ref("#bbb")
    const showPassword = () => {
      if (inputType.value === "password") {
        inputType.value = "text"
        eyeColor.value = "#000"
      } else {
        inputType.value = "password"
        eyeColor.value = "#bbb"
      }
    }

    const usernameRule = /^[a-zA-Z0-9]{4,16}$/
    const passwordRule = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{4,16}$/
    let tip = "默认值"
    const input = () => {
      // console.log((e.target as HTMLInputElement).value)
      if (userInfo.nickname.length < 1 || userInfo.nickname.length > 10) {
        tip = "请输入正确的昵称(1~10任意字符)"
      } else if (!usernameRule.test(userInfo.username)) {
        tip = "请输入正确的账号(4~16, 英文或数字)"
      } else if (!passwordRule.test(userInfo.password)) {
        tip = "请输入正确的密码(4~16, 至少包含数字英文两种以上)"
      } else {
        tip = ""
      }
    }
    const login = () => {
      if (tip === "") {
        console.log(userInfo)
      } else {
        Toast("qweqweqwqw")
      }
    }

    return {
      userInfo,
      login,
      inputType,
      eyeColor,
      showPassword,
      iconShow,
      isShow,
      clear,
      input
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

.code {
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  label {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 5px;
    margin-bottom: 10px;
    input {
      flex: 1;
      height: 36px;
      font-size: 18px;
      background-color: #ededed;
      padding: 5px 0 5px 10px;
      border-radius: 5px 0 0 5px;
      border: none;
    }
    .icon {
      width: 30px;
      height: 46px;
      line-height: 46px;
      text-align: center;
      background-color: #ededed;
      border-radius: 0 5px 5px 0;
      .icon-i {
        line-height: 46px;
      }
    }
    span {
      color: red;
      font-size: 14px;
      height: 20px;
    }
  }
}
</style>
