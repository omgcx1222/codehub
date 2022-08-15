<template>
  <div class="menu-option">
    <van-cell class="item" title="我的动态" icon="smile-o" :border="false" is-link> </van-cell>
    <van-cell class="item" title="我的评论" icon="comment-circle-o" :border="false" is-link> </van-cell>
    <van-cell class="item" title="修改资料" icon="edit" :border="false" @click="changeInfo" is-link> </van-cell>
    <van-cell class="item" title="主题" icon="setting-o" :border="false" @click="showTheme = true" is-link>
      <template #value>
        <span>{{ theme[currentTheme].name }}</span>
      </template>
    </van-cell>
    <van-popup v-model:show="showTheme" class="popup">
      <div class="theme">
        <div
          class="theme-item"
          :class="currentTheme === index ? 'active' : ''"
          @click="changeTheme(index)"
          v-for="(item, index) in theme"
          :key="item.name"
        >
          <img :src="item.svg" style="width: 20px; height: 20px" />
          <span style="padding-left: 8px">{{ item.name }}</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import { useStore } from "@/store"
import { useRouter } from "vue-router"

export default defineComponent({
  setup() {
    const router = useRouter()
    const changeInfo = () => {
      router.push("/changeInfo")
    }

    const store = useStore()
    const showTheme = ref(false)
    const theme = computed(() => store.state.theme)
    const currentTheme = computed(() => store.state.currentTheme)
    const changeTheme = (index: number) => {
      store.commit("changeTheme", index)
    }

    return {
      changeInfo,
      theme,
      showTheme,
      changeTheme,
      currentTheme
    }
  }
})
</script>

<style scoped lang="less">
.menu-option {
  margin-top: 20px;
  .item {
    padding: 10px 8px;
    align-items: center;
  }
  .popup {
    // border-radius: 8px !important;
    .theme {
      background-color: #343434;
      border: 1px solid #858585;
      border-radius: 8px;
      box-shadow: 0px 1px 6px rgba(251, 251, 254, 0.2);
      padding: 18px 25px;
      box-sizing: border-box;
      .theme-item {
        color: #fff;
        padding: 8px 16px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
      }
      .theme-item:nth-child(1) {
        margin-bottom: 10px;
      }
      .theme-item.active {
        background-color: #000;
        border: 1px solid #858585;
        box-shadow: 0px 1px 6px rgba(251, 251, 254, 0.2);
      }
    }
  }
}
</style>
