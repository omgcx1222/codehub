<template>
  <div class="moment-detail">
    <van-nav-bar class="nav-bar" left-arrow @click-left="back" @click-right="menu" :border="false">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>

    <div class="main">
      <van-list finished-text="没有更多了">
        <moment-item :momentData="moment" :row="15">
          <div class="comment-total">全部评论（{{ commentList.length }}）</div>
        </moment-item>
        <div class="comment-item">
          <template v-for="item in commentList" :key="item.id">
            <div>
              {{ item }}
            </div>
          </template>
        </div>
      </van-list>
    </div>

    <div class="comment-input">
      <hqq-input></hqq-input>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useStore } from "vuex"

import momentItem from "../components/momentItem.vue"
import hqqInput from "@/components/hqqInput.vue"

export default defineComponent({
  name: "momentDetail",
  components: {
    momentItem,
    hqqInput
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const momentId = route.query.id

    const moment = ref({})
    const commentList = ref<object[]>([])
    const getMomentDetail = async (id: string) => {
      const res: { moment: object; commentList: object[] } = await store.dispatch(
        "momentModule/momentDetailAndCommentListAction",
        id
      )
      moment.value = res.moment
      commentList.value = res.commentList
    }

    const router = useRouter()
    const back = () => {
      router.go(-1)
    }
    const menu = () => {
      console.log(1)
    }

    onMounted(() => {
      getMomentDetail(momentId as string)
    })

    return {
      moment,
      commentList,
      back,
      menu
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
}
.main {
  flex: 1;
  overflow: scroll;
}
.comment-total {
  padding: 10px 15px;
  border-top: 5px solid var(--dark-color1);
  /* border-bottom: 5px solid var(--dark-color1); */
}
.comment-input {
  border-top: 2px solid var(--dark-color1);
}
</style>
