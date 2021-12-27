<template>
  <el-main>
    <el-scrollbar>
      <router-view></router-view>
    </el-scrollbar>
  </el-main>
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
