<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span> {{ info.date }}</span>
      </div>
    </template>
    <el-descriptions :column="3" border>
      <el-descriptions-item label="我的姓名">{{
        info.name
      }}</el-descriptions-item>
      <el-descriptions-item label="我的电话">{{
        info.phone
      }}</el-descriptions-item>
      <el-descriptions-item label="我的身份证号">{{
        info.id
      }}</el-descriptions-item>
      <el-descriptions-item label="预约医生">{{
        info.doctor
      }}</el-descriptions-item>
      <el-descriptions-item label="预约科室">
        <el-tag size="small">{{ info.department }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, PropType } from "vue";
import User from "@/utils/interface/user";
export default defineComponent({
  name: "UserRegistrationInfo",
  props: {
    info: {
      type: Object as PropType<User>,
      default: () => {},
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
