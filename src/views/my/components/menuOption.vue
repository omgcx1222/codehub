<template>
  <div class="menu-option">
    <!-- <van-cell class="item" title="我的收藏" icon="star-o" :border="false">
      <template #right-icon>
        <van-icon name="arrow" size="16px" />
      </template>
    </van-cell> -->
    <van-cell class="item" title="我的动态" icon="smile-o" :border="false" is-link>
      <!-- <template #right-icon>
        <van-icon name="arrow" size="16px" />
      </template> -->
    </van-cell>
    <van-cell class="item" title="我的评论" icon="comment-circle-o" :border="false" is-link>
      <!-- <template #right-icon>
        <van-icon name="arrow" size="16px" />
      </template> -->
    </van-cell>
    <van-cell class="item" title="修改资料" icon="edit" :border="false" @click="changeInfo" is-link>
      <!-- <template #right-icon>
        <van-icon name="arrow" size="16px" />
      </template> -->
    </van-cell>
    <van-cell class="item" title="设置" icon="setting-o" :border="false" is-link>
      <!-- <template #right-icon>
        <van-icon name="arrow" size="16px" />
      </template> -->
    </van-cell>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useRouter } from "vue-router"

export default defineComponent({
  setup() {
    const router = useRouter()
    const changeInfo = () => {
      router.push("/changeInfo")
    }

    return {
      changeInfo
    }
  }
})
</script>

<style scoped lang="less">
.menu-option {
  margin-top: 20px;
  .item {
    padding: 10px 8px;
    align-items: center;
  }
}
</style>
