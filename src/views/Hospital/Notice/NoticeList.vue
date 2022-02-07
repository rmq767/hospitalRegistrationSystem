<template>
  <div class="notice-list">
    <NewsItem
      v-for="notice in noticeList"
      :key="notice.id"
      :news="notice"
    ></NewsItem>
    <Pagination
      :currentPage="pageInfo.currentPage"
      :pageSize="pageInfo.pageSize"
      :total="pageInfo.total"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></Pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import NewsItem from "@/components/NewsItem/Index.vue";

export default defineComponent({
  name: "HospitalNotice",
  components: {
    NewsItem,
  },
  setup() {
    const state = reactive({
      noticeList: [
        {
          id: 1,
          title: "我院召开迎新春知识分子和各界人士代表座谈会",
          time: "2022-01-25 17:11:00",
          view: 123,
        },
        {
          id: 2,
          title: "我院召开迎新春知识分子和各界人士代表座谈会",
          time: "2022-01-25 17:11:00",
          view: 123,
        },
        {
          id: 3,
          title: "我院召开迎新春知识分子和各界人士代表座谈会",
          time: "2022-01-25 17:11:00",
          view: 123,
        },
        {
          id: 4,
          title: "我院召开迎新春知识分子和各界人士代表座谈会",
          time: "2022-01-25 17:11:00",
          view: 123,
        },
      ],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
    });
    const handleCurrentChange = (page: number) => {
      state.pageInfo.currentPage = page;
    };
    const handleSizeChange = (pageSize: number) => {
      state.pageInfo.pageSize = pageSize;
      state.pageInfo.currentPage = 1;
    };
    return { ...toRefs(state), handleCurrentChange, handleSizeChange };
  },
});
</script>

<style lang="scss" scoped>
.notice-list {
  padding: 20px;
  background-color: #fff;
  > div {
    margin-bottom: 20px;
  }
}
</style>
