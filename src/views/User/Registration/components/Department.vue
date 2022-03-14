<template>
  <div class="filter">
    <el-card>
      <el-form :model="form" label-width="100px" :inline="false">
        <el-form-item label="预约科室：">
          <el-radio-group v-model="form.department" @change="changeDepartment">
            <el-radio
              v-for="item in departmentOptions"
              :key="item"
              :label="item"
              >{{ item }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="预约时间：">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="请选择预约时间"
            :disabled-date="disabledDate"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, toRefs } from "vue";
export default defineComponent({
  name: "Department",
  emits: ["change"],
  setup(props, { emit }) {
    const state = reactive({
      form: {
        department: "",
        date: "",
      },
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
    const changeDepartment = (value: string) => {
      emit("change", value);
    };
    const disabledDate = (time: Date) => {
      return time.getTime() < Date.now();
    };
    return { ...toRefs(state), changeDepartment, disabledDate };
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
