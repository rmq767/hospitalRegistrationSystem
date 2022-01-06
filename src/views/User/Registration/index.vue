<template>
  <div>
    <Department @change="changeDepartment" />
    <DoctorTable />
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
import Department from "./components/Department.vue";
import DoctorTable from "./components/DoctorTable.vue";
export default defineComponent({
  name: "Registration",
  components: {
    Department,
    DoctorTable,
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
     * @description 选择科室
     */
    const changeDepartment = (value: string) => {
      console.log(value);
    };
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
    return {
      ...toRefs(state),
      changeDepartment,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style lang="scss" scoped></style>
