<template>
  <div>
    <el-card class="mb20">
      <el-form :model="filterForm" label-width="100px" :inline="true">
        <el-form-item label="公告标题：">
          <el-input v-model="filterForm.title" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="mb20">
        <el-button type="primary" @click="addNotice">新增公告</el-button>
      </div>
      <el-table :data="noticeTable">
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
              @click="editNotice(scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="deleteNotice(scope.row)"
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
    <Dialog :info="noticeInfo" ref="noticeDialogEl"></Dialog>
  </div>
</template>

<script lang="ts">
import { ElDialog, ElMessage, ElMessageBox } from "element-plus";
import { defineComponent, nextTick, reactive, toRefs } from "vue";
import Dialog from "./components/NoticeDialog.vue";
export default defineComponent({
  name: "SettingDepartment",
  components: {
    Dialog,
  },
  setup() {
    const state = reactive({
      filterForm: {
        title: "",
        content: "",
      },
      noticeTable: [
        {
          title: "李淳罡",
          content: "123",
        },
      ],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      tableColumns: [
        {
          prop: "title",
          label: "公告标题",
        },
        {
          prop: "content",
          label: "公告内容",
        },
      ],
      noticeInfo: null,
      noticeDialogEl: ElDialog,
    });
    const onSubmit = () => {
      console.log(state.filterForm);
    };
    const addNotice = () => {
      state.noticeInfo = null;
      state.noticeDialogEl.open();
    };
    const editNotice = (row: any) => {
      nextTick(() => {
        state.noticeInfo = Object.assign({}, row);
      });
      state.noticeDialogEl.open();
    };
    const deleteNotice = (row: any) => {
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
      addNotice,
      editNotice,
      deleteNotice,
      handleCurrentChange,
      handleSizeChange,
    };
  },
});
</script>

<style lang="scss" scoped></style>
