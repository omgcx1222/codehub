<template>
  <div class="chat">
    <chat-header></chat-header>
    <div class="chat-main">
      <div class="item" v-for="i in 10" :key="i" @click="chatDetail('1')">
        <hqq-header name="正能量聊天群" :img="require('@/assets/img/chat.png')" message="小明：哈哈哈" size="50px">
          <template #right>
            <div class="time">12:20</div>
          </template>
        </hqq-header>
      </div>
    </div>

    <transition name="chat-detail">
      <chat-detail class="chat-detail" v-if="chatRoomId" @back="back" title="正能量聊天群"></chat-detail>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import chatHeader from "./components/chatHeader.vue"
import chatDetail from "./components/chatDetail.vue"

export default defineComponent({
  components: {
    chatHeader,
    chatDetail
  },
  setup() {
    const chatRoomId = ref("")
    const chatDetail = (id: string) => {
      chatRoomId.value = id
    }

    const back = () => {
      chatRoomId.value = ""
    }

    return {
      chatRoomId,
      chatDetail,
      back
    }
  }
})
</script>

<style scoped lang="less">
.chat {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--white-background-color);
}
.chat-main {
  border-top: 8px solid var(--dark-color1);
  height: calc(100vh - 80px - 50px - 8px);
  overflow: scroll;
  .item {
    margin: 25px 20px;
    .date {
      font-size: 12px;
      color: var(--dark-color2);
    }
  }
}
.chat-detail {
  position: fixed;
  top: 0;
  z-index: 10;
}
.chat-detail-enter-active,
.chat-detail-leave-active {
  transition: transform 0.3s ease;
}
.chat-detail-enter-from,
.chat-detail-leave-to {
  transform: translateX(100%);
}
</style>
