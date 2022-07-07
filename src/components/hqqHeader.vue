<template>
  <div class="hqq-header">
    <img class="img" :src="img" alt="" @click="clickTitle" />
    <div class="title" @click="clickTitle">
      <div class="name">{{ name }}</div>
      <slot name="message">
        <div class="message">{{ message }}</div>
      </slot>
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
      default: "title"
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
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .title {
    flex: 1;
    min-height: 40px;
    display: flex;
    flex-direction: column;
    margin-left: 12px;
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
