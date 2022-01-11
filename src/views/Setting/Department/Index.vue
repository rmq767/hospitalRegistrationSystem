<template>
  <div>
    <el-card class="mb20">
      <el-form :model="filterForm" label-width="100px" :inline="true">
        <el-form-item label="科室名称：">
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
        <el-button type="primary" @click="addDepartment">新增科室</el-button>
      </div>
      <el-table :data="departmentTable">
        <el-table-column
          v-for="col in tableColumns"
          :prop="col.prop"
          :key="col.prop"
          :label="col.label"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="editDepartment(scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="deleteDepartment(scope.row)"
              >删除</el-button
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
    <Dialog :info="departmentInfo" ref="departmentDialogEl"></Dialog>
  </div>
</template>

<script lang="ts">
import { ElDialog, ElMessage, ElMessageBox } from "element-plus";
import { defineComponent, nextTick, reactive, toRefs } from "vue";
import Dialog from "./components/DepartmentDialog.vue";
export default defineComponent({
  name: "SettingDepartment",
  components: {
    Dialog,
  },
  setup() {
    const state = reactive({
      filterForm: {
        department: "",
      },
      departmentOptions: ["儿科"],
      departmentTable: [
        {
          department: "李淳罡",
          desc: "123",
        },
      ],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      tableColumns: [
        {
          prop: "department",
          label: "科室名称",
        },
        {
          prop: "desc",
          label: "简介",
        },
      ],
      departmentInfo: null,
      departmentDialogEl: ElDialog,
    });
    const onSubmit = () => {
      console.log(state.filterForm);
    };
    const addDepartment = () => {
      state.departmentInfo = null;
      state.departmentDialogEl.open();
    };
    const editDepartment = (row: any) => {
      nextTick(() => {
        state.departmentInfo = Object.assign({}, row);
      });
      state.departmentDialogEl.open();
    };
    const deleteDepartment = (row: any) => {
      ElMessageBox.confirm("确定删除?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "取消成功！",
          });
        })
        .catch(() => {});
    };
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
      addDepartment,
      editDepartment,
      deleteDepartment,
      handleCurrentChange,
      handleSizeChange,
    };
  },
});
</script>

<style lang="scss" scoped></style>
