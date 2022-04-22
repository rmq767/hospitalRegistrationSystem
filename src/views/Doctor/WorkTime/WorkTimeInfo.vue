<template>
  <div>
    <el-card class="panel">
      <el-row :gutter="25">
        <el-col :span="5"
          ><div class="panel-item">
            <span class="title">已预约数</span>
            <span class="count success">{{
              statistics.hasSubNumber || 0
            }}</span>
          </div></el-col
        >
        <el-col :span="5"
          ><div class="panel-item">
            <span class="title">剩余预约数</span>
            <span class="count warning">{{ statistics.noSubNumber || 0 }}</span>
          </div></el-col
        >
        <el-col :span="5"
          ><div class="panel-item">
            <span class="title">总预约数</span>
            <span class="count primary">{{
              statistics.allSubNumber || 0
            }}</span>
          </div></el-col
        >
        <el-col :span="5"
          ><div class="panel-item">
            <span class="title">已就诊数</span>
            <span class="count info">{{ statistics.hasSawNumber || 0 }}</span>
          </div></el-col
        >
        <el-col :span="4"
          ><div class="panel-item">
            <span class="title">未就诊数</span>
            <span class="count danger">{{ statistics.noSawNumber || 0 }}</span>
          </div></el-col
        >
      </el-row>
    </el-card>

    <el-card class="filter">
      <el-form :inline="true" :model="filter" ref="ruleFormRef">
        <el-form-item label="日期：">
          <el-date-picker
            v-model="filter.seeTime"
            type="date"
            placeholder="起始日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="患者姓名：" prop="userName">
          <el-input v-model="filter.userName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="就诊类型：">
          <el-select v-model="filter.type">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
          <el-button @click="onReset(ruleFormRef)">重置</el-button>
        </el-form-item>
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
              v-if="!scope.row.sawStatus"
              type="primary"
              size="small"
              @click="finishSeeDoctor(scope.row)"
              >就诊完成</el-button
            >
            <el-tag>就诊完成</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!-- <Pagination
        :currentPage="pageInfo.currentPage"
        :pageSize="pageInfo.pageSize"
        :total="pageInfo.total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></Pagination> -->
    </el-card>
  </div>
</template>

<script lang="ts">
import api from "@/api";
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { useRoute } from "vue-router";
import { formatDate } from "@/utils/formatTime";
import Pagination from "@/components/Pagination.vue";
import { ElMessage, FormInstance } from "element-plus/lib/components";
import { Session } from "@/utils/session";
export default defineComponent({
  components: { Pagination },
  name: "WorkTimeInfo",
  setup() {
    const route = useRoute();
    const queryDay = ref();
    const ruleFormRef = ref<FormInstance>();
    const state = reactive({
      filter: {
        userName: "",
        seeTime: "",
      },
      // pageInfo: {
      //   currentPage: 1,
      //   pageSize: 10,
      //   total: 0,
      // },
      tableData: [],
      typeOptions: [
        {
          label: "全部",
          value: "0",
        },
        {
          label: "未就诊",
          value: "1",
        },
        {
          label: "已就诊",
          value: "2",
        },
      ],
      statistics: {},
    });
    /**
     * @description 获取看板
     */
    const getStatistics = async () => {
      const params = {
        doctorId: Session.get("userInfo").id,
        updateTime: state.filter.seeTime,
      };
      try {
        const response = await api.doctor.apiGetStatistics(params);
        if (response.data.code) {
          state.statistics = response.data.data;
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
    };
    /**
     * @description 获取病人列表
     */
    const getUserList = async () => {
      const params = {
        doctorId: Session.get("userInfo").id,
        // ...state.pageInfo,
        ...state.filter,
      };
      try {
        const response = await api.user.apiGetUserSubscribe(params);
        if (response.data.code === 200) {
          state.tableData = response.data.data;
          // state.pageInfo.total = response.data.data.total;
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
      state.filter.seeTime = queryDay.value;
    };
    /**
     * @description 就诊完成
     */
    const finishSeeDoctor = async (row: any) => {
      const params = {
        id: row.subId,
        sawDoctorId: Session.get("userInfo").id,
      };
      try {
        const response = await api.doctor.apiFinishSaw(params);
        if (response.data.code === 200) {
          ElMessage.success("就诊完成！");
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
    };
    /**
     * @description 筛选
     */
    const onSubmit = () => {
      getUserList();
      getStatistics();
    };
    /**
     * @description 重置
     */
    const onReset = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
      getUserList();
    };
    // const handleCurrentChange = (page: number) => {
    //   state.pageInfo.currentPage = page;
    //   getUserList();
    // };
    // const handleSizeChange = (pageSize: number) => {
    //   state.pageInfo.pageSize = pageSize;
    //   state.pageInfo.currentPage = 1;
    //   getUserList();
    // };
    onMounted(() => {
      getDay();
      getUserList();
      getStatistics();
    });
    return {
      ...toRefs(state),
      finishSeeDoctor,
      // handleCurrentChange,
      // handleSizeChange,
      onSubmit,
      onReset,
      ruleFormRef,
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
    .info {
      color: var(--el-color-info);
    }
    .danger {
      color: var(--el-color-danger);
    }
  }
}
</style>
