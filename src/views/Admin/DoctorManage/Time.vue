<template>
  <div>
    <el-card class="filter">
      <el-form :inline="true" :model="filter">
        <el-form-item label="日期：">
          <el-date-picker
            v-model="filter.beginTime"
            type="date"
            placeholder="日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterData">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" @click="addTime">添加工作时间</el-button>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="doctorName" label="医生" />
        <el-table-column prop="updateTime" label="日期">
          <template #default="scope">
            <span>{{ formatDateTime(scope.row.updateTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="workTime" label="时间" />
        <el-table-column prop="status" label="发布状态">
          <template #default="scope">
            <span>{{ scope.row.status ? "已发布" : "未发布" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleDate(scope.row)"
              >调整时间</el-button
            >
            <el-button type="danger" size="small" @click="deleteDate(scope.row)"
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
    <add-time-form
      ref="addForm"
      :data="rowData"
      @submitForm="submitForm"
    ></add-time-form>
  </div>
</template>

<script lang="ts">
import api from "@/api";
import { formatDate } from "@/utils/formatTime";
import { Session } from "@/utils/session";
import { FormInstance } from "element-plus";
import { ElMessage } from "element-plus/lib/components";
import {
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import AddTimeForm from "./components/AddTimeForm.vue";
export default defineComponent({
  name: "DoctorTime",
  components: {
    AddTimeForm,
  },
  setup() {
    const addForm = ref<FormInstance>();
    const state = reactive({
      filter: {
        beginTime: "",
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      tableData: [],
      rowData: null,
      doctorId: Session.get("userInfo").id,
    });
    /**
     * @description 筛选时间
     */
    const filterData = () => {
      getWorkTime();
    };
    /**
     * @description 添加工作时间弹窗
     */
    const addTime = async () => {
      state.rowData = null;
      (addForm.value as any).open();
    };

    /**
     * @description 添加时间
     */
    const submitForm = (data: any) => {
      let { isEdit, form } = data;
      if (isEdit) {
        editTimeForm(form);
      } else {
        addTimeForm(form);
      }
    };
    /**
     * @description 添加工作时间
     */
    const addTimeForm = async (form: object) => {
      const params = {
        doctorId: state.doctorId,
        ...form,
      };
      try {
        const response = await api.doctor.apiAddWorkTime(params);
        if (response.data.code === 200) {
          ElMessage.success("添加成功!");
          (addForm.value as any).close();
          getWorkTime();
        } else {
          ElMessage.error(response.data.msg);
          (addForm.value as any).close();
        }
      } catch (error: any) {
        ElMessage.error(error);
        (addForm.value as any).close();
      }
    };
    /**
     * @description 修改工作时间
     */
    const editTimeForm = async (form: object) => {
      let { updateTime, workTime, id } = form as any;
      const params = {
        updateTime,
        workTime,
        id,
      };
      try {
        const response = await api.doctor.apiEditWorkTime(params);
        if (response.data.code === 200) {
          ElMessage.success("修改成功!");
          (addForm.value as any).close();
          getWorkTime();
        } else {
          ElMessage.error(response.data.msg);
          (addForm.value as any).close();
        }
      } catch (error: any) {
        ElMessage.error(error);
        (addForm.value as any).close();
      }
    };
    /**
     * @description 获取工作时间
     */
    const getWorkTime = async () => {
      const params = {
        ...state.pageInfo,
        ...state.filter,
      };
      try {
        const response = await api.doctor.apiGetAllWorkTime(params);
        if (response.data.code === 200) {
          state.tableData = response.data.data.records;
          state.pageInfo.total = response.data.data.total;
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
    };
    /**
     * @description 调整时间
     */
    const handleDate = (row: any) => {
      state.rowData = Object.assign({}, row);
      (addForm.value as any).open();
    };
    /**
     * @description 确认发布
     */
    const deleteDate = async (row: any) => {
      try {
        const response = await api.doctor.apiDeleteWorkTime(row.id);
        if (response.data.code === 200) {
          ElMessage.success("删除成功！");
          getWorkTime();
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
    };
    const formatDateTime = (time: Date) => {
      return formatDate(new Date(time), "YYYY-mm-dd");
    };
    const handleCurrentChange = (page: number) => {
      state.pageInfo.currentPage = page;
      getWorkTime();
    };
    const handleSizeChange = (pageSize: number) => {
      state.pageInfo.pageSize = pageSize;
      state.pageInfo.currentPage = 1;
      getWorkTime();
    };
    onMounted(() => {
      getWorkTime();
    });
    return {
      ...toRefs(state),
      handleDate,
      handleCurrentChange,
      handleSizeChange,
      addTime,
      addForm,
      submitForm,
      filterData,
      formatDateTime,
      deleteDate,
    };
  },
});
</script>

<style lang="scss" scoped>
.filter {
  margin-bottom: 20px;
}
</style>
