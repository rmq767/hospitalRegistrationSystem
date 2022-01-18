<template>
  <el-scrollbar
    class="layout-scrollbar"
    :style="{ maxHeight: `calc(100vh - 60px)` }"
  >
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Main",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
