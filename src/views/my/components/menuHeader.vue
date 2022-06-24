<template>
  <div class="menu-header">
    <div>
      <span class="number">0</span>
      <span>关注</span>
    </div>
    <div>
      <span class="number">0</span>
      <span>粉丝</span>
    </div>
    <div>
      <span class="number">0</span>
      <span>动态</span>
    </div>
    <div>
      <span class="number">0</span>
      <span>获赞</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
// import { useStore } from "vuex"

export default defineComponent({
  setup() {
    // const store = useStore()

    return {}
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
