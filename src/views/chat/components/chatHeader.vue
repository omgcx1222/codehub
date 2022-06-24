<template>
  <div class="chat-header">
    <div>
      <span>
        <van-icon name="comment" size="28px" color="#43e1c7" badge="9" />
      </span>
      <span>回复我的</span>
    </div>
    <div>
      <span>
        <van-icon name="good-job" size="28px" color="#ee0a24" badge="9" />
      </span>
      <span>收到的赞</span>
    </div>
    <div>
      <span>
        <van-icon name="friends" size="28px" color="#ffd01e" badge="99+" />
      </span>
      <span>大聊天室</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.chat-header {
  display: flex;
  padding: 10px 0;
  background-color: var(--white-background-color);
  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 60px;
    text-align: center;
    color: var(--dark-color2);
    font-size: 12px;
  }
}
</style>
