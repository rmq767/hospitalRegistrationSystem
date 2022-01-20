<template>
  <div class="header">
    <div class="header-item">
      <span
        v-for="(item, index) in title"
        :key="item"
        :class="{ active: active === index }"
        @mouseenter="changeOne(index)"
        >{{ item }}</span
      >
    </div>
    <slot name="more"> </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "NewsHeader",
  props: {
    title: {
      type: Array,
      default: ["标题"],
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      active: 0,
    });
    const changeOne = (index: number) => {
      state.active = index;
      emit("getIndex", state.active);
    };
    return { changeOne, ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped>
.header {
  height: 40px;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-item {
    height: 100%;
    display: flex;
    span {
      display: flex;
      align-items: center;
      height: 100%;
      &:not(:last-child) {
        margin-right: 20px;
      }
      cursor: pointer;
      &:hover {
        color: var(--el-color-primary);
        border-bottom: 1px solid var(--el-color-primary);
      }
    }
    .active {
      color: var(--el-color-primary);
      border-bottom: 1px solid var(--el-color-primary);
    }
  }
}
</style>
