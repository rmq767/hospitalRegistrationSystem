<template>
  <div>
    <el-form :model="form" ref="formEl" :rules="rules" label-width="120px">
      <el-form-item label="旧密码：" prop="oldPassword">
        <el-input
          type="password"
          show-password
          v-model="form.oldPassword"
        ></el-input>
      </el-form-item>
      <el-form-item type="password" label="新密码：" prop="newPassword">
        <el-input
          v-model="form.newPassword"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="againPassword">
        <el-input
          type="password"
          v-model="form.againPassword"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(formEl)">立即修改</el-button>
        <el-button @click="resetForm(formEl)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { isPassword } from "@/utils/validate";
import { ElForm } from "element-plus";
export default defineComponent({
  name: "ChangePassword",
  setup() {
    const formEl = ref<InstanceType<typeof ElForm>>();
    const state = reactive({
      form: {
        oldPassword: "",
        newPassword: "",
        againPassword: "",
      },
    });
    /**
     * @description 验证密码强度
     */
    const validatePassword = (rule: any, value: string, callback: Function) => {
      if (!isPassword(value)) {
        callback(
          new Error(
            "请输入6-16位大、小写字母、数字或特殊字符(!#*_)，必须至少包含其中2种类型"
          )
        );
      } else {
        callback();
      }
    };

    /**
     * @description 验证确认密码
     */
    const validateAgianPassword = (
      rule: any,
      value: string,
      callback: Function
    ) => {
      if (value !== state.form.newPassword) {
        callback(new Error("两次密码不一致！"));
      } else {
        callback();
      }
    };
    const rules = reactive({
      oldPassword: [
        { required: true, message: "请输入旧密码", trigger: "blur" },
      ],
      newPassword: [
        { required: true, message: "请输入新密码", trigger: "blur" },
        { validator: validatePassword, trigger: "blur" },
      ],
      againPassword: [
        { required: true, message: "请确认密码", trigger: "blur" },
        { validator: validateAgianPassword, trigger: "blur" },
      ],
    });

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      console.log(formEl);
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    const resetForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };
    return { ...toRefs(state), rules, formEl, onSubmit, resetForm };
  },
});
</script>

<style lang="scss" scoped></style>
