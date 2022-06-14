<template>
  <router-view></router-view>
  <van-tabbar route>
    <van-tabbar-item icon="smile" replace to="/moment">动态</van-tabbar-item>
    <van-tabbar-item icon="chat" replace to="/chat">聊天</van-tabbar-item>
    <van-tabbar-item icon="manager" replace to="/my">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "App"
})
</script>

<style lang="less">
@import url("@/assets/base.css");
</style>
