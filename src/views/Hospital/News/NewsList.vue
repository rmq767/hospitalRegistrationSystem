<template>
  <div class="news-list">
    <NewsItem v-for="news in newsList" :key="news.id" :news="news"></NewsItem>
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
  name: "HospitalNews",
  components: {
    NewsItem,
  },
  setup() {
    const state = reactive({
      newsList: [
        {
          id: 1,
          title: "我院召开迎新春知识分子和各界人士代表座谈会",
          content:
            "1月21日下午，我院召开迎新春知识分子和各界人士代表座谈会。院长陈建勋同志主持会议，院党委书记田巨龙同志、副院长樊涛同志、副院长包家新同志、副院长卿丽华同志、副院长任楷同志出席。院内知识分子代表、青年代表、民主党派和无党派人士代表及相关职能部门负责人共60余人参加座谈。",
          time: "2022-01-25 17:11:00",
          view: 123,
        },
        {
          id: 2,
          title: "我院召开迎新春知识分子和各界人士代表座谈会",
          content:
            "1月21日下午，我院召开迎新春知识分子和各界人士代表座谈会。院长陈建勋同志主持会议，院党委书记田巨龙同志、副院长樊涛同志、副院长包家新同志、副院长卿丽华同志、副院长任楷同志出席。院内知识分子代表、青年代表、民主党派和无党派人士代表及相关职能部门负责人共60余人参加座谈。",
          time: "2022-01-25 17:11:00",
          view: 123,
        },
        {
          id: 3,
          title: "我院召开迎新春知识分子和各界人士代表座谈会",
          content:
            "1月21日下午，我院召开迎新春知识分子和各界人士代表座谈会。院长陈建勋同志主持会议，院党委书记田巨龙同志、副院长樊涛同志、副院长包家新同志、副院长卿丽华同志、副院长任楷同志出席。院内知识分子代表、青年代表、民主党派和无党派人士代表及相关职能部门负责人共60余人参加座谈。",
          time: "2022-01-25 17:11:00",
          view: 123,
        },
        {
          id: 4,
          title: "我院召开迎新春知识分子和各界人士代表座谈会",
          content:
            "1月21日下午，我院召开迎新春知识分子和各界人士代表座谈会。院长陈建勋同志主持会议，院党委书记田巨龙同志、副院长樊涛同志、副院长包家新同志、副院长卿丽华同志、副院长任楷同志出席。院内知识分子代表、青年代表、民主党派和无党派人士代表及相关职能部门负责人共60余人参加座谈。",
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
.news-list {
  padding: 20px;
  background-color: #fff;
  > div {
    margin-bottom: 20px;
  }
}
</style>
