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
import api from "@/api";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import NewsItem from "@/components/NewsItem/Index.vue";

export default defineComponent({
  name: "HospitalNotice",
  components: {
    NewsItem,
  },
  setup() {
    const state = reactive({
      noticeList: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
    });
    /**
     * @description 获取公告列表
     */
    const getNoticeList = async () => {
      const params = {
        ...state.pageInfo,
      };
      const response = await api.notice.apiGetAnnouncementList(params);
      state.noticeList = response.data.data.records;
      state.pageInfo.total = response.data.data.total;
    };
    const handleCurrentChange = (page: number) => {
      state.pageInfo.currentPage = page;
      getNoticeList();
    };
    const handleSizeChange = (pageSize: number) => {
      state.pageInfo.pageSize = pageSize;
      state.pageInfo.currentPage = 1;
      getNoticeList();
    };

    onMounted(() => {
      getNoticeList();
    });
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
