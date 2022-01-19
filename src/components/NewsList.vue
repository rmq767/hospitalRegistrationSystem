<template>
  <div class="news-container" :style="{ width }">
    <div class="header">
      <div class="header-item">
        <span
          v-for="(item, index) in title"
          :key="item"
          @mouseenter="changeNews(index)"
          >{{ item }}</span
        >
      </div>
      <span class="more">更多&gt;&gt;</span>
    </div>
    <div
      class="content"
      v-for="(value, key) in data"
      :key="key"
      v-show="whichKey === key"
    >
      <p class="news-item" v-for="(item, index) in value" :key="index">
        <span class="news-title"><em>•</em> {{ item.title }}</span>
        <span class="news-date">{{ item.date }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "NewsList",
  props: {
    title: {
      type: Array,
      default: ["标题"],
    },
    data: {
      type: Object,
      default: () => {},
    },
    width: {
      type: String,
      default: "400px",
    },
  },
  setup(props) {
    const state = reactive({
      active: 0,
    });
    const whichKey = computed(() => {
      let dataKeys = Object.keys(props.data);
      return dataKeys[state.active];
    });
    const changeNews = (index: number) => {
      state.active = index;
    };
    return { ...toRefs(state), changeNews, whichKey };
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
  }
  .more {
    font-size: 12px;
    color: #999;
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary);
    }
  }
}
.content {
  margin-top: 10px;
  .news-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    margin-top: 10px;
    .news-title {
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: var(--el-color-primary);
      }
      em {
        color: var(--el-color-primary);
      }
    }
    .news-date {
      color: #999;
      font-size: 12px;
    }
  }
}
</style>
