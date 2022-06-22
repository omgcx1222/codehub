<template>
  <div @click="fn(123)">chat</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  setup() {
    const fn = (option: string) => {
      console.log(option)
    }
    return {
      fn
    }
  }
})
</script>

<style scoped></style>
