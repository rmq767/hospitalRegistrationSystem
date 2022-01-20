<template>
  <div class="news-container" :style="{ width }">
    <NewsHeader :title="title" @getIndex="getIndex">
      <template #more>
        <span class="more">更多&gt;&gt;</span>
      </template>
    </NewsHeader>
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import NewsHeader from "@/components/News/NewsHeader.vue";
export default defineComponent({
  name: "NewsList",
  components: {
    NewsHeader,
  },
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
      default: "100%",
    },
  },
  setup(props, { emit }) {
    const getIndex = (index: number) => {
      emit("getIndex", index);
    };
    return { getIndex };
  },
});
</script>

<style lang="scss" scoped>
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
      max-width: 680px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
.more {
  font-size: 12px;
  color: #999;
  cursor: pointer;
  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
