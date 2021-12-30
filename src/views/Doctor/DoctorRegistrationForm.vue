<template>
  <el-card class="registration-form">
    <el-form
      :model="userForm"
      :label-width="120"
      :rules="formRules"
      ref="formEl"
    >
      <el-form-item label="专家名称：">
        <p>{{ doctorInfo.name }}</p>
      </el-form-item>
      <el-form-item label="出诊时间：">
        <p v-for="(date, index) in doctorInfo.date" :key="index">
          {{ date }} --- 总号数：{{ doctorInfo.allNumber[index] }} ---
          剩余号数：{{ doctorInfo.remainNumber[index] }}
        </p>
      </el-form-item>
      <el-form-item label="专家简介：">
        <p>{{ doctorInfo.desc }}</p>
      </el-form-item>
      <el-form-item label="真实姓名：" prop="name">
        <el-input
          v-model="userForm.name"
          placeholder="请输入真实姓名"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证号：" prop="id">
        <el-input
          v-model="userForm.id"
          placeholder="请输入身份证号码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="预约时间：" prop="date">
        <el-select
          v-model="userForm.date"
          placeholder="请选择预约时间"
          clearable
        >
          <el-option label="Zone No.1" value="shanghai"></el-option>
          <el-option label="Zone No.2" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import formRules from "./formRules";
export default defineComponent({
  name: "DoctorRegistrationForm",
  setup() {
    const formEl = ref();
    const state = reactive({
      doctorInfo: {
        name: "吕亚洲",
        date: ["2016-05-03", "2016-05-03", "2016-05-03"],
        allNumber: [100, 100, 100],
        remainNumber: [20, 10, 50],
        desc: "从事儿科重症工作10余年，先后到重庆医科大学、北京儿童医院学习、进修，擅长儿科呼吸系统、神经系统、消化系统及危重疑难疾病的诊治。发表国·家级论文十余篇，出版专著一部 ",
      },
      userForm: {
        name: "",
        id: "",
        date: "",
      },
      formRules: formRules,
    });
    /**
     * @description 提交表单
     */
    const onSubmit = () => {
      formEl.value.validate((valid: boolean) => {
        if (valid) {
          console.log(state.userForm);
        } else {
          return false;
        }
      });
    };
    /**
     * @description 清空表单
     */
    const resetForm = () => {
      formEl.value.resetFields();
    };
    return { ...toRefs(state), onSubmit, resetForm, formEl };
  },
});
</script>

<style lang="scss" scoped>
.registration-form {
  height: 90vh;
}
</style>
