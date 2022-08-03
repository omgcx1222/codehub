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
      <!-- <span>
        <van-icon name="friends" size="28px" color="#ffd01e" badge="99+" />
      </span> -->
      <span>登录用户：{{ onLine.length }}</span>
      <span>游客：{{ tourist.length }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "@/store"

export default defineComponent({
  setup() {
    const store = useStore()
    const onLine = computed(() => store.state.chatModule.onLine)
    const tourist = computed(() => store.state.chatModule.tourist)
    return {
      onLine,
      tourist
    }
  }
})
</script>

<style scoped lang="less">
.chat-header {
  display: flex;
  padding: 10px 0;
  background-color: var(--white-background-color);
  // border-bottom: 8px solid var(--dark-color1);
  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 60px;
    text-align: center;
    color: var(--dark-color3);
    font-size: 12px;
  }
}
</style>
