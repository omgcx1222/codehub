<template>
  <div class="hqq-header" :style="{ 'flex-direction': direction === 'left' ? '' : 'row-reverse' }">
    <!-- 气泡弹出框 -->
    <van-popover v-if="isPopoverShow" v-model:show="showPopover" :actions="actions" placement="right-start" @select="select">
      <template #reference>
        <img class="img" :src="img ?? require('@/assets/img/user.png')" alt="" :style="`width: ${size}; height: ${size}`" />
      </template>
    </van-popover>
    <img class="img" v-else :src="img ?? require('@/assets/img/user.png')" :style="`width: ${size}; height: ${size}`" @click="clickImg" />
    <div class="title" @click="clickTitle" :style="`min-height: ${size}`">
      <div class="name" :style="{ 'text-align': direction === 'left' ? 'left' : 'right' }">{{ name }}</div>
      <div :style="{ 'align-self': direction === 'left' ? 'flex-start' : 'flex-end', width }">
        <slot name="message">
          <div class="message">{{ message }}</div>
        </slot>
      </div>
    </div>
    <!-- <div class="right" v-if="isRightShow"> -->
    <div @click="clickRight" v-if="isRightShow" :style="`height: ${size}`">
      <slot name="right">
        <hqq-tag :value="rightText" class="follow" :style="`line-height: ${size}`"></hqq-tag>
      </slot>
    </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import type { PropType } from "vue"
import type { PopoverAction } from "vant"

export default defineComponent({
  name: "hqqHeader",
  props: {
    img: {
      type: String
    },
    name: {
      type: String,
      default: "name"
    },
    message: {
      type: String,
      default: "message"
    },
    rightText: {
      type: String,
      default: "关注"
    },
    isRightShow: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "40px"
    },
    direction: {
      type: String,
      default: "left"
    },
    width: {
      type: String,
      default: "100%"
    },
    isPopoverShow: {
      type: Boolean,
      default: true
    },
    actions: {
      type: Array as PropType<PopoverAction[]>
    }
  },
  emits: ["clickTitle", "clickRight", "clickImg", "select"],
  setup(props, { emit }) {
    const clickTitle = () => {
      emit("clickTitle")
    }
    const clickRight = () => {
      emit("clickRight")
    }
    const clickImg = () => {
      emit("clickImg", props.img)
    }
    const showPopover = ref(false)
    const select = (action: PopoverAction) => {
      emit("select", action)
    }
    return {
      clickTitle,
      clickRight,
      clickImg,
      showPopover,
      select
    }
  }
})
</script>

<style scoped lang="less">
.hqq-header {
  display: flex;
  align-items: flex-start;
  // margin-bottom: 25px;
  .img {
    // width: 50px;
    // height: 50px;
    border-radius: 50%;
  }
  .title {
    flex: 1;
    // min-height: 50px;
    display: flex;
    flex-direction: column;
    margin: 0 12px;
    justify-content: space-around;
    .message {
      font-size: 12px;
      color: var(--dark-color2);
    }
  }
  // .right {
  //   height: 40px;
  //   line-height: 40px;
  // }
}
</style>
