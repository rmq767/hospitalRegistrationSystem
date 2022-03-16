<template>
  <div>
    <el-card class="mb20">
      <el-form
        :model="filterForm"
        label-width="100px"
        :inline="true"
        ref="ruleFormRef"
      >
        <el-form-item label="患者姓名：" prop="username">
          <el-input v-model="filterForm.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
          <el-button type="primary" @click="onReset(ruleFormRef)"
            >重置</el-button
          >
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
          <template v-else-if="col.prop === 'gender'" #default="scope">
            {{ scope.row.gender === 0 ? "女" : "男" }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="editUser(scope.row)"
              >修改</el-button
            >
            <el-button type="danger" size="small" @click="deleteUser(scope.row)"
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
    <UserInfoDialog :info="userInfo" ref="userDialogEl"></UserInfoDialog>
  </div>
</template>

<script lang="ts">
import { ElDialog, ElMessage, FormInstance } from "element-plus";
import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import UserInfoDialog from "./components/UserInfo.vue";
import { UserInterface } from "@/utils/interface/user";
import api from "@/api";
export default defineComponent({
  name: "AdminUserManage",
  components: {
    UserInfoDialog,
  },
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const state = reactive({
      filterForm: {
        username: "",
        gender: "",
        phoneNumber: "",
        id: "",
        status: 1,
      } as UserInterface,
      userTable: [
        {
          username: "李淳罡",
          gender: "123",
          phoneNumber: "123",
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
          prop: "username",
          label: "患者姓名",
        },
        {
          prop: "gender",
          label: "性别",
        },
        {
          prop: "phoneNumber",
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
    /**
     * @description 筛选
     */
    const onSubmit = () => {
      getUserList();
    };
    /**
     * @description 重置
     */
    const onReset = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
      getUserList();
    };
    const addUser = () => {
      state.userInfo = null;
      state.userDialogEl.open();
    };
    /**
     * @description 编辑用户
     */
    const editUser = (row: any) => {
      nextTick(() => {
        state.userInfo = Object.assign({}, row);
      });
      state.userDialogEl.open();
    };
    const deleteUser = async (row: UserInterface) => {
      try {
        const response = await api.user.apiDeleteUser(row.id);
        if (response.data.code === 200) {
          ElMessage.success("删除成功");
          getUserList();
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
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
    /**
     * @description 获取用户列表
     */
    const getUserList = async () => {
      try {
        const params = {
          ...state.pageInfo,
          ...state.filterForm,
        };
        const response = await api.user.apiGetUserList(params);
        if (response.data.code === 200) {
          state.userTable = response.data.data.records;
          state.pageInfo.total = response.data.data.total;
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
    };
    onMounted(() => {
      getUserList();
    });
    return {
      ...toRefs(state),
      onSubmit,
      addUser,
      editUser,
      handleCurrentChange,
      handleSizeChange,
      changeStatus,
      onReset,
      ruleFormRef,
      deleteUser,
    };
  },
});
</script>

<style lang="scss" scoped></style>
