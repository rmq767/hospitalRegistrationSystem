<template>
  <el-table
    :data="tableData"
    :span-method="objectSpanMethod"
    border
    style="width: 100%; margin-top: 20px"
  >
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="time" label="时间" width="100" />
    <el-table-column prop="Monday" label="星期一" />
    <el-table-column prop="Tuesday" label="星期二" />
    <el-table-column prop="Wednesday" label="星期三" />
    <el-table-column prop="Thursday" label="星期四" />
    <el-table-column prop="Friday" label="星期五" />
    <el-table-column prop="Saturday" label="星期六" />
    <el-table-column prop="Sunday" label="星期日" />
  </el-table>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
interface SpanMethodProps {
  row: User;
  column: TableColumnCtx<User>;
  rowIndex: number;
  columnIndex: number;
}
interface User {
  name: string;
  time: string;
  Monday: string;
  Tuesday: number;
  Wednesday: number;
  Thursday: number;
  Friday: number;
  Saturday: number;
  Sunday: number;
}
export default defineComponent({
  name: "WorkTimeTable",
  setup() {
    const state = reactive({
      tableData: [
        {
          name: "王仙芝",
          time: "上午",
          Monday: "剩余20号",
          Tuesday: "剩余10号",
          Wednesday: "无排班",
          Thursday: "剩余20号",
          Friday: "剩余20号",
          Saturday: "无排班",
          Sunday: "无排班",
        },
        {
          name: "王仙芝",
          time: "下午",
          Monday: "剩余32号",
          Tuesday: "剩余1号",
          Wednesday: "无排班",
          Thursday: "剩余20号",
          Friday: "剩余20号",
          Saturday: "无排班",
          Sunday: "无排班",
        },
      ],
    });
    const objectSpanMethod = ({
      row,
      column,
      rowIndex,
      columnIndex,
    }: SpanMethodProps) => {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    };
    return { ...toRefs(state), objectSpanMethod };
  },
});
</script>

<style lang="scss" scoped>
.el-table :deep(th.el-table__cell) {
  background-color: var(--el-color-primary);
  color: #fff;
}
::v-deep .el-table th.el-table__cell {
  background-color: var(--el-color-primary);
}
</style>
