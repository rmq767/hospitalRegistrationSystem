<template>
  <div class="doctor">
    <DoctorFilter></DoctorFilter>
    <DoctorList></DoctorList>
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
import Pagination from "@/components/Pagination.vue";
import { defineComponent, reactive, toRefs } from "vue";
import DoctorFilter from "./components/DoctorFilter.vue";
import DoctorList from "./components/DoctorList.vue";
export default defineComponent({
  name: "Doctor",
  components: {
    DoctorFilter,
    DoctorList,
    Pagination,
  },
  setup() {
    const state = reactive({
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
    });
    /**
     * @description 分页-每页条数
     */
    const handleSizeChange = (size: number) => {
      console.log(size);
    };
    /**
     * @description 分页-当前页数
     */
    const handleCurrentChange = (page: number) => {
      console.log(page);
    };
    return { ...toRefs(state), handleSizeChange, handleCurrentChange };
  },
});
</script>

<style lang="scss" scoped></style>
