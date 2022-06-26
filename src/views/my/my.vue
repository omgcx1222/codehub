<template>
  <div class="my">
    <user-header></user-header>
    <div class="menu">
      <menu-header></menu-header>
      <menu-option></menu-option>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import userHeader from "./components/userHeader.vue"
import menuHeader from "./components/menuHeader.vue"
import menuOption from "./components/menuOption.vue"

export default defineComponent({
  components: {
    userHeader,
    menuHeader,
    menuOption
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.my {
  width: 100%;
  height: calc(100vh - 50px);
  overflow: hidden;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
}
.menu {
  flex: 1;
  background-color: var(--menu-option-background-color);
  border-radius: 20px 20px 0 0;
  padding: 20px 15px 0;
}
</style>
