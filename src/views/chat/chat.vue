<template>
  <div class="chat">
    <chat-header></chat-header>
    <div class="chat-main">
      <div class="item" v-for="(item, index) in chatRooms" :key="item.id" @click="chatDetail(item.id, index)">
        <hqq-header :name="item.name" :img="require('@/assets/img/chat.png')" message="小明：哈哈哈" size="50px" :isPopoverShow="false">
          <template #right>
            <div class="time">{{ $formatDate(item.chats[0].createTime, "minute", "MM-DD") }}</div>
          </template>
        </hqq-header>
      </div>
    </div>

    <!-- <transition name="chat-detail">
      <chat-detail class="chat-detail" v-if="chatRoomIndex !== -1" @back="back" :chats="chatRooms[chatRoomIndex]"></chat-detail>
    </transition> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "@/store"
import chatHeader from "./components/chatHeader.vue"
// import chatDetail from "./components/chatDetail.vue"

export default defineComponent({
  components: {
    chatHeader
  },
  setup() {
    const store = useStore()
    const chatRooms = computed(() => store.state.chatModule.chatRooms)

    const chatRoomIndex = ref(-1)
    const router = useRouter()
    const chatDetail = (id: number, index: number) => {
      // chatRoomIndex.value = index
      router.push({
        path: "/chatDetail",
        query: {
          index,
          id
        }
      })
    }

    const back = () => {
      chatRoomIndex.value = -1
    }

    return {
      chatRoomIndex,
      chatDetail,
      back,
      chatRooms
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
