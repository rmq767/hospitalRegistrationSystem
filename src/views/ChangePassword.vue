<template>
  <div v-if="isLogin">
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
  <el-result icon="warning" title="您未登录" sub-title="请先登录查看" v-else>
    <template #extra>
      <el-button type="primary" @click="toPage">去登录</el-button>
    </template>
  </el-result>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import { isPassword } from "@/utils/validate";
import { Session } from "@/utils/session";
import { ElForm } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import api from "@/api";
import { ElMessage } from "element-plus/lib/components";
import store from "@/store";
export default defineComponent({
  name: "ChangePassword",
  setup() {
    const router = useRouter();
    const route = useRoute();
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
    /**
     * @description 修改密码
     */
    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          const params = {
            oldPassword: state.form.oldPassword,
            newPassword: state.form.newPassword,
            id: Session.get("userInfo").id,
          };
          try {
            const response = await api.user.apiChangePwd(params);
            if (response.data.code === 200) {
              ElMessage.success("修改成功！");
              formEl.resetFields();
              Session.clear();
              router.push({ name: "login" });
            } else {
              ElMessage.error(response.data.msg);
            }
          } catch (error: any) {
            ElMessage.error(error);
          }
        } else {
          return false;
        }
      });
    };
    const resetForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };
    const isLogin = computed(() => {
      return store.state.userInfos.roles === "user";
    });
    const toPage = () => {
      router.push("/login");
    };
    return {
      ...toRefs(state),
      rules,
      formEl,
      onSubmit,
      resetForm,
      isLogin,
      toPage,
    };
  },
});
</script>

<style lang="scss" scoped></style>
