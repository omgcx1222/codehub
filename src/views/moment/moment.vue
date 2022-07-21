<template>
  <div class="moment">
    <van-tabs class="vant-tabs" v-model:active="tabActive" swipeable animated @change="tabChange">
      <van-tab v-for="(tab, index) in tabs" :title="tab.label" :key="tab.label">
        <div class="list" :ref="setListRef">
          <van-pull-refresh
            v-model="isRefresh"
            @refresh="onRefresh"
            loading-text="正在刷新..."
            :style="isNull === index ? 'height: 100%' : ''"
          >
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
                  <moment-item :momentData="item" :row="5"></moment-item>
                </div>
              </template>
            </van-list>
            <van-empty description="没有动态了ヽ(*。>Д<)o゜" v-else />
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 悬浮按钮 -->
    <div class="suspension">
      <!-- <van-button class="pub-button" icon="edit" type="primary" round to="/pubMoment" /> -->
      <van-button class="pub-button" icon="edit" type="primary" round @click="pubMomentShow = true" />
    </div>

    <div class="pub-box" :style="{ 'z-index': pubMomentShow ? '999' : '0' }">
      <transition name="pub-moment">
        <pub-moment v-show="pubMomentShow" class="pub-moment" @back="pubMomentShow = false"></pub-moment>
      </transition>
    </div>
  </div>
  <transition name="moment-detail">
    <moment-detail
      class="moment-detail"
      v-show="momentDetailId >= 0"
      :id="momentDetailId"
      @back="momentDetailId = -1"
    ></moment-detail>
  </transition>
</template>

<script lang="ts">
import { ref, onMounted, computed, onActivated, onBeforeUpdate } from "vue"
// import { useRouter } from "vue-router"
import { useStore } from "@/store"
import { tabsType } from "@/views/types"

import pubMoment from "./children/pubMoment.vue"
import momentItem from "./components/momentItem.vue"
import momentDetail from "./children/momentDetail.vue"

export default {
  name: "moment",
  components: {
    momentItem,
    pubMoment,
    momentDetail
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
      if (momentList.value[currentIndex].length === 0) {
        setTimeout(() => {
          isNull.value = currentIndex
        }, 500)
      } else {
        if (isNull.value === currentIndex) {
          isNull.value = -1
        }
      }
    }

    // const router = useRouter()
    const momentDetailId = ref(-1)
    const momentDetail = (id: number) => {
      momentDetailId.value = id
      // router.push({
      //   path: "/momentDetail",
      //   query: {
      //     id
      //   }
      // })
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

    const pubMomentShow = ref(false)

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
      setListRef,
      pubMomentShow,
      momentDetailId
    }
  }
}
</script>

<style lang="less" scoped>
.moment {
  width: 100%;
  height: calc(100% - 50px);
  overflow: hidden;
  position: relative;
}
.suspension {
  position: absolute;
  top: 88%;
  right: 20px;
  box-shadow: 0 0 8px #000;
  border-radius: 50%;
  .pub-button {
    width: 45px;
    height: 45px;
  }
  z-index: 1;
}
.vant-tabs {
  z-index: 1;
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
.pub-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: z-index 0.2s linear;
  .pub-moment {
    position: absolute;
    width: 90%;
    margin: 0 auto;
    // height: 100%;
    top: 5%;
    right: 5%;
    border-radius: 10px;
    box-shadow: 0 0 10px #bbb;
    transform: scale(1);
  }
  // 动画
  .pub-moment-enter-active,
  .pub-moment-leave-active {
    transition: all 0.2s linear;
  }
  .pub-moment-enter-from,
  .pub-moment-leave-to {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    top: 88%;
    right: 20px;
    box-shadow: 0 0 5px #fff;
    transform: scale(0);
  }
}
.moment-detail {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  border-radius: 0;
}
.moment-detail-enter-active,
.moment-detail-leave-active {
  transition: all 0.3s ease;
}
.moment-detail-enter-from,
.moment-detail-leave-to {
  width: 90%;
  height: 200px;
  top: 400px;
  left: 5%;
  border-radius: 10%;
  // transform: translateX(-50%);
  // transform: scale(0.6, 0.1);
  opacity: 0;
}
</style>
