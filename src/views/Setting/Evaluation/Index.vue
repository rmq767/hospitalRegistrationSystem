<template>
  <div>
    <el-card class="mb20">
      <el-form
        :model="filterForm"
        label-width="100px"
        :inline="true"
        ref="ruleFormRef"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="filterForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
          <el-button @click="onReset(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="evaluationTable" ref="multipleTableRef">
        <el-table-column
          v-for="col in tableColumns"
          :prop="col.prop"
          :key="col.prop"
          :label="col.label"
        >
          <template
            #default="scope"
            v-if="col.prop === 'status' || col.prop === 'createTime'"
          >
            <el-switch
              v-if="col.prop === 'status'"
              v-model="scope.row.status"
              :before-change="changeStatus"
            />
            <span v-if="col.prop === 'createTime'">{{
              formatDate(scope.row.createTime)
            }}</span>
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
  </div>
</template>

<script lang="ts">
import api from "@/api";
import {
  ElDialog,
  ElMessage,
  ElMessageBox,
  ElTable,
  FormInstance,
} from "element-plus";
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
interface Evaluation {
  username: string;
  type: string;
  status: number;
}
import mixin from "@/mixin";
export default defineComponent({
  name: "SettingEvaluation",
  mixins: [mixin],
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const state = reactive({
      filterForm: {
        username: "",
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
          prop: "content",
          label: "评价内容",
        },
        {
          prop: "createTime",
          label: "创建时间",
        },
        {
          prop: "status",
          label: "审核状态",
        },
      ],
      evaluationInfo: null,
      evaluationDialogEl: ElDialog,
      multipleTableRef: ElTable,
    });
    /**
     * @description 获取评价
     */
    const getEvalitionList = async () => {
      const parmas = {
        currentPage: state.pageInfo.currentPage,
        pageSize: state.pageInfo.pageSize,
        ...state.filterForm,
      };
      try {
        const response = await api.evaluation.apiGetEvaluationList(parmas);
        if (response.data.code === 200) {
          state.evaluationTable = response.data.data.records;
          state.pageInfo.total = response.data.data.total;
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
    };
    const onSubmit = () => {
      getEvalitionList();
    };
    /**
     * @description 重置
     */
    const onReset = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
      getEvalitionList();
    };
    const addNotice = () => {
      state.evaluationInfo = null;
      state.evaluationDialogEl.open();
    };
    /**
     * @description 删除评价
     */
    const deleteEvaluation = (row: any) => {
      ElMessageBox.confirm("确定删除?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await api.evaluation.apiDeleteEvaluation(row.id);
            if (response.data.code === 200) {
              ElMessage.success("删除成功！");
              getEvalitionList();
            } else {
              ElMessage.error(response.data.msg);
            }
          } catch (error: any) {
            ElMessage.error(error);
          }
        })
        .catch(() => {});
    };
    const changeStatus = () => {
      return false;
    };
    const handleCurrentChange = (page: number) => {
      state.pageInfo.currentPage = page;
      getEvalitionList();
    };
    const handleSizeChange = (pageSize: number) => {
      state.pageInfo.pageSize = pageSize;
      state.pageInfo.currentPage = 1;
      getEvalitionList();
    };
    onMounted(() => {
      getEvalitionList();
    });
    return {
      ...toRefs(state),
      onSubmit,
      addNotice,
      deleteEvaluation,
      changeStatus,
      handleCurrentChange,
      handleSizeChange,
      ruleFormRef,
      onReset,
    };
  },
});
</script>

<style lang="scss" scoped></style>
