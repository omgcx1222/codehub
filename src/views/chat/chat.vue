<template>
  <div class="chat">
    <router-view></router-view>
    <chat-header></chat-header>
    <van-pull-refresh v-model="loading" @refresh="onRefresh" class="pull">
      <van-list class="chat-main" :loading="false" :finished="true" v-if="chatRooms.length">
        <div class="item" v-for="item in chatRooms" :key="item.id" @click="chatDetail(item)">
          <hqq-header :name="item.name" :img="roomItemImg(item)" :message="roomItemMessage(item)" size="50px" :isPopoverShow="false">
            <template #right>
              <div class="date">
                <div>{{ $formatDate(item.chats[item.chats.length - 1]?.createTime) }}</div>
                <div v-show="item.tips" class="tips">{{ item.tips ?? 0 <= 99 ? item.tips : "99+" }}</div>
              </div>
            </template>
          </hqq-header>
        </div>
      </van-list>
      <!-- <div class="chat-main" v-if="chatRooms.length">

      </div> -->
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from "vue"
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
    const chatDetail = (item: any) => {
      // chatRoomIndex.value = index
      router.push({
        path: "/chatDetail",
        query: {
          id: item.id
        }
      })
    }

    const roomItemMessage = (item: any) => {
      return `
        ${item?.type === "私聊" ? "" : item.chats[item.chats.length - 1]?.author.nickname + ": "}
        ${item.chats[item.chats.length - 1]?.message ?? ""}
      `
    }
    const roomItemImg = (item: any) => {
      if (item.type === "私聊") {
        return `${item.img ?? require("@/assets/img/user.png")}`
      }
      return require("@/assets/img/chat.png")
    }

    const loading = ref(false)
    const onRefresh = () => {
      loading.value = true
      store.dispatch("chatModule/reConnectionAction")
      nextTick(() => {
        loading.value = false
      })
    }

    return {
      chatRoomIndex,
      chatDetail,
      chatRooms,
      roomItemMessage,
      roomItemImg,
      loading,
      onRefresh
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
.pull {
  border-top: 8px solid var(--line-bg-color);
  height: calc(100vh - 80px - 50px - 8px);
  overflow: scroll;
}

.chat-main {
  .item:nth-last-child(2) {
    padding-bottom: 25px;
  }
  .item {
    margin: 25px 20px 0;
    :deep(.title) {
      overflow: hidden;
    }
    :deep(.message) {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
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
</style>
