<template>
  <van-cell-group class="moment-item" inset :border="false">
    <van-skeleton class="loading" title avatar :row="row" :loading="!moment.momentId">
      <div class="moment-info" v-if="moment.momentId">
        <!-- 作者信息 -->
        <hqq-header
          class="header"
          :img="moment.author.avatarUrl ?? undefined"
          :name="moment.author.nickname"
          :message="moment.authorFans + ' 粉丝'"
        ></hqq-header>
        <!-- 文字和图片 -->
        <div class="content van-multi-ellipsis--l3" @click="momentDetail">
          <div class="text">{{ moment.content }}</div>
          <van-grid square :column-num="3" :border="false">
            <van-grid-item v-for="(img, index) in moment.images" :key="img">
              <van-image class="img" :src="img" fit="cover" position="center" @click.stop="clickImg(index)" />
            </van-grid-item>
          </van-grid>
        </div>
        <!-- 时间 -->
        <div class="time" @click="momentDetail">{{ $formatDate(moment.createTime) }}</div>
        <!-- 插槽：默认转发评论点赞 -->
        <div class="menu">
          <slot>
            <van-grid class="van-hairline--top" :column-num="3" :border="false" icon-size="16px" direction="horizontal">
              <van-grid-item icon="share-o" />
              <van-grid-item icon="chat-o" :text="String(moment.commentCount)" @click="momentDetail" />
              <van-grid-item
                :text="String(moment.agree)"
                :icon="moment.isAgree === 1 ? 'good-job' : 'good-job-o'"
                :class="moment.isAgree === 1 ? 'is-agree' : ''"
              />
            </van-grid>
          </slot>
        </div>
      </div>
    </van-skeleton>
  </van-cell-group>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from "vue"

import hqqHeader from "@/components/hqqHeader.vue"

export default defineComponent({
  emits: ["momentDetail", "focus"],
  components: {
    hqqHeader
  },
  props: {
    momentData: {
      type: Object,
      required: true
    },
    row: {
      type: Number,
      default: 3
    }
  },
  setup(props, { emit }) {
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
    const momentDetail = () => {
      emit("momentDetail", moment.value.momentId)
    }

    const follow = () => {
      console.log("关注")
    }

    return {
      moment,
      clickImg,
      momentDetail,
      follow
    }
  }
})
</script>

<style scoped lang="less">
.moment-item {
  .loading {
    padding: 10px;
  }
  margin: 0;
}
.header,
.content,
.time {
  padding: 15px 15px 0;
}
// .moment-info {
//   padding: 15px 15px 0;
// }

.content {
  // margin: 5px;
  line-height: 1.5;
  .text {
    font-size: 16px;

    margin: 10px 5px;
  }
  .img {
    width: 100%;
    height: 100%;
  }
  :deep(.van-grid-item__content) {
    padding: 2px;
  }
}

.time {
  padding: 10px 15px;
  font-size: 12px;
  color: var(--dark-color2);
}

.menu {
  // margin-top: 10px;
  :deep(.van-grid-item__content) {
    padding: 10px 0;
    // border-top: 1px solid var(--dark-color3);
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
