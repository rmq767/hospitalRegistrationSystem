<template>
  <div class="news-container" :style="{ width }">
    <NewsHeader :title="title" @getIndex="getIndex">
      <template #more>
        <span class="more" @click="toPage">更多&gt;&gt;</span>
      </template>
    </NewsHeader>
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import NewsHeader from "@/components/News/NewsHeader.vue";
import { useRouter } from "vue-router";
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
    const tabIndex = ref(0);
    const router = useRouter();
    const getIndex = (index: number) => {
      emit("getIndex", index);
      tabIndex.value = index;
    };
    const toPage = () => {
      let tab = props.title[tabIndex.value];
      let path = "";
      switch (tab) {
        case "医院公告":
          path = "/hospital/notice";
          break;
        case "医院新闻":
          path = "/hospital/news";
          break;
        case "专家团队":
          path = "/hospital/departmentdoctor";
          break;
        case "科室导航":
          path = "/hospital/departmentdoctor";
          break;
        case "附院风采":
          path = "/hospital/culture";
          break;
      }
      router.push(path);
    };
    return { getIndex, toPage };
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
