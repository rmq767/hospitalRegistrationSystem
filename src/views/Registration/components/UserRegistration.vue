<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span> {{ date }}</span>
        </div>
      </template>
      <el-descriptions :column="3" border>
        <el-descriptions-item label="我的姓名">{{ user }}</el-descriptions-item>
        <el-descriptions-item label="我的电话">{{
          phone
        }}</el-descriptions-item>
        <el-descriptions-item label="我的身份证号">{{
          id
        }}</el-descriptions-item>
        <el-descriptions-item label="预约医生">{{
          doctor
        }}</el-descriptions-item>
        <el-descriptions-item label="预约科室">
          <el-tag size="small">{{ department }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "UserRegistration",
  setup() {
    const state = reactive({
      date: "2021-12-29 上午",
      department: "儿科",
      doctor: "李主任",
      user: "小阮",
      phone: "15281223440",
      id: "123",
    });
    return { ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped></style>
