<template>
  <div class="changeInfo">
    <van-nav-bar left-arrow @click-left="back" title="个人信息" class="nav-bar" :border="false">
      <template #right>
        <van-button type="primary" size="mini" class="nav-bar-right" @click="submit">保存</van-button>
      </template>
    </van-nav-bar>
    <van-cell title="头像" class="changeInfo-van-cell">
      <template #value>
        <van-uploader style="width: 100%; height: 100%" v-model="info.img" :preview-image="false" :after-read="upload">
          <div style="width: 100%; height: 100%">
            <van-image width="50" height="50" style="z-index: 10" :src="currentImg" radius="5" @click.stop="imgView" />
          </div>
        </van-uploader>
      </template>
    </van-cell>
    <van-cell title="昵称" class="changeInfo-van-cell">
      <template #value>
        <van-field v-model="info.nickname" placeholder="昵称" input-align="right" />
      </template>
    </van-cell>
    <van-cell title="个性签名" class="changeInfo-van-cell">
      <template #value>
        <van-field v-model="info.signature" placeholder="因为个性所以没签名" input-align="right" />
      </template>
    </van-cell>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "@/store"

export default defineComponent({
  name: "changeInfo",
  setup() {
    onMounted(() => {
      info.img[info.img.length - 1].url = store.state.userInfo?.avatarUrl ?? require("@/assets/img/user.png")
    })

    const router = useRouter()
    const back = () => {
      router.go(-1)
    }

    const info = reactive({
      img: [{ url: "", content: "" }],
      nickname: "",
      signature: ""
    })

    const currentImg = computed(() => {
      const l = info.img.length - 1
      return info.img[l].url ?? info.img[l].content
    })

    const currentInstance = getCurrentInstance()?.appContext.config.globalProperties
    const imgView = () => {
      currentInstance?.$imgView({
        images: [currentImg.value],
        closeable: true
      })
    }

    const store = useStore()
    info.nickname = store.state.userInfo.nickname ?? ""
    info.signature = store.state.userInfo.signature ?? ""
    const upload = async (file: any) => {
      store.dispatch("myModule/uploadAvatarAction", file)
    }

    const submit = async () => {
      const res = await store.dispatch("myModule/changeInfoAction", info)
      if (res) {
        router.go(-1)
      }
    }

    return {
      back,
      info,
      imgView,
      currentImg,
      upload,
      submit
    }
  }
})
</script>

<style scoped lang="less">
.changeInfo {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 10;
  background: var(--background-color);
  // background: #fff;
  .nav-bar {
    background-color: var(--background-color);
    background-color: #fff;
    .nav-bar-right {
      padding: 12px 12px;
      border-radius: 5px;
      font-size: 14px;
    }
  }
  .changeInfo-van-cell {
    line-height: inherit;
    align-items: center;
    // padding: 6px 8px;
    :deep(.van-cell__value) {
      flex-grow: 3;
    }
    :deep(.van-field__control--right) {
      color: var(--dark-color2);
    }
    :deep(.van-cell--clickable) {
      padding-right: 0;
    }
  }
  :deep(.van-uploader__input-wrapper) {
    width: 100%;
    height: 100%;
  }
}
</style>
