<template>
  <div class="doctor">
    <div class="filter">
      <el-card>
        <el-form
          :model="filterForm"
          label-width="100px"
          :inline="true"
          ref="ruleFormRef"
        >
          <el-form-item label="医生姓名：" prop="username">
            <el-input v-model="filterForm.username"></el-input>
          </el-form-item>
          <el-form-item label="科室：" prop="administrativeId">
            <el-select
              v-model="filterForm.administrativeId"
              clearable
              filterable
            >
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
    </div>
    <el-card>
      <el-table :data="doctorTable" style="width: 100%">
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
            <el-button type="text" size="small" @click="toDoctorInfo(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
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
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, FormInstance } from "element-plus";
import api from "@/api";
export default defineComponent({
  name: "Doctor",
  components: {
    Pagination,
  },
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const state = reactive({
      filterForm: {
        username: "",
        administrativeId: "",
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      departmentOptions: [],
      doctorTable: [],
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
      getDoctorList();
    };
    const router = useRouter();
    const toDoctorInfo = (row: any) => {
      router.push({ name: "HospitalDoctorInfo", params: { id: row.id } });
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
      getDepartment();
      getDoctorList();
    });
    return {
      ...toRefs(state),
      handleSizeChange,
      handleCurrentChange,
      toDoctorInfo,
      onReset,
      onSubmit,
      ruleFormRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.filter {
  margin-bottom: 20px;
  .name {
    display: inline-flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
}
</style>
