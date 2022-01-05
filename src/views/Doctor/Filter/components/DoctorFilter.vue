<template>
  <div class="filter">
    <el-card>
      <el-form :inline="true" :model="state">
        <el-form-item label="医生名称：">
          <el-input
            v-model="state.doctorName"
            placeholder="请输入医生名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="科室：">
          <el-select v-model="state.department" placeholder="请选择科室">
            <el-option
              v-for="department in state.departmentOptions"
              :key="department"
              :label="department"
              :value="department"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, toRefs } from "vue";
export default defineComponent({
  name: "DoctorFilter",
  emits: ["change"],
  setup() {
    const { emit } = getCurrentInstance() as any;
    const state = reactive({
      doctorName: "",
      department: "",
      departmentOptions: [
        "儿科门诊",
        "儿童消化心血管科",
        "儿科中医门诊",
        "儿童康复科",
        "儿童肾病内分泌科",
        "儿童血液肿瘤科",
        "儿童呼吸科",
        "儿童神经内科",
        "儿童重症科",
        "妇科门诊",
        "妇一病房门诊",
        "妇二病房门诊",
        "妇科三区门诊",
        "妇科特需一病区门诊",
        "妇科特需二病区门诊",
        "高危门诊",
        "产前检查门诊",
        "生殖中心门诊",
        "针灸推拿科",
      ],
    });
    const onSubmit = () => {
      emit("change", {
        doctorName: state.doctorName,
        department: state.department,
      });
    };
    return { state, onSubmit };
  },
});
</script>

<style lang="scss" scoped>
.filter {
  margin-bottom: 20px;
  .name {
    display: inline-flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
}
</style>
