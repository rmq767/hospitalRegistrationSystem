<template>
  <el-container class="layout-container">
    <Header />
    <el-container class="layout-backtop">
      <Aside v-if="!isUser" />
      <Main />
    </el-container>
    <el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop>
  </el-container>
</template>

<script lang="ts">
import { Session } from "@/utils/session";
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import Aside from "./components/Aside.vue";
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
export default defineComponent({
  name: "",
  components: {
    Aside,
    Header,
    Main,
  },
  setup() {
    const isUser = computed(() => {
      return Session.get("userInfo").roles === "user";
    });
    return { isUser };
  },
});
</script>

<style lang="scss" scoped></style>
