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
          <el-button @click="onReset(ruleFormRef)">重置</el-button>
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
          <template v-if="col.prop === 'gender'" #default="scope">
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
    <UserInfoDialog
      :info="userInfo"
      ref="userDialogEl"
      @submitForm="submitForm"
    ></UserInfoDialog>
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
        gender: 0,
        phoneNumber: "",
        id: "",
      } as UserInterface,
      userTable: [],
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
    /**
     * @description 新增或者编辑
     */
    const submitForm = (data: any) => {
      if (data.isEdit) {
        editUserForm(data.form);
      } else {
        addUserForm(data.form);
      }
    };
    /**
     * @description 编辑用户
     */
    const editUserForm = async (form: object) => {
      const response = await api.user.apiEditUser(form);
      if (response.data.code === 200) {
        ElMessage.success("修改成功！");
        getUserList();
      }
    };
    const addUserForm = async (form: object) => {
      const response = await api.user.apiAddUser(form);
      if (response.data.code === 200) {
        ElMessage.success("添加成功！");
        getUserList();
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
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped></style>
