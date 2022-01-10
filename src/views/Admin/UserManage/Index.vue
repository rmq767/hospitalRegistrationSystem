<template>
  <div>
    <el-card class="mb20">
      <el-form :model="filterForm" label-width="100px" :inline="true">
        <el-form-item label="患者姓名：">
          <el-input v-model="filterForm.name"></el-input>
        </el-form-item>
        <el-form-item label="患者账号：">
          <el-input v-model="filterForm.account"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="mb20">
        <el-button type="primary" @click="addUser">新增患者</el-button>
      </div>
      <el-table :data="userTable">
        <el-table-column
          v-for="col in tableColumns"
          :prop="col.prop"
          :key="col.prop"
          :label="col.label"
        >
          <template v-if="col.prop === 'status'" #default="scope">
            <el-switch
              v-model="scope.row.status"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启用"
              inactive-text="禁用"
              :before-change="changeStatus"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="editUser(scope.row)"
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
    <UserInfoDialog :info="userInfo" ref="userDialogEl"></UserInfoDialog>
  </div>
</template>

<script lang="ts">
import { ElDialog } from "element-plus";
import { defineComponent, nextTick, reactive, toRefs } from "vue";
import UserInfoDialog from "./components/UserInfo.vue";
import { UserInterface } from "@/utils/interface/user";
export default defineComponent({
  name: "AdminUserManage",
  components: {
    UserInfoDialog,
  },
  setup() {
    const state = reactive({
      filterForm: {
        name: "",
        account: "",
        phone: "",
        id: "",
        status: 1,
      } as UserInterface,
      userTable: [
        {
          name: "李淳罡",
          account: "123",
          phone: "123",
          id: "123",
          status: 0,
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
          label: "患者姓名",
        },
        {
          prop: "account",
          label: "患者账号",
        },
        {
          prop: "phone",
          label: "患者手机号",
        },
        {
          prop: "id",
          label: "患者身份证",
        },
        {
          prop: "status",
          label: "禁启用",
        },
      ],
      userInfo: null,
      userDialogEl: ElDialog,
    });
    const onSubmit = () => {
      console.log(state.filterForm);
    };
    const addUser = () => {
      state.userInfo = null;
      state.userDialogEl.open();
    };
    const editUser = (row: any) => {
      nextTick(() => {
        state.userInfo = Object.assign({}, row);
      });
      state.userDialogEl.open();
    };
    const handleCurrentChange = (page: number) => {
      state.pageInfo.currentPage = page;
    };
    const handleSizeChange = (pageSize: number) => {
      state.pageInfo.pageSize = pageSize;
      state.pageInfo.currentPage = 1;
    };
    const changeStatus = () => {
      return false;
    };
    return {
      ...toRefs(state),
      onSubmit,
      addUser,
      editUser,
      handleCurrentChange,
      handleSizeChange,
      changeStatus,
    };
  },
});
</script>

<style lang="scss" scoped></style>
