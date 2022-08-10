<template>
  <div class="moment-detail">
    <van-nav-bar left-arrow @click-left="back" @click-right="menuShow">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>

    <van-pull-refresh class="main" v-model="isRefresh" @refresh="onRefresh" loading-text="正在刷新...">
      <van-list
        finished-text="没有更多了"
        @load="listLoad"
        :finished="finished"
        v-model:loading="isAddLoading"
        :offset="0"
        :immediate-check="false"
      >
        <!-- 动态详情 -->
        <moment-item :momentData="moment" :row="15" @momentDetail="focus" :time="$formatDate(moment?.createTime, true, 'YYYY-MM-DD HH:mm')">
          <template #default="{ moment }">
            <div class="moment-menu">
              <span style="flex: 1">全部评论（{{ commentList.length }}）</span>
              <span :class="moment.isAgree === 1 ? 'is-agree' : ''" @click="likeMoment">
                <van-icon :name="moment.isAgree === 1 ? 'good-job' : 'good-job-o'" size="22" />
                <span>{{ moment.agree }}</span>
              </span>
            </div>
          </template>
        </moment-item>

        <!-- 评论列表 -->
        <div class="comment-item">
          <template v-for="comment in commentList" :key="comment.id">
            <comment-item :comment="comment" :isShowReplyText="false" @focus="focus">
              <!-- 评论的热门回复 -->
              <div class="child-comment" v-if="comment?.replyChild?.length" @click="clickCommentPopupShow(comment)">
                <div v-for="reply in comment.replyChild" :key="reply.id">
                  <hqq-message
                    :name="reply.author?.nickname"
                    :byName="reply.replyAuthor?.nickname"
                    :message="'：' + reply.content"
                    :isShowReplyText="!!reply.replyAuthor"
                  ></hqq-message>
                </div>
                <div class="about-child" v-show="Number(comment?.childCount) > 3">
                  <span>相关回复共{{ comment.childCount }}条 </span>
                  <van-icon name="arrow" />
                </div>
              </div>
            </comment-item>
          </template>
        </div>
      </van-list>
    </van-pull-refresh>

    <div class="comment-input">
      <hqq-input ref="input" @submit="submit" @focus="focus" @blur="blur" :tip="replyOption.tip" v-model:message="inputValue"></hqq-input>
    </div>

    <!-- 评论详情弹出框 -->
    <van-popup v-model:show="commentPopupShow" round position="bottom" :style="{ height: '70%' }" safe-area-inset-bottom>
      <div class="popup">
        <div class="title">评论详情</div>
        <div class="list">
          <van-list finished-text="没有更多了">
            <!-- 一级评论 -->
            <comment-item :comment="firstComment" :isShowReplyText="false" @focus="focus"></comment-item>
            <!-- <div class="tip">相关回复共{{ firstComment.childCount }}条</div> -->
            <div class="tip">相关回复共{{ replyList.length }}条</div>
            <!-- 二级评论和三级回复 -->
            <template v-for="reply in replyList" :key="reply.id">
              <comment-item :comment="reply" @focus="focus"></comment-item>
            </template>
          </van-list>
        </div>
        <div class="comment-input">
          <hqq-input
            ref="popuoInput"
            @submit="submit"
            @focus="focus"
            @blur="blur"
            :tip="replyOption.tip"
            v-model:message="popuoInputValue"
          ></hqq-input>
        </div>
      </div>
    </van-popup>

    <!-- 右上角三个点操作 -->
    <van-action-sheet v-model:show="isMenuShow" :actions="menuActions" cancel-text="取消" close-on-click-action @select="menuSelect" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "@/store"
import { Icomment, ImomentDetail } from "@/store/types"

import { Toast } from "vant"
import momentItem from "../components/momentItem.vue"
import hqqInput from "@/components/hqqInput.vue"
import commentItem from "../components/commentItem.vue"
import hqqMessage from "@/components/hqqMessage.vue"

export default defineComponent({
  name: "momentDetail",
  components: {
    momentItem,
    hqqInput,
    commentItem,
    hqqMessage
  },
  props: {
    id: {
      type: Number
    }
  },
  setup() {
    const store = useStore()

    const route = useRoute()

    // const roomId = computed(() => props.chats?.id)
    const momentId = Number(route.query.id)
    // const momentId = computed(() => props.id)

    onMounted(() => {
      // setTimeout(() => {
      getMomentDetail("all")
      // }, 300)
    })

    const moment = computed(() => store.state.momentModule.momentDetail)
    const commentList = computed(() => store.state.momentModule.commentList)
    const getMomentDetail = async (type: "all" | "unshift" | "push") => {
      await store.dispatch("momentModule/momentDetailAndCommentListAction", { momentId: momentId, type })
    }

    const router = useRouter()
    const back = () => {
      router.back()
      // emit("back")
      setTimeout(() => {
        // 关闭的动画完成再清空数据
        store.commit("momentModule/changeMomentDetail", [])
        store.commit("momentModule/changeCommentList", { list: [], type: "all" })
      }, 300)
    }

    // 右上角三个点操作
    const isMenuShow = ref(false)
    const menuActions = reactive([
      { name: "举报", disabled: false },
      { name: "删除", disabled: true }
    ])
    const userInfo = computed(() => store.state.userInfo)
    const menuShow = () => {
      if ((moment.value as ImomentDetail)?.author?.id === userInfo.value.id) {
        menuActions[0].disabled = true
        menuActions[1].disabled = false
      }
      isMenuShow.value = true
    }
    const menuSelect = (select: any) => {
      if (select.name === "举报") {
        Toast.loading("正在举报")
        setTimeout(() => {
          Toast.success("已举报")
        }, 500)
      } else if (select.name === "删除") {
        store.dispatch("momentModule/deleteMomentAction", momentId)
      }
    }

    // 评论详情弹出框
    const commentPopupShow = ref(false)
    const firstComment: any = ref({})
    const replyList = computed(() => store.state.momentModule.replyList)
    const clickCommentPopupShow = async (comment: Icomment) => {
      commentPopupShow.value = true
      firstComment.value = comment
      await store.dispatch("momentModule/replyListAction", comment.id)
    }

    const input = ref<InstanceType<typeof hqqInput>>()
    const popuoInput = ref<InstanceType<typeof hqqInput>>()
    const replyOption = reactive({
      momentId: 0,
      commentId: "",
      replyId: "",
      content: "",
      tip: "发一条友善的评论"
    })
    const focus = (mId: any, cId: any, rId: any, name: any) => {
      // console.log(mId, cId, rId, name)
      replyOption.momentId = momentId ?? 0
      replyOption.commentId = cId
      replyOption.replyId = rId
      replyOption.tip = name ? `回复 @${name} : ` : "评论动态"
      if (commentPopupShow.value && !name) {
        // 直接点击popup内的输入框
        replyOption.commentId = firstComment.value.id
        replyOption.tip = `回复 @${firstComment.value.author.nickname} : `
      }
      // 聚焦输入框
      commentPopupShow.value ? popuoInput.value?.focus() : input.value?.focus()
    }
    const blur = () => {
      replyOption.tip = "发一条友善的评论"
    }

    const popuoInputValue = ref("")
    const inputValue = ref("")
    const submit = async () => {
      const value = commentPopupShow.value ? popuoInputValue.value : inputValue.value
      if (!value) {
        return Toast.fail("内容不能为空")
      }
      replyOption.content = value
      const res = await store.dispatch("momentModule/pubCommentAction", replyOption)
      if (res) {
        commentPopupShow.value ? (popuoInputValue.value = "") : (inputValue.value = "")
      }
    }

    // 下拉刷新
    const isRefresh = ref(false)
    const onRefresh = async () => {
      isRefresh.value = true
      await getMomentDetail("all")
      isRefresh.value = false
      finished.value = false
    }

    // 上拉加载
    const isAddLoading = ref(false)
    const finished = ref(false)
    const listLoad = async () => {
      isAddLoading.value = true
      const ordL = commentList.value.length
      await getMomentDetail("push")
      if (ordL === commentList.value.length) {
        // 说明已无新数据，关闭上拉加载功能
        finished.value = true
      }
      isAddLoading.value = false
    }

    const likeMoment = () => {
      store.dispatch("momentModule/likeMomentAction", momentId)
    }

    return {
      moment,
      commentList,
      back,
      menuShow,
      menuActions,
      isMenuShow,
      menuSelect,
      commentPopupShow,
      clickCommentPopupShow,
      firstComment,
      replyList,
      submit,
      focus,
      input,
      popuoInput,
      blur,
      replyOption,
      isRefresh,
      onRefresh,
      isAddLoading,
      finished,
      listLoad,
      likeMoment,
      popuoInputValue,
      inputValue
    }
  }
})
</script>

<style scoped lang="less">
.moment-detail {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--white-background-color);
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 10;
  top: 0;
}
.main {
  flex: 1;
  overflow: scroll;
}
.moment-menu {
  padding: 10px 15px;
  display: flex;
  border-top: 8px solid var(--dark-color1);
  border-bottom: 2px solid var(--dark-color1);
  background-color: var(--white-background-color);
}

.comment-item {
  border-bottom: 1px solid var(--dark-color1);
  font-size: 13px;
  color: var(--dark-color3);
  .child-comment {
    font-size: 15px;
    line-height: 28px;
    padding: 10px 15px;
    margin-top: 15px;
    background-color: var(--dark-color1);
    border-radius: 5px;
    color: var(--color);
    .about-child {
      color: var(--van-blue);
      font-size: 14px;
    }
  }
}
.comment-input {
  border-top: 2px solid var(--dark-color1);
}

.popup {
  display: flex;
  flex-direction: column;
  height: 100%;
  .title {
    padding: 15px 10px 10px;
    font-size: 14px;
    box-shadow: 0 1px 10px #ebebeb;
  }
  .list {
    flex: 1;
    // height: calc(100% - 44px - 50px);
    overflow: scroll;
  }
  .tip {
    font-size: 12px;
    color: var(--dark-color2);
    padding: 10px 15px;
    border-top: 8px solid var(--dark-color1);
  }
}
</style>
