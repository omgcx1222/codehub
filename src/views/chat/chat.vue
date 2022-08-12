<template>
  <div class="chat">
    <chat-header></chat-header>
    <div class="chat-main">
      <div class="item" v-for="item in chatRooms" :key="item.id" @click="chatDetail(item.id)">
        <hqq-header
          :name="item.name"
          :img="item.img ?? require('@/assets/img/chat.png')"
          :message="roomItemMessage(item)"
          size="50px"
          :isPopoverShow="false"
        >
          <template #right>
            <div class="date">
              <div>{{ $formatDate(item.chats[item.chats.length - 1].createTime) }}</div>
              <!-- <van-badge :content="item.tips" max="99" v-show="item.tips" /> -->
              <div v-show="item.tips" class="tips">{{ item.tips <= 99 ? item.tips : "99+" }}</div>
            </div>
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
  name: "chat",
  components: {
    chatHeader
  },
  setup() {
    const store = useStore()
    const chatRooms = computed(() => store.state.chatModule.chatRooms)

    const chatRoomIndex = ref(-1)
    const router = useRouter()
    const chatDetail = (id: number) => {
      // chatRoomIndex.value = index
      router.push({
        path: "/chatDetail",
        query: {
          id
        }
      })
    }

    const roomItemMessage = (item: any) => {
      return `
        ${item.img ? "" : item.chats[item.chats.length - 1].author.nickname + ": "}
        ${item.chats[item.chats.length - 1].message}
      `
    }

    return {
      chatRoomIndex,
      chatDetail,
      chatRooms,
      roomItemMessage
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
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-end;
      .tips {
        display: inline-block;
        background-color: var(--van-danger-color);
        color: var(--van-white);
        padding: 0 3px;
        border-radius: 999px;
      }
    }
  }
}
// .chat-detail {
//   position: fixed;
//   top: 0;
//   z-index: 10;
// }
// .chat-detail-enter-active,
// .chat-detail-leave-active {
//   transition: transform 0.3s ease;
// }
// .chat-detail-enter-from,
// .chat-detail-leave-to {
//   transform: translateX(100%);
// }
</style>
