<template>
  <div class="chat-item">
    <div style="height: 8px; background-color: var(--dark-color1)"></div>
    <div class="item" @click="chatDetai">
      <hqq-header name="正能量聊天群" :img="require('@/assets/img/chat.png')" message="小明：哈哈哈" size="50px">
        <template #right>
          <div class="time">12:20</div>
        </template>
      </hqq-header>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import hqqHeader from "@/components/hqqHeader.vue"

export default defineComponent({
  components: {
    hqqHeader
  },
  setup() {
    const chatDetai = () => {
      console.log("进入")
    }
    return {
      chatDetai
    }
  }
})
</script>

<style scoped lang="less">
.chat-item {
  height: calc(100vh - 80px - 50px);
  overflow: scroll;
  .item {
    margin: 20px;
    .time {
      font-size: 12px;
      color: var(--dark-color2);
    }
  }
}
</style>
