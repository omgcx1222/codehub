<template>
  <van-nav-bar title="标题" fixed safe-area-inset-top placeholder>
    <template #title>
      <div class="tab">
        <div
          class="tab-item"
          :class="{ active: index === currentIndex }"
          v-for="(item, index) in list"
          :key="item"
          @click="changeSwiper(index)"
          :style="{
            'font-size': index === currentIndex ? currentSize + 'px' : index === nextIndex ? nextSize + 'px' : '16px',
            'font-weight': index === currentIndex ? 700 : 500
          }"
        >
          {{ item }}
        </div>
      </div>
    </template>
    <template #right>
      <van-icon name="edit" size="18" />
    </template>
  </van-nav-bar>

  <swiper @swiper="onSwiper" @slideChange="onSlideChange" @setTranslate="onTranslate" @touchEnd="touchEnd">
    <swiper-slide>1</swiper-slide>
    <swiper-slide>2</swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { ref } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Swiper as SwiperClass } from "swiper/types"
import "swiper/css"
export default {
  name: "moment",
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    const list = ["推荐", "关注"]
    let swiper: SwiperClass
    const currentIndex = ref(0)
    const nextIndex = ref(0)
    let currentSize = ref(20)
    let nextSize = ref(16)

    const onSwiper = (s: SwiperClass) => {
      swiper = s
    }
    const onSlideChange = (e: SwiperClass) => {
      currentIndex.value = e.activeIndex
      currentSize.value = 20
      nextSize.value = 16
    }
    const touchEnd = () => {
      currentSize.value = 20
      nextSize.value = 16
    }

    let start = 0
    const onTranslate = (swiper: SwiperClass, t: number) => {
      const w = swiper.width
      if (t < start) {
        const m = t + currentIndex.value * w
        if (currentIndex.value >= list.length - 1) return
        nextIndex.value = currentIndex.value + 1
        nextSize.value = 16 + 4 * (m / -w)
        currentSize.value = 20 - 4 * (m / -w)
      } else if (t > start) {
        const m = t + (currentIndex.value - 1) * w
        if (currentIndex.value <= 0) return
        nextIndex.value = currentIndex.value - 1
        nextSize.value = 20 - 4 * (m / -w)
        currentSize.value = 16 + 4 * (m / -w)
      }
      start = t
    }

    const changeSwiper = (index: number) => {
      currentIndex.value = index
      swiper.slideTo(index)
    }
    return {
      list,
      onSwiper,
      onSlideChange,
      onTranslate,
      currentIndex,
      nextIndex,
      changeSwiper,
      currentSize,
      nextSize,
      touchEnd
    }
  }
}
</script>

<style lang="less" scoped>
.tab {
  display: flex;
  flex-direction: row;
  .tab-item {
    // padding: 0 10px;
    width: 70px;
    color: var(--moment-title-color);
    font-size: var(--moment-title-font-size);
    font-weight: var(--moment-title-font-weight);
  }
  .active {
    color: var(--moment-title-active-color);
    font-size: var(--moment-title-active-font-size);
    font-weight: var(--moment-title-active-font-weight);
  }
}
.swiper {
  background-color: var(--van-background-color);
  .swiper-slide {
    height: calc(100vh - 46px - 50px);
  }
}
</style>
