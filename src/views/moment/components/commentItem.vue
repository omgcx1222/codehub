<template>
  <div class="comment-item">
    <hqq-header
      v-if="Object.keys(comment).length"
      class="comment-item-header"
      :img="comment.author.avatarUrl ?? undefined"
      :name="comment.author.nickname"
      @clickRight="menuShow"
      :isPopoverShow="userInfo.id == comment.author.id ? false : true"
      :actions="[{ text: '私聊' }]"
      @select="select($event, comment.author.id)"
    >
      <template #message>
        <div class="time">{{ $formatDate(comment.createTime) }}</div>
        <hqq-message
          class="content"
          :isShowReplyText="!!comment.replyAuthor"
          :byName="comment.replyAuthor?.nickname"
          :message="comment.replyAuthor ? '：' + comment.content : comment.content"
          @click="focus"
        ></hqq-message>
        <!-- <div class="content" @click="focus" v-else>{{ comment.content }}</div> -->
        <div class="menu">
          <span :class="comment.isAgree === 1 ? 'is-agree' : ''" @click="likeComment">
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
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </hqq-header>
    <van-action-sheet v-model:show="isMenuShow" :actions="menuActions" cancel-text="取消" close-on-click-action @select="menuSelect" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, computed } from "vue"
import { useStore } from "@/store"
import { Toast } from "vant"
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
    const store = useStore()
    const focus = () => {
      const c = props.comment
      if (c.commentId) {
        emit("focus", c.momentId, c.commentId, c.id, c.author.nickname)
      } else {
        emit("focus", c.momentId, c.id, undefined, c.author.nickname)
      }
    }

    const isMenuShow = ref(false)
    const menuActions = reactive([{ name: "举报" }, { name: "删除" }])
    const userInfo = computed(() => store.state.userInfo)
    const menuShow = () => {
      // if (props.comment.author.id === userInfo.value.id) {
      //   menuActions[0].disabled = true
      // }
      isMenuShow.value = true
    }
    const menuSelect = (select: any) => {
      if (select.name === "举报") {
        Toast.loading("正在举报")
        setTimeout(() => {
          Toast.success("已举报")
        }, 500)
      } else if (select.name === "删除") {
        if (props.comment.author.id !== userInfo.value.id && userInfo.value.id !== 83) {
          return Toast.fail("没有权限")
        }
        store.dispatch("momentModule/deleteComentAction", props.comment.id)
      }
    }

    const likeComment = async () => {
      await store.dispatch("momentModule/likeCommentAction", props.comment.id)
      console.log(store.state.momentModule.commentList)
    }

    // 私聊
    const select = (action: any, id: number | undefined) => {
      if (!userInfo?.value?.token) {
        return Toast.fail("请先登录")
      }
      store.dispatch("chatModule/createRoomAction", { userId: id })
    }

    return {
      focus,
      isMenuShow,
      menuShow,
      menuActions,
      menuSelect,
      likeComment,
      userInfo,
      select
    }
  }
})
</script>

<style scoped lang="less">
.comment-item {
  :deep(.van-action-sheet__item) {
    color: var(--text-color);
  }
}
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
  // color: var(--color);
}
.menu {
  span {
    padding-right: 10px;
  }
}
.comment-item-header {
  padding: 15px;
}
</style>
