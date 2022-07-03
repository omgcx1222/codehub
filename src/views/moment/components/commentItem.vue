<template>
  <hqq-header
    v-if="Object.keys(comment).length"
    class="comment-item-header"
    :img="comment.author.avatarUrl ?? undefined"
    :name="comment.author.nickname"
    :isRightShow="false"
  >
    <template #message>
      <div class="time">{{ $formatDate(comment.createTime) }}</div>
      <hqq-message
        class="content"
        :isShowReplyText="isShowReplyText"
        :byName="comment.replyAuthor?.nickname"
        :message="comment.content"
        v-if="isShowReplyText"
        @click="focus"
      ></hqq-message>
      <div class="content" @click="focus" v-else>{{ comment.content }}</div>
      <div class="menu">
        <span :class="comment.isAgree === 1 ? 'is-agree' : ''">
          <van-icon size="18" :name="comment.isAgree === 1 ? 'good-job' : 'good-job-o'" />
          <span>{{ comment.agree || "" }}</span>
        </span>
        <span @click="focus">
          <van-icon size="16" name="chat-o" />
          <!-- <span>{{ comment.childCount }}</span> -->
        </span>
      </div>

      <slot></slot>
    </template>
  </hqq-header>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Icomment } from "@/store/types"

import hqqHeader from "@/components/hqqHeader.vue"
import hqqMessage from "@/components/hqqMessage.vue"

export default defineComponent({
  emits: ["focus"],
  components: {
    hqqHeader,
    hqqMessage
  },
  props: {
    comment: {
      type: Object as PropType<Icomment>,
      required: true
    },
    isShowReplyText: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const focus = () => {
      const c = props.comment
      if (c.commentId) {
        emit("focus", c.momentId, c.commentId, c.id, c.author.nickname)
      } else {
        emit("focus", c.momentId, c.id, undefined, c.author.nickname)
      }
    }
    return {
      focus
    }
  }
})
</script>

<style scoped lang="less">
.time {
  font-size: 12px;
  color: var(--dark-color2);
  padding-top: 5px;
}
.content,
.menu {
  margin-top: 15px;
}
.content {
  font-size: 16px;
  color: var(--color);
  word-break: break-all;
}
.menu {
  span {
    padding-right: 10px;
  }
}
</style>
