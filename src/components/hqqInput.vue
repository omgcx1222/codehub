<template>
  <van-cell-group class="hqq-input" :border="false">
    <van-field
      class="input"
      v-model="message2"
      :rows="1"
      :autosize="{ maxHeight: 120 }"
      type="textarea"
      :maxlength="300"
      :placeholder="tip"
      @click-input="clickInput"
      @blur="blur"
      ref="input"
    >
      <template #button>
        <van-button class="pub-button" type="primary" size="mini" @click="submit">发送</van-button>
      </template>
    </van-field>
  </van-cell-group>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import type { FieldInstance } from "vant"

export default defineComponent({
  emits: ["submit", "focus", "blur", "update:message"],
  props: {
    tip: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit }) {
    const message2 = computed({
      set(value) {
        emit("update:message", value)
      },
      get() {
        return props.message
      }
    })

    const input = ref<FieldInstance>()
    const focusState = ref(false)
    const submit = () => {
      emit("submit")
    }
    const clickInput = () => {
      if (!focusState.value) {
        emit("focus")
        focusState.value = true
      }
    }
    const focus = () => {
      input.value?.focus()
      focusState.value = true
    }
    const blur = () => {
      focusState.value = false
      emit("blur")
    }

    return {
      input,
      submit,
      clickInput,
      blur,
      focus,
      message2
    }
  }
})
</script>

<style scoped lang="less">
.hqq-input {
  // background-color: var(--dark-color1);
  :deep(textarea) {
    background-color: var(--dark-color1);
    padding: 3px 8px;
    border-radius: 5px;
  }
  // :deep(.van-field__body) {
  //   align-items: center;
  // }
  :deep(.van-field__button) {
    align-self: flex-end;
    display: flex;
  }
  .pub-button {
    border-radius: 5px;
    padding: 5px 8px;
    height: 30px;
  }
}
</style>
