<template>
  <div>
    <el-card class="mb20">
      <el-form :model="filterForm" label-width="100px" :inline="true">
        <el-form-item label="医生姓名：">
          <el-input v-model="filterForm.name"></el-input>
        </el-form-item>
        <el-form-item label="科室：">
          <el-select v-model="filterForm.department" clearable filterable>
            <el-option
              v-for="item in departmentOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="mb20">
        <el-button type="primary" @click="addDoctor">新增医生</el-button>
      </div>
      <el-table :data="doctorTable">
        <el-table-column
          v-for="col in tableColumns"
          :prop="col.prop"
          :key="col.prop"
          :label="col.label"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="edit(scope.row)"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :currentPage="pageInfo.currentPage"
        :pageSize="pageInfo.pageSize"
        :total="pageInfo.total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></Pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "AdminDoctorManage",
  setup() {
    const state = reactive({
      filterForm: {
        name: "",
        department: "",
      },
      departmentOptions: ["儿科"],
      doctorTable: [
        {
          name: "李淳罡",
          accout: "123",
          age: 31,
          department: "儿科",
          type: "专家",
        },
      ],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      tableColumns: [
        {
          prop: "name",
          label: "医生姓名",
        },
        {
          prop: "accout",
          label: "账号",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "department",
          label: "科室",
        },
        {
          prop: "type",
          label: "级别",
        },
      ],
    });
    const onSubmit = () => {
      console.log(state.filterForm);
    };
    const addDoctor = () => {};
    const edit = (row: any) => {};
    const handleCurrentChange = (page: number) => {
      state.pageInfo.currentPage = page;
    };
    const handleSizeChange = (pageSize: number) => {
      state.pageInfo.pageSize = pageSize;
      state.pageInfo.currentPage = 1;
    };
    return {
      ...toRefs(state),
      onSubmit,
      addDoctor,
      edit,
      handleCurrentChange,
      handleSizeChange,
    };
  },
});
</script>

<style lang="scss" scoped></style>
