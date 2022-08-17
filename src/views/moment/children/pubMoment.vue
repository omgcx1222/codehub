<template>
  <div class="pub-moment">
    <div class="pub-nav-bar">
      <span class="back" @click="back">取消</span>
      <van-button type="primary" size="mini" class="nav-bar-right" @click="publish">发布</van-button>
    </div>

    <van-cell-group inset>
      <van-field
        v-model="message"
        rows="5"
        :autosize="{
          maxHeight: 170
        }"
        type="textarea"
        maxlength="1000"
        placeholder="正文"
        show-word-limit
      />
    </van-cell-group>

    <div class="upload">
      <van-uploader v-model="fileList" multiple :max-count="9" :max-size="20 * 1024 * 1024" @oversize="onOversize" preview-size="92" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { useStore } from "vuex"
import { Toast } from "vant"

export default defineComponent({
  name: "pubMoment",
  emits: ["back"],
  setup(_, { emit }) {
    const back = (clear: boolean) => {
      if (clear) {
        message.value = ""
        fileList.value = []
      }
      emit("back")
    }

    const message = ref("")
    const fileList = ref<any[]>([])
    const onOversize = () => {
      Toast("图片大小不能超过20mb")
    }

    const store = useStore()
    const publish = async () => {
      if (!message.value) return Toast("正文不能为空")
      const textRes = await store.dispatch("momentModule/pubMomentAction", { content: message.value })
      if (textRes.status !== 200) {
        return Toast.fail(textRes.data)
      }

      const toast = Toast({
        message: "正在上传",
        type: "loading",
        overlay: true,
        forbidClick: true,
        duration: 0
      })
      let tip = "发布成功"
      if (fileList.value.length) {
        const momentId = textRes.data.id

        await store.dispatch("momentModule/uploadsAction", {
          momentId,
          files: fileList.value,
          process: (progress: number) => {
            const p = (progress * 100).toFixed(2)
            toast.message = `正在上传图片${p}%`
            if (progress === 1) toast.clear()
            if (progress === -1) {
              toast.clear()
              tip = "发布成功，但部分图片上传失败"
            }
          }
        })
      }

      Toast.success(tip)
      if (tip === "发布成功") {
        store.dispatch("momentModule/pubSuccess")
        back(true)
      }
    }

    return {
      back,
      publish,
      message,
      fileList,
      onOversize
    }
  }
})
</script>

<style scoped lang="less">
.pub-moment {
  width: 100%;
  // height: 100vh;
  background-color: var(--white-background-color);
}
.pub-nav-bar {
  display: flex;
  justify-content: space-between;
  margin: 25px 20px 15px;
  .back {
    color: var(--dark-color2);
  }
  .nav-bar-right {
    padding: 12px 12px;
    border-radius: 5px;
    font-size: 14px;
  }
}
.upload {
  width: 300px;
  margin: 25px 20px 15px;
}
</style>
