<template>
  <div class="hqq-message">
    <span style="color: var(--van-blue)">{{ name }}</span>
    <span v-if="isShowReplyText">
      <span> 回复 </span>
      <span style="color: var(--van-blue)">{{ "@" + byName }}</span>
    </span>
    <!-- <span> : </span> -->
    <span class="content">{{ message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    name: {
      type: String,
      default: ""
    },
    // 是否显示文字：回复
    isShowReplyText: {
      type: Boolean,
      default: true
    },
    // 显示 “回复” 文字时，回复的 昵称
    byName: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.hqq-message {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.content {
  word-break: break-all;
}
</style>
