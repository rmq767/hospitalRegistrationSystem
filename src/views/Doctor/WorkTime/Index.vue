<template>
  <div>
    <el-calendar>
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
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "WorkTime",
  setup() {
    const router = useRouter();
    const state = reactive({
      date: [
        {
          time: "2022-01-05",
        },
        {
          time: "2022-01-06",
        },
      ],
    });
    /**
     * @description 筛选有工作时间的时期展示
     */
    const filterDate = (data: any) => {
      let result = state.date.find((date) => date.time === data.day);
      if (result) {
        return result.time;
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
    return { filterDate, toWorkInfo };
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
}
::v-deep .el-calendar-table .el-calendar-day {
  height: 120px;
}
</style>
