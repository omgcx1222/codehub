<template>
  <div class="menu-option">
    <!-- <div>
      <van-icon name="setting-o" size="18px" />
      <span class="text">设置</span>
      <van-icon name="arrow" />
    </div> -->
    <van-cell title="我的收藏" icon="star-o" :border="false">
      <template #right-icon>
        <van-icon name="arrow" />
      </template>
    </van-cell>
    <van-cell title="我的评论" icon="comment-circle-o" :border="false">
      <template #right-icon>
        <van-icon name="arrow" />
      </template>
    </van-cell>
    <van-cell title="修改资料" icon="edit" :border="false">
      <template #right-icon>
        <van-icon name="arrow" />
      </template>
    </van-cell>
    <van-cell title="设置" icon="setting-o" :border="false">
      <template #right-icon>
        <van-icon name="arrow" />
      </template>
    </van-cell>
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
.menu-option {
  margin-top: 15px;
  // display: flex;
  // flex-direction: column;
  // div {
  //   padding: 15px 0;
  //   display: flex;
  //   align-items: center;
  //   .text {
  //     padding-left: 8px;
  //     flex: 1;
  //   }
  // }
}
</style>
