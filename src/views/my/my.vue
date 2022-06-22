<template>
  <div class="my">
    <user-header></user-header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import userHeader from "./components/userHeader.vue"

export default defineComponent({
  components: {
    userHeader
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.my {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
