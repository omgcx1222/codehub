<template>
  <div class="chat">
    <chat-header></chat-header>
    <chat-item></chat-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import chatHeader from "./components/chatHeader.vue"
import chatItem from "./components/chatItem.vue"

export default defineComponent({
  components: {
    chatHeader,
    chatItem
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.chat {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
