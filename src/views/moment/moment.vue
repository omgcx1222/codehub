<template>
  <div class="moment">
    <van-tabs class="vant-tabs" v-model:active="tabActive" swipeable animated @change="tabChange">
      <van-tab v-for="item in tabs" :title="item.label" :key="item.value">
        <div class="list">
          <van-list finished-text="没有更多了">
            <template v-for="item in momentList[item.value].list" :key="item.momentId">
              <div class="item">
                <moment-item :momentData="item" :row="5" @momentDetail="momentDetail"></moment-item>
              </div>
            </template>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 悬浮按钮 -->
    <div class="suspension">
      <van-button class="pub-button" icon="edit" type="primary" round to="/pubMoment" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "@/store"
import { tabsType } from "@/views/types"

import momentItem from "./components/momentItem.vue"

export default {
  name: "moment",
  components: {
    momentItem
  },
  setup() {
    const tabs: tabsType = [
      { label: "最新", value: "news" },
      { label: "最热", value: "host" },
      { label: "关注", value: "follow" }
    ]
    const tabActive = ref(0)
    const store = useStore()
    const momentList = computed(() => store.state.momentModule.momentList)

    const tabChange = (index: number) => {
      if (index === 0 && momentList.value.news.list.length === 0) {
        getMoment(index, 1)
      } else if (index === 1 && momentList.value.host.list.length === 0) {
        getMoment(index, 1)
      } else if (index === 2 && momentList.value.follow.list.length === 0) {
        getMoment(index, 1)
      }
    }

    // 0为最新，1为最热，2为关注
    const getMoment = (order: 0 | 1 | 2, page: number) => {
      store.dispatch("momentModule/momentListAction", { order, page })
    }

    const router = useRouter()
    const momentDetail = (id: number) => {
      router.push({
        path: "/momentDetail",
        query: {
          id
        }
      })
    }

    const beforeChange = (a: any, b: any, c: any) => {
      console.log(1)

      console.log(a, b, c)
    }

    onMounted(() => {
      // pubMoment("芜湖")
      getMoment(0, 1)
    })

    return {
      tabs,
      tabActive,
      tabChange,
      getMoment,
      momentList,
      momentDetail,
      beforeChange
    }
  }
}
</script>

<style lang="less" scoped>
.moment {
  width: 100%;
  height: calc(100vh - 50px);
  overflow: scroll;
  position: relative;
}
.suspension {
  position: absolute;
  bottom: 25px;
  right: 20px;
  .pub-button {
    width: 45px;
    height: 45px;
  }
}
.vant-tabs {
  // tab的header
  :deep(.van-tabs__wrap) {
    background-color: var(--white-background-color);
    box-shadow: 0 0 1px var(--dark-color2);
  }
  // tab的父
  :deep(.van-tabs__nav) {
    width: 240px;
    margin: 0 auto;
    padding-bottom: 10px;
  }
  // 单个tab
  :deep(.van-tab) {
    font-size: var(--moment-title-font-siez);
    color: var(--moment-title-color);
  }
  // 激活的tab
  :deep(.van-tab--active) {
    color: var(--moment-title-active-color);
  }
  // 线
  :deep(.van-tabs__line) {
    background-color: var(--moment-line-color);
  }
  // 内容的父级
  :deep(.van-tabs__content) {
    height: calc(100vh - 44px - 50px);
  }
  .list {
    height: calc(100vh - 44px - 50px);
    overflow: scroll;
  }
  .item {
    // padding: 15px 15px 0;
    margin: 15px;
  }
}
</style>
