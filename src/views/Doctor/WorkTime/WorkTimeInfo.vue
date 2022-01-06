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
        <el-table-column prop="name" label="患者姓名" />
        <el-table-column prop="date" label="就诊时间"> </el-table-column>
        <el-table-column prop="phone" label="联系方式" />
        <el-table-column prop="desc" label="专家简介" />
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
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { useRoute } from "vue-router";
import { formatDate } from "@/utils/formatTime";
import Pagination from "@/components/Pagination.vue";
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
      tableData: [
        {
          name: "吕亚洲",
          date: "2016-05-03",
          phone: "123",
          desc: "从事儿科重症工作10余年，先后到重庆医科大学、北京儿童医院学习、进修，擅长儿科呼吸系统、神经系统、消化系统及危重疑难疾病的诊治。发表国·家级论文十余篇，出版专著一部 ",
        },
        {
          name: "杜清勉",
          date: "2016-05-03",
          phone: "1234",
          desc: "1985年7月毕业于河南医科大学医疗系，从事儿童临床工作35年，2006年晋升为儿科主任医师。曾在天津市儿童医院进修学习一年，在省级、国·家级及核心期刊发表医学论文20篇，获市级科技进步二等奖八项，三等奖两项，著书一部。擅长儿童呼吸（长期发热、咳嗽、气喘等）、肾病综合征、过敏性紫癜、内分泌、血液、神经及小儿腹痛、腹泻、厌食等的治疗 ",
        },
        {
          name: "高华",
          date: "2016-05-03",
          phone: "12367",
          desc: "擅长治疗儿童常见病多发病。尤其对儿童各种类型癫痫，抽动障碍，发育迟缓，各种脑损伤（新生儿缺血缺氧性脑病，早产低体重，头外伤，各种脑炎）的评估与干预指导，遗传代谢病，反复呼吸道感染，慢性咳嗽，儿童支气管哮喘有比较深入的研究。",
        },
      ],
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
