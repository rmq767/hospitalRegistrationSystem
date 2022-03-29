<template>
  <div>
    <el-card class="filter">
      <el-form :inline="true" :model="filter">
        <el-form-item label="日期：">
          <el-date-picker
            v-model="filter.startTime"
            type="date"
            placeholder="起始日期"
          >
          </el-date-picker>
          <span> - </span>
          <el-date-picker
            v-model="filter.endTime"
            type="date"
            placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="工作时间"> </el-table-column>
        <el-table-column prop="number" label="已预约数" />
        <el-table-column prop="otherNumber" label="剩余数" />
        <el-table-column prop="allNumber" label="总数" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="warning"
              size="small"
              @click="handleDate(scope.row)"
              >调整时间</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="confirmDate(scope.row)"
              >确认发布</el-button
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
import { formatDate } from "@/utils/formatTime";
import { Session } from "@/utils/session";
import { ElMessage } from "element-plus/lib/components";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  name: "WorkTimeToAdjust",
  setup() {
    const state = reactive({
      filter: {
        startTime: "",
        endTime: "",
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      tableData: [
        {
          date: "13",
          number: 14,
          otherNumber: 4,
          allNumber: 18,
        },
      ],
    });
    /**
     * @description 获取工作时间
     */
    const getWorkTime = async () => {
      const params = {
        workerScheduleId: Session.get("userInfo").id,
      };
      try {
        const response = await api.doctor.apiGetWorkTime(params);
        if (response.data.code === 200) {
          console.log(response);
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
    };
    /**
     * @description 获取今天日期或者日历跳转日期
     */
    const getDay = () => {
      let toDay = formatDate(new Date(), "YYYY-mm-dd");
      state.filter.startTime = toDay;
    };
    /**
     * @description 调整时间
     */
    const handleDate = (row: any) => {
      console.log(row);
    };
    /**
     * @description 确认发布
     */
    const confirmDate = (row: any) => {
      console.log(row);
    };
    const handleCurrentChange = (page: number) => {
      state.pageInfo.currentPage = page;
    };
    const handleSizeChange = (pageSize: number) => {
      state.pageInfo.pageSize = pageSize;
      state.pageInfo.currentPage = 1;
    };
    onMounted(() => {
      getDay();
      getWorkTime();
    });
    return {
      ...toRefs(state),
      handleDate,
      confirmDate,
      handleCurrentChange,
      handleSizeChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.filter {
  margin-bottom: 20px;
}
</style>
