<template>
  <el-form class="login-content-form">
    <el-form-item>
      <el-radio-group v-model="ruleForm.role">
        <el-radio
          v-for="item in typeOption"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <el-input
        type="text"
        placeholder="请输入账号"
        v-model="ruleForm.username"
        clearable
        autocomplete="off"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><elementUser /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        :type="isShowPassword ? 'text' : 'password'"
        placeholder="请输入密码"
        v-model="ruleForm.password"
        autocomplete="off"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><elementUnlock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        class="login-content-submit"
        round
        @click="onSignIn"
        :loading="loading.signIn"
      >
        <span>登 录</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Session } from "@/utils/session";
import { defineComponent, getCurrentInstance, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { initFrontEndControlRoutes } from "@/router/frond";
import api from "@/api/index";
export default defineComponent({
  name: "LoginUser",
  setup() {
    const { proxy } = getCurrentInstance() as any;
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      isShowPassword: false,
      ruleForm: {
        username: "admin",
        password: "123456",
        role: "user",
      },
      typeOption: [
        {
          label: "用户",
          value: "user",
        },
        {
          label: "医生",
          value: "doctor",
        },
        {
          label: "管理员",
          value: "admin",
        },
      ],
      loading: {
        signIn: false,
      },
    });
    const onSignIn = async () => {
      const response = await api.login.apiAdminLogin(state.ruleForm);
      if (response.data.code === 200) {
        let admin = ["doctor", "admin"];
        let user = ["user"];
        let info = {
          roles: state.ruleForm.role,
          username: response.data.data.username,
        };
        if (admin.includes(state.ruleForm.role)) {
          Session.set("token", response.data.data.token);
          Session.set("userInfo", info);
          /**
           * @description 添加动态路由
           */
          await initFrontEndControlRoutes();
          router.push("/adminhome");
          ElMessage.success("登录成功！");
        } else if (user.includes(state.ruleForm.role)) {
          Session.set("userInfo", info);
          router.push("/");
          ElMessage.success("登录成功！");
        }
      } else {
        ElMessage.error("登录失败！");
      }
    };
    return { ...toRefs(state), onSignIn };
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
