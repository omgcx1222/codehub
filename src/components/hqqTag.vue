<template>
  <div class="tag">
    <span>{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const text = computed(() => props.value)

    return {
      text
    }
  }
})
</script>

<style scoped>
.tag {
  display: inline-block;
  /* width: 100%;
  height: 100%; */
}
.tag span {
  font-size: 12px;
  text-align: center;
  border: 1px var(--dark-color2) solid;
  border-radius: 5px;
  padding: 3px 5px;
}
</style>
