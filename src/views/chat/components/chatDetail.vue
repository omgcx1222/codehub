<template>
  <div class="chat-detail">
    <van-nav-bar left-arrow @click-left="back" :title="chats.name" class="nav-bar">
      <!-- <template #right>
        <van-icon name="ellipsis" size="18" />
      </template> -->
    </van-nav-bar>
    <div class="chat-message">
      <hqq-header
        class="item"
        v-for="item in chats.chats"
        :key="item.id"
        :name="item.nickname"
        :img="item.avatarUrl ?? require('@/assets/img/user.png')"
        :isRightShow="false"
        :direction="userInfo.id == item.userId ? 'right' : 'left'"
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
    console.log(userInfo.value.id)

    return {
      back,
      userInfo
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
    margin: 25px 20px;
    .message {
      // background-color: rgb(149, 236, 105);
      // background-color: var(--van-gray-8);
      // color: #fff;
      padding: 10px 15px;
      margin-top: 5px;
      border-radius: 3px;
    }
  }
}
</style>
