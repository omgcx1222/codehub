<template>
  <div class="hqq-header" :style="{ 'flex-direction': direction === 'left' ? '' : 'row-reverse' }">
    <img class="img" :src="img" alt="" @click="clickTitle" :style="`width: ${size}; height: ${size}`" />
    <div class="title" @click="clickTitle" :style="`min-height: ${size}`">
      <div class="name" :style="{ 'text-align': direction === 'left' ? 'left' : 'right' }">{{ name }}</div>
      <div :style="{ 'align-self': direction === 'left' ? '' : 'flex-end' }">
        <slot name="message">
          <div class="message">{{ message }}</div>
        </slot>
      </div>
    </div>
    <div class="right" v-if="isRightShow">
      <div @click="clickRight">
        <slot name="right">
          <hqq-tag :value="rightText" class="follow"></hqq-tag>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "hqqHeader",
  props: {
    img: {
      type: String,
      default: require("@/assets/img/user.png")
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
    }
  },
  setup(_, { emit }) {
    const clickTitle = () => {
      emit("clickTitle")
    }
    const clickRight = () => {
      emit("clickRight")
    }
    return {
      clickTitle,
      clickRight
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
  .right {
    height: 40px;
    line-height: 40px;
  }
}
</style>
