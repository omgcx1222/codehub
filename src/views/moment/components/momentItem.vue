<template>
  <div class="moment-item">
    <!-- 作者信息 -->
    <div class="header">
      <img v-if="moment.author.avatar" :src="moment.author.avatar" alt="" />
      <img v-else src="@/assets/img/user.png" />
      <div class="name">
        <div>{{ moment.author.nickname }}</div>
        <div class="fans">{{ moment.author.fans ?? 0 }} 粉丝</div>
      </div>
      <hqq-tag value="关注" class="follow"></hqq-tag>
    </div>
    <!-- 文字和图片 -->
    <div class="content van-multi-ellipsis--l3" @click="momentDetail">
      <div class="text">{{ moment.content }}</div>
      <van-grid square :column-num="3" :border="false">
        <van-grid-item v-for="(img, index) in moment.images" :key="img">
          <van-image class="img" :src="img" fit="cover" position="center" @click.stop="clickImg(index)" />
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 转发评论点赞 -->
    <div class="menu">
      <van-grid class="van-hairline--top" :column-num="3" :border="false" icon-size="16px" direction="horizontal">
        <van-grid-item icon="share-o" />
        <van-grid-item icon="chat-o" :text="String(moment.commentCount)" @click="momentDetail" />
        <van-grid-item
          :text="String(moment.agree)"
          :icon="moment.isAgree === 1 ? 'good-job' : 'good-job-o'"
          :class="moment.isAgree === 1 ? 'is-agree' : ''"
        />
      </van-grid>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from "vue"
import { useRouter } from "vue-router"
import hqqTag from "@/components/hqqTag.vue"

export default defineComponent({
  components: {
    hqqTag
  },
  props: {
    momentData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const moment = computed(() => props.momentData)

    // 预览图片
    const currentInstance = getCurrentInstance()?.appContext.config.globalProperties
    const clickImg = (index: number) => {
      currentInstance?.$imgView({
        images: moment.value.images,
        startPosition: index
      })
    }

    // 跳转至动态详情
    const router = useRouter()
    const momentDetail = () => {
      router.push({
        path: "/momentDetail",
        query: {
          id: moment.value.momentId
        }
      })
    }

    return {
      moment,
      clickImg,
      momentDetail
    }
  }
})
</script>

<style scoped lang="less">
.moment-item {
  padding: 15px 15px 0;
}
.header {
  display: flex;
  align-items: center;
  // margin-bottom: 25px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .name {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
    .fans {
      font-size: 12px;
      color: var(--dark-color);
    }
  }
  .follow {
    margin-left: auto;
  }
}

.content {
  // margin: 5px;
  font-size: 14px;
  line-height: 1.5;
  .text {
    margin: 20px 5px 10px;
  }
  .img {
    width: 100%;
    height: 100%;
  }
  :deep(.van-grid-item__content) {
    padding: 2px;
  }
}
.menu {
  margin-top: 10px;
  :deep(.van-grid-item__content) {
    padding: 10px 0;
    // border-top: 1px solid var(--dark-color2);
  }
  :deep(.van-grid-item__text) {
    margin: 0 0 0 5px;
  }
  .is-agree {
    color: var(--agree-color);
    :deep(.van-grid-item__text) {
      color: var(--agree-color);
    }
  }
}
</style>
