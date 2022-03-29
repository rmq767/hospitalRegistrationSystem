<template>
  <div>
    <el-card class="panel">
      <el-row :gutter="20">
        <el-col :span="8"
          ><div class="panel-item">
            <span class="title">已预约数</span>
            <span class="count success">40</span>
          </div></el-col
        >
        <el-col :span="8"
          ><div class="panel-item">
            <span class="title">剩余预约数</span>
            <span class="count warning">20</span>
          </div></el-col
        >
        <el-col :span="8"
          ><div class="panel-item">
            <span class="title">总预约数</span>
            <span class="count primary">60</span>
          </div></el-col
        >
      </el-row>
    </el-card>

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
        <el-form-item label="患者姓名：">
          <el-input v-model="filter.userName"></el-input>
        </el-form-item>
        <el-form-item label="就诊类型：">
          <el-select v-model="filter.type">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item> -->
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="患者姓名" />
        <el-table-column prop="gender" label="性别">
          <template #default="scope">
            <span>{{ scope.row.gender ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNumber" label="手机号"> </el-table-column>
        <el-table-column prop="identityCard" label="身份证" />
        <el-table-column prop="number" label="预约排号" />
        <el-table-column prop="sawStatus" label="就诊状态">
          <template #default="scope">
            <span>{{ scope.row.sawStatus ? "就诊完成" : "未就诊" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="subscribeTime" label="预约时间" />
        <!-- <el-table-column prop="payStatus" label="支付状态">
          <template #default="scope">
            <span>{{ scope.row.payStatus ? "已支付" : "未支付" }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="finishSeeDoctor(scope.row)"
              >就诊完成</el-button
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
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { useRoute } from "vue-router";
import { formatDate } from "@/utils/formatTime";
import Pagination from "@/components/Pagination.vue";
import { ElMessage } from "element-plus/lib/components";
export default defineComponent({
  components: { Pagination },
  name: "WorkTimeInfo",
  setup() {
    const route = useRoute();
    const queryDay = ref();
    const state = reactive({
      filter: {
        startTime: "",
        endTime: "",
        userName: "",
        type: "0",
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      tableData: [],
      typeOptions: [
        {
          label: "未就诊",
          value: "0",
        },
        {
          label: "已就诊",
          value: "1",
        },
        {
          label: "全部",
          value: "2",
        },
      ],
    });

    /**
     * @description 获取病人列表
     */
    const getUserList = async () => {
      const params = {
        ...state.pageInfo,
      };
      try {
        const response = await api.user.apiGetUserList(params);
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
     * @description 获取今天日期或者日历跳转日期
     */
    const getDay = () => {
      let toDay = formatDate(new Date(), "YYYY-mm-dd");
      queryDay.value = route.query.day ? route.query.day : toDay;
      state.filter.startTime = queryDay.value;
    };
    /**
     * @description 就诊完成
     */
    const finishSeeDoctor = (row: any) => {
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
      getUserList();
    });
    return {
      ...toRefs(state),
      finishSeeDoctor,
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
.panel {
  margin-bottom: 20px;
  .panel-item {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title {
      font-size: 16px;
      margin-bottom: 10px;
    }
    .count {
      font-size: 30px;
      font-weight: bold;
    }
    .primary {
      color: var(--el-color-primary);
    }
    .success {
      color: var(--el-color-success);
    }
    .warning {
      color: var(--el-color-warning);
    }
  }
}
</style>
