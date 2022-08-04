<template>
  <div class="chat-detail">
    <van-nav-bar left-arrow @click-left="back" :title="chats.name" class="nav-bar">
      <!-- <template #right>
        <van-icon name="ellipsis" size="18" />
      </template> -->
    </van-nav-bar>
    <div class="chat-message">
      <div v-for="(item, index) in chats.chats" :key="item.id">
        <div class="time">{{ chatTime(item.createTime, item[index - 1]?.createTime ?? 0) }}</div>
        <hqq-header
          class="item"
          :name="item.nickname"
          :img="item.avatarUrl ?? require('@/assets/img/user.png')"
          :isRightShow="false"
          :direction="userInfo.id == item.userId ? 'right' : 'left'"
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

    <hqq-input></hqq-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "@/store"

import hqqHeader from "@/components/hqqHeader.vue"
import hqqMessage from "@/components/hqqMessage.vue"
import hqqInput from "@/components/hqqInput.vue"

export default defineComponent({
  components: {
    hqqHeader,
    hqqMessage,
    hqqInput
  },
  props: {
    chats: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  emits: ["back"],
  setup(_, { emit }) {
    const back = () => {
      emit("back")
    }
    const store = useStore()
    const userInfo = computed(() => store.state.userInfo)
    // console.log(userInfo.value.id)

    // const currentInstance = getCurrentInstance()?.appContext.config.globalProperties
    const chatTime = (time: Date, preTime: Date) => {
      // const t = currentInstance?.$formatDate(time, "minute")
      // console.log(t.getTime())
      const t1 = new Date(time).getTime()
      const t2 = new Date(preTime).getTime()
      const t = t2 - t1
      console.log(t)

      return t > 1000 ? t1 : ""
    }

    return {
      back,
      userInfo,
      chatTime
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
