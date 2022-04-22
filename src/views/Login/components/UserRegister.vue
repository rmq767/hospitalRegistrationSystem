<template>
  <el-form
    class="login-content-form"
    :model="ruleForm"
    :rules="rules"
    ref="ruleFormRef"
  >
    <el-form-item prop="username">
      <el-input
        type="text"
        placeholder="姓名"
        v-model="ruleForm.username"
        clearable
        autocomplete="off"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><elementUser /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="identityCard">
      <el-input
        placeholder="身份证号"
        v-model="ruleForm.identityCard"
        autocomplete="off"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><elementUnlock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="phoneNumber">
      <el-input
        placeholder="手机号"
        v-model="ruleForm.phoneNumber"
        autocomplete="off"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><elementPhone /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="性别" prop="gender">
      <el-select v-model="ruleForm.gender" placeholder="性别">
        <el-option label="女" value="0" />
        <el-option label="男" value="1" />
        <el-option label="保密" value="2" />
      </el-select>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        placeholder="密码"
        v-model="ruleForm.password"
        autocomplete="off"
        type="password"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><elementUnlock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="passwordAgain">
      <el-input
        placeholder="确认密码"
        v-model="ruleForm.passwordAgain"
        autocomplete="off"
        type="password"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><elementUnlock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <!-- <el-form-item prop="code">
      <el-row :gutter="15">
        <el-col :span="16">
          <el-input
            type="text"
            maxlength="4"
            placeholder="请输入验证码"
            v-model="ruleForm.code"
            clearable
            autocomplete="off"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><elementPosition /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-content-code">
            <VerifyCode :identifyCode="ruleForm.code"></VerifyCode>
          </div>
        </el-col>
      </el-row>
    </el-form-item> -->
    <el-form-item>
      <el-button
        type="primary"
        class="login-content-submit"
        round
        @click="onSignIn(ruleFormRef)"
      >
        <span>注 册</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { ElDialog, ElMessage, FormInstance } from "element-plus";
import { defineComponent, reactive, ref, toRefs } from "vue";
import { userRegisterForm } from "@/utils/rules/formRulesRegister";
import api from "@/api/index";
export default defineComponent({
  name: "LoginUserRegister",
  emits: ["success"],
  setup(props, { emit }) {
    const ruleFormRef = ref<FormInstance>();
    const state = reactive({
      isShowPassword: false,
      form: "",
      ruleForm: {
        username: "",
        identityCard: "",
        phoneNumber: "",
        password: "",
        passwordAgain: "",
        gender: "",
      },
    });
    const rules = userRegisterForm;
    const onSignIn = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate(async (valid, fields) => {
        if (valid) {
          const response = await api.user.apiUserRegister(state.ruleForm);
          if (response.data.code === 200) {
            ElMessage.success("注册成功！");
            ruleFormRef.value?.resetFields();
            emit("success");
          }
        } else {
        }
      });
    };
    return { ...toRefs(state), onSignIn, rules, ruleFormRef };
  },
});
</script>

<style lang="scss" scoped>
.login-content-form {
  margin-top: 20px;
  .login-content-password {
    display: inline-block;
    width: 25px;
    cursor: pointer;
    &:hover {
      color: #909399;
    }
  }
  .login-content-code {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .login-content-code-img {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-color: #ffffff;
      border: 1px solid rgb(220, 223, 230);
      color: #333;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 5px;
      text-indent: 5px;
      text-align: center;
      cursor: pointer;
      transition: all ease 0.2s;
      border-radius: 4px;
      user-select: none;
      &:hover {
        border-color: #c0c4cc;
        transition: all ease 0.2s;
      }
    }
  }
  .login-content-submit {
    width: 100%;
    letter-spacing: 2px;
    font-weight: 300;
    margin-top: 15px;
  }
}
</style>
