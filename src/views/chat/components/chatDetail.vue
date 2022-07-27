<template>
  <div class="chat-detail">
    <van-nav-bar left-arrow @click-left="back" :title="title">
      <!-- <template #right>
        <van-icon name="ellipsis" size="18" />
      </template> -->
    </van-nav-bar>
    <div>
      <hqq-header name="小明" :isRightShow="false" direction="right">
        <template #message>
          <hqq-message byName="小李" message="你好啊"></hqq-message>
        </template>
      </hqq-header>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import hqqHeader from "@/components/hqqHeader.vue"
import hqqMessage from "@/components/hqqMessage.vue"

export default defineComponent({
  components: {
    hqqHeader,
    hqqMessage
  },
  props: {
    title: {
      type: String,
      default: "群聊"
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
