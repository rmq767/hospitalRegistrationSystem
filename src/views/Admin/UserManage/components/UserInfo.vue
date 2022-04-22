<template>
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle" center>
    <el-form :model="form" label-width="100px" ref="userFormEl" :rules="rules">
      <el-form-item label="患者姓名：" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio :label="0"> 女 </el-radio>
          <el-radio :label="1"> 男 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号：" prop="phoneNumber">
        <el-input v-model="form.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="身份证号：" prop="identityCard">
        <el-input v-model="form.identityCard"></el-input>
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
  username: string;
  phoneNumber: number;
  id: number;
  status: number;
  gender: number;
  identityCard: string;
}
export default defineComponent({
  name: "UserInfo",
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["submitForm"],
  setup(props, { emit }) {
    const state = reactive({
      dialogFormVisible: false,
      dialogTitle: "新增患者信息",
      isEdit: false,
      form: {} as Info,
      userFormEl: ElForm,
      rules: formRules,
    });
    const resetForm = () => {
      close();
    };
    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          emit("submitForm", { isEdit: state.isEdit, form: state.form });
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
          state.form = {} as Info;
        }
      }
    );
    return { ...toRefs(state), resetForm, onSubmit, open, close };
  },
});
</script>

<style lang="scss" scoped></style>
