<template>
  <van-cell-group class="hqq-input" :border="false">
    <van-field
      class="input"
      v-model="message"
      :rows="1"
      :autosize="{ maxHeight: 120 }"
      type="textarea"
      placeholder="发一条友善的评论"
    >
      <template #button>
        <van-button class="pub-button" type="primary" size="mini">发送</van-button>
      </template>
    </van-field>
  </van-cell-group>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  setup() {
    const message = ref("")
    return {
      message
    }
  }
})
</script>

<style scoped lang="less">
.hqq-input {
  // background-color: var(--dark-color1);
  :deep(textarea) {
    background-color: var(--dark-color1);
    padding: 3px 8px;
    border-radius: 5px;
  }
  // :deep(.van-field__body) {
  //   align-items: center;
  // }
  :deep(.van-field__button) {
    align-self: flex-end;
    display: flex;
  }
  .pub-button {
    border-radius: 5px;
    padding: 5px 8px;
  }
}
</style>
