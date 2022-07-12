<template>
  <div class="account">
    <label v-show="loginType === 'register'">
      <input type="text" v-model="userInfo.nickname" placeholder="昵称(1~10任意字符)" />
    </label>
    <label>
      <input
        type="text"
        v-model="userInfo.username"
        placeholder="账号(4~16, 英文或数字)"
        @focus="isShow(true)"
        @blur="isShow(false)"
      />
      <span class="icon" @click="clear">
        <van-icon class="icon" name="clear" size="20px" color="#bbb" v-show="clearIconShow" />
      </span>
    </label>
    <label>
      <input :type="inputType" v-model="userInfo.password" placeholder="密码(4~16, 至少包含数字英文两种以上)" />
      <span class="icon" @click="showPassword">
        <van-icon class="icon-i" name="eye" size="23px" :color="eyeColor" />
      </span>
    </label>
  </div>
  <div class="login-button">
    <van-button type="primary" @click="clickLogin" :style="{ color: loginTextColor }">{{ loginText }}</van-button>
  </div>
  <div class="login-tip">
    <span v-if="loginType === 'login'" @click="changeLoginType('register')">没有账号？去注册</span>
    <span v-else @click="changeLoginType('login')">已有账号？去登录</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from "vue"
import { useStore } from "vuex"
import { Toast } from "vant"

export default defineComponent({
  setup() {
    const store = useStore()
    const userInfo = reactive({
      nickname: "",
      username: "",
      password: ""
    })
    const clearIconShow = ref(false)
    const isShow = (b: boolean) => {
      clearIconShow.value = b
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

    const loginType = ref<"register" | "login">("login")
    const loginText = computed(() => (loginType.value === "login" ? "登 录" : "注 册"))
    const loginTextColor = computed(() => {
      validator()
      if (!tip) {
        return "#fff"
      }
      return "#c8c9ccd9"
    })
    const changeLoginType = (type: "register" | "login") => {
      loginType.value = type
    }
    // /^(\S){1,10}$/
    const usernameRule = /^[a-zA-Z0-9]{4,16}$/
    const passwordRule = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{4,16}$/
    let tip = ""
    const validator = () => {
      if (loginType.value === "register" && (userInfo.nickname.length < 1 || userInfo.nickname.length > 10)) {
        tip = "请输入正确的昵称(1~10任意字符)"
      } else if (!usernameRule.test(userInfo.username)) {
        tip = "请输入正确的账号(4~16, 英文或数字)"
      } else if (!passwordRule.test(userInfo.password)) {
        tip = "请输入正确的密码(4~16, 至少包含数字英文两种以上)"
      } else {
        tip = ""
      }
    }

    const clickLogin = async () => {
      validator()
      if (tip === "") {
        if (loginType.value === "login") {
          store.dispatch("loginModule/loginAction", { ...userInfo })
        } else {
          store.dispatch("loginModule/registerAction", { ...userInfo })
        }
      } else {
        Toast({
          message: tip,
          position: "top"
        })
      }
    }

    return {
      userInfo,
      clickLogin,
      inputType,
      eyeColor,
      showPassword,
      clearIconShow,
      isShow,
      clear,
      loginType,
      loginText,
      loginTextColor,
      changeLoginType
    }
  }
})
</script>

<style scoped lang="less">
.account {
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
  background-color: var(--white-background-color);
  label {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 5px;
    margin-bottom: 15px;
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

.login-button {
  padding: 0 20px;
  display: flex;
  button {
    flex: 1;
    border-radius: 5px;
    // color: #dfdfdf;
    font-weight: 600;
    font-size: 18px;
  }
}

.login-tip {
  text-align: center;
  margin: 30px auto;
}
</style>
