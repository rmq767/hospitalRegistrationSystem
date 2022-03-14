<template>
  <div>
    <el-card class="mb20">
      <el-form :model="filterForm" label-width="100px" :inline="true">
        <el-form-item label="医生姓名：">
          <el-input v-model="filterForm.doctor"></el-input>
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
            <el-button
              type="primary"
              size="small"
              @click="editDoctor(scope.row)"
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
    <DoctorInfoDialog
      :info="doctorInfo"
      ref="doctorDialogEl"
    ></DoctorInfoDialog>
  </div>
</template>

<script lang="ts">
import { ElDialog, ElMessage } from "element-plus";
import { defineComponent, nextTick, onMounted, reactive, toRefs } from "vue";
import DoctorInfoDialog from "./components/DoctorInfo.vue";
import api from "@/api/index";
interface doctorTable {
  avatar: string;
  name: string;
  age: number;
  username: string;
}
export default defineComponent({
  name: "AdminDoctorManage",
  components: {
    DoctorInfoDialog,
  },
  setup() {
    const state = reactive({
      filterForm: {
        doctor: "",
        department: "",
      },
      departmentOptions: ["儿科"],
      doctorTable: [] as Array<doctorTable>,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      tableColumns: [
        {
          prop: "avatar",
          label: "头像",
        },
        {
          prop: "name",
          label: "医生姓名",
        },
        {
          prop: "gender",
          label: "性别",
        },
        {
          prop: "username",
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
          prop: "doctorRank",
          label: "级别",
        },
        {
          prop: "expense",
          label: "挂号费",
        },
      ],
      doctorInfo: null,
      doctorDialogEl: ElDialog,
    });
    const getDoctorList = async () => {
      const params = {
        ...state.filterForm,
        ...state.pageInfo,
      };
      const response = await api.doctor.apiGetDoctorList(params);
      if (response.data.code === 200) {
        state.doctorTable = [
          {
            avatar: "",
            name: "2",
            age: 18,
            username: "123",
          },
        ];
        state.pageInfo.total = response.data.data.total;
      } else {
        ElMessage.error(response.data.msg);
      }
    };
    const onSubmit = () => {
      state.pageInfo.currentPage = 1;
      getDoctorList();
    };
    const addDoctor = () => {
      state.doctorInfo = null;
      state.doctorDialogEl.open();
    };
    const editDoctor = (row: any) => {
      nextTick(() => {
        state.doctorInfo = Object.assign({}, row);
      });
      state.doctorDialogEl.open();
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
    });
    return {
      ...toRefs(state),
      onSubmit,
      addDoctor,
      editDoctor,
      handleCurrentChange,
      handleSizeChange,
    };
  },
});
</script>

<style lang="scss" scoped></style>
