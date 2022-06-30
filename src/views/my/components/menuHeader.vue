<template>
  <div class="menu-header">
    <div>
      <span class="number">{{ userInfo.followCount ?? 0 }}</span>
      <span>关注</span>
    </div>
    <div>
      <span class="number">{{ userInfo.fansCount ?? 0 }}</span>
      <span>粉丝</span>
    </div>
    <div>
      <span class="number">{{ userInfo.userRank ?? "1000+" }}</span>
      <span>粉丝排行</span>
    </div>
    <div>
      <span class="number">{{ userInfo.getAgreeCount ?? 0 }}</span>
      <span>获赞</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "@/store"

export default defineComponent({
  setup() {
    const store = useStore()
    const userInfo = computed(() => store.state.userInfo)

    return {
      userInfo
    }
  }
})
</script>

<style scoped lang="less">
.menu-header {
  display: flex;
  div {
    flex: 1;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .number {
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
