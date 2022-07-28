<template>
  <div class="chat-detail">
    <van-nav-bar left-arrow @click-left="back" :title="chats.name">
      <!-- <template #right>
        <van-icon name="ellipsis" size="18" />
      </template> -->
    </van-nav-bar>
    <div>
      <hqq-header
        v-for="item in chats.chats"
        :key="item.id"
        :name="item.nickname"
        :img="item.avatarUrl"
        :isRightShow="false"
        :direction="right"
      >
        <template #message>
          <hqq-message :message="item.message" :isShowReplyText="false"></hqq-message>
        </template>
      </hqq-header>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
// import { useStore } from "@/store"
import hqqHeader from "@/components/hqqHeader.vue"
import hqqMessage from "@/components/hqqMessage.vue"

export default defineComponent({
  components: {
    hqqHeader,
    hqqMessage
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
    return {
      back
    }
  }
})
</script>

<style scoped>
.chat-detail {
  width: 100vw;
  height: 100vh;
  background-color: var(--white-background-color);
}
</style>
