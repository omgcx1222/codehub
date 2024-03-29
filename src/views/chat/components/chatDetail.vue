<template>
  <div class="chat-detail">
    <van-nav-bar left-arrow @click-left="back" :title="title" class="nav-bar">
      <!-- <template #right>
        <van-icon name="ellipsis" size="18" />
      </template> -->
    </van-nav-bar>
    <div class="chat-message" ref="chatListRef">
      <div v-if="chats?.chats?.length">
        <template v-for="(item, index) in chats.chats" :key="item.id">
          <div class="time">{{ chatTime(item.createTime, chats?.chats[index - 1]?.createTime ?? 0) }}</div>
          <hqq-header
            class="item"
            :name="item.author.nickname"
            :img="item.author.avatarUrl"
            :direction="userInfo.id == item.author.userId ? 'right' : 'left'"
            :isPopoverShow="userInfo.id == item.author.userId ? false : true"
            :width="''"
          >
            <template #message>
              <hqq-message
                class="message"
                :style="{
                  'background-color': userInfo.id == item.author.userId ? 'var(--chat-bg-message)' : 'var(--chat-bg-message2)',
                  color: userInfo.id == item.author.userId ? 'var(--chat-message)' : 'var(--chat-message2)'
                }"
                :message="item.message"
                :isShowReplyText="false"
              ></hqq-message>
            </template>
            <template #right>
              <div style="width: 40px"></div>
            </template>
          </hqq-header>
        </template>
      </div>
    </div>

    <hqq-input @submit="submit" v-model:message="message"></hqq-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance, ref, nextTick, onMounted, watch } from "vue"
import { useStore } from "@/store"
import { useRoute, useRouter } from "vue-router"

import hqqHeader from "@/components/hqqHeader.vue"
import hqqMessage from "@/components/hqqMessage.vue"
import hqqInput from "@/components/hqqInput.vue"
import { Toast } from "vant"

export default defineComponent({
  name: "chatDetail",
  components: {
    hqqHeader,
    hqqMessage,
    hqqInput
  },
  setup() {
    onMounted(() => {
      chatListRef.value.scrollTop = chatListRef.value.scrollHeight
      // store.dispatch("chatModule/getChatListAction", roomId)
      store.commit("chatModule/changeIsRead", roomId)
    })

    const router = useRouter()
    const back = () => {
      router.go(-1)
    }
    const store = useStore()
    const userInfo = computed(() => store.state.userInfo)

    // 信息时间是否显示
    const currentInstance = getCurrentInstance()?.appContext.config.globalProperties
    const chatTime = (time: Date, preTime: Date | 0) => {
      const t1 = new Date(time).getTime()
      const t2 = new Date(preTime).getTime()

      // 超出一分钟
      return t1 - t2 > 60000 ? currentInstance?.$formatDate(time, true) : ""
    }

    const route = useRoute()
    const roomId = Number(route.query.id)
    const chats = computed(() => store.state.chatModule.chatRooms.find((item) => item.id === roomId))
    const title = computed(() => {
      return route.query.name ?? chats.value?.name + (chats.value?.count ? `(${chats.value?.count})` : "")
    })

    // 发送消息
    const message = ref("")
    const chatListRef = ref()
    const submit = async () => {
      if (!userInfo?.value?.token) {
        Toast.fail("请先登录！")
      }
      store.dispatch("chatModule/sendchatMessageAction", { message: message.value, roomId })
    }

    watch(
      () => chats.value,
      (n) => {
        if (n?.chats[n?.chats.length - 1]?.author?.userId === userInfo.value.id) {
          message.value = ""
        }
        nextTick(() => {
          chatListRef.value.scrollTop = chatListRef.value.scrollHeight
        })
      },
      { deep: true }
    )

    return {
      chats,
      title,
      back,
      userInfo,
      chatTime,
      submit,
      message,
      chatListRef
    }
  }
})
</script>

<style scoped lang="less">
.chat-detail {
  width: 100vw;
  height: 100%;
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
  // height: calc(100vh - 46px - 50px);
  flex: 1;
  overflow: scroll;
  scroll-behavior: smooth;
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
    padding-top: 10px;
    color: var(--dark-color2);
  }
}
</style>
