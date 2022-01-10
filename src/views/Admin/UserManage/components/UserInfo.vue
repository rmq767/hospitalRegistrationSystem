<template>
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle" center>
    <el-form :model="form" label-width="100px" ref="userFormEl" :rules="rules">
      <el-form-item label="患者姓名：" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="账号：" prop="account">
        <el-input v-model="form.account" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="身份证号：" prop="id">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="禁启用：" prop="status">
        <el-switch
          v-model="form.status"
          inline-prompt
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="启用"
          inactive-text="禁用"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="onSubmit(userFormEl)">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { ElForm } from "element-plus";
import { defineComponent, reactive, toRefs, watch } from "vue";
import formRules from "@/utils/rules/userManageRules";
interface Info {
  name: string;
  account: string;
}
export default defineComponent({
  name: "UserInfo",
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const state = reactive({
      dialogFormVisible: false,
      dialogTitle: "",
      isEdit: false,
      form: {
        name: "",
        account: "",
      },
      userFormEl: ElForm,
      rules: formRules,
    });
    const resetForm = () => {
      close();
    };
    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          console.log(state.form);
          state.userFormEl.resetFields();
          close();
        } else {
          return false;
        }
      });
    };
    const open = () => {
      state.dialogFormVisible = true;
    };
    const close = () => {
      state.dialogFormVisible = false;
      state.userFormEl.resetFields();
    };
    watch(
      () => props.info,
      (newValue) => {
        if (newValue) {
          state.dialogTitle = "编辑患者信息";
          state.isEdit = true;
          state.form = newValue as Info;
        } else {
          state.dialogTitle = "新增患者信息";
          state.isEdit = false;
          state.form = {
            name: "",
            account: "",
          };
        }
      }
    );
    return { ...toRefs(state), resetForm, onSubmit, open, close };
  },
});
</script>

<style lang="scss" scoped></style>
