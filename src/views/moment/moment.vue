<template>
  <div class="moment">
    <van-tabs class="vant-tabs" v-model:active="tabActive" swipeable animated @change="tabChange">
      <van-tab v-for="(tab, index) in tabs" :title="tab.label" :key="tab.label">
        <div class="list" :ref="setListRef">
          <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" loading-text="正在刷新...">
            <van-list
              finished-text="没有更多了"
              v-if="isNull !== index"
              @load="listLoad"
              :finished="finished"
              v-model:loading="isAddLoading"
              :offset="0"
              :immediate-check="false"
            >
              <template v-if="momentList[index]">
                <div class="item" v-for="item in momentList[index]" :key="item.momentId">
                  <moment-item :momentData="item" :row="5" @momentDetail="momentDetail"></moment-item>
                </div>
              </template>
              <!-- 加载数据时先展示骨架屏 -->
              <template v-else>
                <div class="item" v-for="(item, i) in [{}, {}, {}, {}, {}]" :key="i">
                  <moment-item :momentData="item" :row="5" @momentDetail="momentDetail"></moment-item>
                </div>
              </template>
            </van-list>
            <van-empty description="没有动态" v-else />
          </van-pull-refresh>
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
import { ref, onMounted, computed, onActivated, onBeforeUpdate } from "vue"
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
    onMounted(() => {
      getMoment("all")

      setTimeout(() => {
        onScroll()
      })
    })
    onActivated(() => {
      // 页面激活时设置滚动位置
      for (const i in tabs) {
        if (!listRef.value[i]) return
        listRef.value[i].scrollTop = tabs[i].scrollTop
      }
    })
    onBeforeUpdate(() => {
      listRef.value = []
    })
    const listRef = ref<any[]>([])
    const setListRef = (el: Element) => {
      listRef.value.push(el)
    }
    const onScroll = () => {
      for (const i in tabs) {
        if (!listRef.value[i]) return

        listRef.value[i].onscroll = (e: any) => {
          tabs[i].scrollTop = e.target.scrollTop
        }
      }
    }

    const tabs: tabsType = [
      { label: "最新", scrollTop: 0 },
      { label: "最热", scrollTop: 0 },
      { label: "关注", scrollTop: 0 }
    ]
    const tabActive = ref(0)
    const store = useStore()
    const momentList = computed(() => store.state.momentModule.momentList)
    const isNull = ref(-1) //空列表

    const tabChange = async (index: number) => {
      await store.commit("momentModule/changeActive", index)
      tabActive.value = index

      finished.value = false
      if (!momentList.value[index]?.length) {
        getMoment("all")
      }
    }

    // 0为最新，1为最热，2为关注
    const getMoment = async (type: "all" | "push" | "unshift") => {
      const currentIndex = tabActive.value //记录本次执行的激活的tab，以免被快速切换tab影响
      await store.dispatch("momentModule/momentListAction", type)
      if (!momentList.value[currentIndex]) {
        setTimeout(() => {
          isNull.value = currentIndex
        }, 500)
      } else {
        if (isNull.value === currentIndex) {
          isNull.value = -1
        }
      }
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

    // 下拉刷新(刷新时数据恢复10条，开启上拉加载功能)
    const isRefresh = ref(false)
    const onRefresh = async () => {
      await store.dispatch("momentModule/refreshMomentListAction")
      isRefresh.value = false
      finished.value = false // 开启上拉加载功能
    }

    // 上拉加载
    const finished = ref(false) // 是否关闭上拉加载功能
    const isAddLoading = ref(false) //上拉加载状态
    const listLoad = async () => {
      isAddLoading.value = true
      const ordL = momentList.value[tabActive.value]?.length
      await getMoment("push").then(() => {
        if (ordL === momentList.value[tabActive.value]?.length) {
          // 说明已无新数据，关闭上拉加载功能
          finished.value = true
        }
        isAddLoading.value = false
      })
    }

    return {
      isNull,
      tabs,
      tabActive,
      tabChange,
      getMoment,
      momentList,
      momentDetail,
      listLoad,
      finished,
      isAddLoading,
      onRefresh,
      isRefresh,
      setListRef
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
    :deep(.van-list__finished-text) {
      line-height: normal;
      margin-bottom: 15px;
    }
    :deep(.van-pull-refresh__head) {
      line-height: 40px;
    }
  }
  .item {
    // padding: 15px 15px 0;
    margin: 15px;
  }
}
</style>
