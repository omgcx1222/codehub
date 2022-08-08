<template>
  <div class="chat-detail">
    <van-nav-bar left-arrow @click-left="back" :title="chats.name" class="nav-bar">
      <!-- <template #right>
        <van-icon name="ellipsis" size="18" />
      </template> -->
    </van-nav-bar>
    <div class="chat-message">
      <div v-for="(item, index) in chats.chats" :key="item.id">
        <div class="time">{{ chatTime(item.createTime, chats.chats[index - 1]?.createTime ?? 0) }}</div>
        <hqq-header
          class="item"
          :name="item.nickname"
          :img="item.avatarUrl ?? require('@/assets/img/user.png')"
          :isRightShow="false"
          :direction="userInfo.id == item.userId ? 'right' : 'left'"
          :isPopoverShow="userInfo.id == item.userId ? false : true"
          :width="''"
        >
          <template #message>
            <hqq-message
              class="message"
              :style="{ 'background-color': userInfo.id == item.userId ? 'var(--chat-message)' : 'var(--van-white)' }"
              :message="item.message"
              :isShowReplyText="false"
            ></hqq-message>
          </template>
        </hqq-header>
      </div>
    </div>

    <hqq-input @submit="submit"></hqq-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from "vue"
import { useStore } from "@/store"
import { useRoute, useRouter } from "vue-router"

import hqqHeader from "@/components/hqqHeader.vue"
import hqqMessage from "@/components/hqqMessage.vue"
import hqqInput from "@/components/hqqInput.vue"

export default defineComponent({
  components: {
    hqqHeader,
    hqqMessage,
    hqqInput
  },
  // props: {
  //   chats: {
  //     type: Object,
  //     require: true
  //   }
  // },
  emits: ["back"],
  setup() {
    const router = useRouter()
    const back = () => {
      // emit("back")
      router.go(-1)
    }
    const store = useStore()
    const userInfo = computed(() => store.state.userInfo)
    // console.log(userInfo.value.id)

    const currentInstance = getCurrentInstance()?.appContext.config.globalProperties
    const chatTime = (time: Date, preTime: Date) => {
      // const t = currentInstance?.$formatDate(time, "minute")
      const t1 = new Date(time).getTime()
      const t2 = new Date(preTime).getTime()

      // 超出一分钟
      return t1 - t2 > 60000 ? currentInstance?.$formatDate(time, "minute") : ""
    }

    const route = useRoute()
    // const chatId = computed(() => props.chats?.id)
    const chatId = Number(route.query.id)
    const chats = computed(() => store.state.chatModule.chatRooms.find((item) => item.id === chatId))

    const submit = (message: string) => {
      store.dispatch("chatModule/sendMessageAction", { message, chatId: chatId })
    }

    return {
      chats,
      back,
      userInfo,
      chatTime,
      submit
    }
  }
})
</script>

<style scoped lang="less">
.chat-detail {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  position: fixed;
  z-index: 10;
  top: 0;
  .nav-bar {
    background-color: var(--background-color);
  }
}
.chat-message {
  // height: calc(100% - 46px - 50px);
  flex: 1;
  overflow: scroll;
  .item {
    margin: 0 15px 20px 15px;
    .message {
      // background-color: rgb(149, 236, 105);
      // background-color: var(--van-gray-8);
      // color: #fff;
      padding: 8px 10px;
      margin-top: 5px;
      border-radius: 3px;
    }
    :deep(.name) {
      font-size: 12px;
      color: var(--dark-color2);
    }
  }
  .time {
    text-align: center;
    font-size: 12px;
    color: var(--dark-color2);
  }
}
</style>
