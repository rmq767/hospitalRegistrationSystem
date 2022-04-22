<template>
  <div>
    <el-calendar ref="calendar">
      <template #header="{ date }">
        <span>{{ date }}</span>
        <el-button-group>
          <el-button size="small" @click="selectDate('prev-month')"
            >上个月</el-button
          >
          <el-button size="small" @click="selectDate('today')">今天</el-button>
          <el-button size="small" @click="selectDate('next-month')"
            >下个月</el-button
          >
        </el-button-group>
      </template>
      <template #dateCell="{ data }">
        <div class="day" @click="toWorkInfo(data.day)">
          <span>
            {{ data.day.split("-").slice(1).join("-") }}
          </span>
          <p class="highlight">{{ filterDate(data) }}</p>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script lang="ts">
import api from "@/api";
import { Session } from "@/utils/session";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "WorkTime",
  setup() {
    const router = useRouter();
    const calendar = ref();
    const state = reactive({
      date: [],
      nowDate: "",
    });
    /**
     * @description 获取每月工作时间
     */
    const getMonthTime = async () => {
      const params = {
        doctorId: Session.get("userInfo").id,
        month: state.nowDate,
      };
      const response = await api.doctor.apiGetMonthTime(params);
      state.date = response.data.data;
    };
    const selectDate = (val: string) => {
      calendar.value.selectDate(val);
      state.nowDate = calendar.value.curMonthDatePrefix;
      getMonthTime();
    };
    /**
     * @description 筛选有工作时间的时期展示
     */
    const filterDate = (data: any) => {
      let result = state.date.find((date: any) => {
        let d = date.workTime.split(" ")[0] as string;
        return d === data.day;
      });
      if (result) {
        return (result as any).workTime;
      } else {
        return "";
      }
    };
    /**
     * @description
     */
    const toWorkInfo = (day: string) => {
      router.push({ name: "WorkTimeInfo", query: { day } });
    };
    onMounted(() => {
      state.nowDate = calendar.value.curMonthDatePrefix;
      getMonthTime();
    });
    return { filterDate, toWorkInfo, calendar, selectDate };
  },
});
</script>

<style lang="scss" scoped>
.day {
  width: 100%;
  height: 100%;
}
.highlight {
  margin: 5px;
  font-size: 18px;
  font-weight: bolder;
}
:deep(.el-calendar-table .el-calendar-day) {
  height: 120px;
}
</style>
