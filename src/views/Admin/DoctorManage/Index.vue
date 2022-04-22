<template>
  <div>
    <el-card class="mb20">
      <el-form
        :model="filterForm"
        label-width="100px"
        :inline="true"
        ref="ruleFormRef"
      >
        <el-form-item label="医生姓名：">
          <el-input v-model="filterForm.username"></el-input>
        </el-form-item>
        <el-form-item label="科室：">
          <el-select v-model="filterForm.administrativeId" clearable filterable>
            <el-option
              v-for="item in departmentOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
          <el-button @click="onReset(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="mb20">
        <el-button type="primary" @click="addDoctor">新增医务工作者</el-button>
      </div>
      <el-table :data="doctorTable">
        <el-table-column label="账号" prop="username"> </el-table-column>
        <!-- <el-table-column label="图片" prop="avatar">
          <template #default="scope">
            <el-image
              :src="scope.row.avatar"
              fit="fill"
              :lazy="true"
            ></el-image>
          </template>
        </el-table-column> -->
        <el-table-column label="性别" prop="gender">
          <template #default="scope">
            <span>{{ scope.row.gender ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="级别" prop="doctorRank"> </el-table-column>
        <el-table-column
          label="科室"
          prop="administrativeName"
        ></el-table-column>

        <el-table-column label="毕业院校" prop="graduateInstitutions">
        </el-table-column>
        <el-table-column label="工作年限" prop="workTime"> </el-table-column>
        <el-table-column label="联系电话" prop="phoneNumber"> </el-table-column>
        <el-table-column label="简介" prop="introduction"> </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="editDoctor(scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="deleteDoctor(scope.row)"
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
    <DoctorInfoDialog
      :info="doctorInfo"
      ref="doctorDialogEl"
      @submitForm="submitForm"
    ></DoctorInfoDialog>
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
import DoctorInfoDialog from "./components/DoctorInfo.vue";
import api from "@/api/index";
export default defineComponent({
  name: "AdminDoctorManage",
  components: {
    DoctorInfoDialog,
  },
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const state = reactive({
      filterForm: {
        username: "",
        administrativeId: "",
      },
      departmentOptions: [],
      doctorTable: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      doctorInfo: {},
      doctorDialogEl: ElDialog,
    });
    /**
     * @description 获取医生列表
     */
    const getDoctorList = async () => {
      const params = {
        ...state.filterForm,
        ...state.pageInfo,
      };
      const response = await api.doctor.apiGetDoctorList(params);
      if (response.data.code === 200) {
        state.doctorTable = response.data.data.records;
        state.pageInfo.total = response.data.data.total;
      } else {
        ElMessage.error(response.data.msg);
      }
    };
    /**
     * @description 新增或者编辑
     */
    const submitForm = (data: any) => {
      if (data.isEdit) {
        editDoctorForm(data.form);
      } else {
        addDoctorForm(data.form);
      }
    };
    /**
     * @description 编辑医生
     */
    const editDoctorForm = async (form: object) => {
      const response = await api.doctor.apiEditDoctor(form);
      if (response.data.code === 200) {
        ElMessage.success("修改成功！");
        getDoctorList();
      }
    };
    /**
     * @description 获取科室下拉
     */
    const getDepartment = async () => {
      try {
        const response = await api.department.apiGetAllAdministrative();
        if (response.data.code === 200) {
          state.departmentOptions = response.data.data;
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
    };
    /**
     * @description 添加医生
     */
    const addDoctorForm = async (form: object) => {
      const response = await api.doctor.apiAddDoctor(form);
      if (response.data.code === 200) {
        ElMessage.success("添加成功！");
        getDoctorList();
      }
    };
    /**
     * @description 条件筛选
     */
    const onSubmit = () => {
      state.pageInfo.currentPage = 1;
      getDoctorList();
    };
    /**
     * @description 重置
     */
    const onReset = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
      state.filterForm.username = "";
      state.filterForm.administrativeId = "";
      getDoctorList();
    };
    /**
     * @description 删除医生
     */
    const deleteDoctor = async (row: any) => {
      const resposne = await api.doctor.apiDeleteDoctor(row.id);
      if (resposne.data.code === 200) {
        ElMessage.success("删除成功！");
        getDoctorList();
      }
    };
    const addDoctor = () => {
      nextTick(() => {
        state.doctorInfo = {};
        state.doctorDialogEl.open();
      });
    };
    const editDoctor = (row: any) => {
      nextTick(() => {
        state.doctorInfo = Object.assign({}, row);
        state.doctorDialogEl.open();
      });
    };
    const handleCurrentChange = (page: number) => {
      state.pageInfo.currentPage = page;
      getDoctorList();
    };
    const handleSizeChange = (pageSize: number) => {
      state.pageInfo.pageSize = pageSize;
      state.pageInfo.currentPage = 1;
      getDoctorList();
    };
    onMounted(() => {
      getDoctorList();
      getDepartment();
    });
    return {
      ...toRefs(state),
      onSubmit,
      addDoctor,
      editDoctor,
      handleCurrentChange,
      handleSizeChange,
      submitForm,
      deleteDoctor,
      ruleFormRef,
      onReset,
    };
  },
});
</script>

<style lang="scss" scoped></style>
