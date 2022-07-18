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
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="9"
        :max-size="20 * 1024 * 1024"
        @oversize="onOversize"
        preview-size="100"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { Toast } from "vant"

export default defineComponent({
  name: "pubMoment",
  setup() {
    const router = useRouter()
    const back = () => {
      router.go(-1)
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
            const p = Number(progress.toFixed(2))
            toast.message = `正在上传图片${p * 100}%`
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
        back()
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
  height: 100vh;
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
  margin: 25px 20px 15px;
}
</style>
