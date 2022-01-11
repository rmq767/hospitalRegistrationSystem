<template>
  <div>
    <el-card class="mb20">
      <el-form :model="filterForm" label-width="100px" :inline="true">
        <el-form-item label="用户名：">
          <el-input v-model="filterForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="mb20">
        <el-button type="primary" @click="multipleAudit">批量审核</el-button>
        <el-button type="primary" @click="multipleDelete">批量删除</el-button>
      </div>
      <el-table
        :data="evaluationTable"
        @selection-change="handleSelectionChange"
        ref="multipleTableRef"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="col in tableColumns"
          :prop="col.prop"
          :key="col.prop"
          :label="col.label"
        >
          <template #default="scope" v-if="col.prop === 'status'">
            <el-switch
              v-model="scope.row.status"
              :before-change="changeStatus"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="danger"
              size="small"
              @click="deleteEvaluation(scope.row)"
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
    <Dialog :info="evaluationInfo" ref="evaluationDialogEl"></Dialog>
  </div>
</template>

<script lang="ts">
import { ElDialog, ElMessage, ElMessageBox, ElTable } from "element-plus";
import { defineComponent, reactive, toRefs } from "vue";
import Dialog from "./components/EvaluationDialog.vue";
interface Evaluation {
  username: string;
  type: string;
  status: number;
}

export default defineComponent({
  name: "SettingEvaluation",
  components: {
    Dialog,
  },
  setup() {
    const state = reactive({
      filterForm: {
        username: "",
        type: "",
        status: 0,
      },
      evaluationTable: [
        {
          username: "李淳罡",
          type: "1",
        },
        {
          username: "徐凤年",
          type: "2",
        },
      ],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      tableColumns: [
        {
          prop: "username",
          label: "用户名",
        },
        {
          prop: "type",
          label: "评价类型",
        },
        {
          prop: "status",
          label: "审核状态",
        },
      ],
      evaluationInfo: null,
      evaluationDialogEl: ElDialog,
      multipleTableRef: ElTable,
      multipleEvaluation: [] as Evaluation[],
    });
    const onSubmit = () => {
      console.log(state.filterForm);
    };
    const addNotice = () => {
      state.evaluationInfo = null;
      state.evaluationDialogEl.open();
    };
    const deleteEvaluation = (row: any) => {
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
    const multipleAudit = () => {
      if (!state.multipleEvaluation.length) {
        ElMessage.warning("请选择数据！");
        return false;
      }
      ElMessageBox.confirm("确定审核通过?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(state.multipleEvaluation);
          state.multipleTableRef.clearSelection();
          state.multipleEvaluation = [];
          ElMessage({
            type: "success",
            message: "取消成功！",
          });
        })
        .catch(() => {});
    };
    const multipleDelete = () => {
      if (!state.multipleEvaluation.length) {
        ElMessage.warning("请选择数据！");
        return false;
      }
      ElMessageBox.confirm("确定全部删除?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(state.multipleEvaluation);
          state.multipleTableRef.clearSelection();
          state.multipleEvaluation = [];
          ElMessage({
            type: "success",
            message: "取消成功！",
          });
        })
        .catch(() => {});
    };
    const handleSelectionChange = (val: Evaluation[]) => {
      state.multipleEvaluation = val;
    };
    const changeStatus = () => {
      return false;
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
      addNotice,
      deleteEvaluation,
      multipleAudit,
      multipleDelete,
      handleSelectionChange,
      changeStatus,
      handleCurrentChange,
      handleSizeChange,
    };
  },
});
</script>

<style lang="scss" scoped></style>
