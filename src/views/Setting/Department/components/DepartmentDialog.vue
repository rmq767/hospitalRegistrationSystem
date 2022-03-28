<template>
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle" center>
    <el-form
      :model="form"
      label-width="100px"
      ref="departmentFormEl"
      :rules="rules"
    >
      <el-form-item label="科室名称：" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="科室编号：" prop="number">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="科室位置：" prop="location">
        <el-input v-model="form.location"></el-input>
      </el-form-item>
      <el-form-item label="简介：" prop="introduction">
        <el-input v-model="form.introduction"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="onSubmit(departmentFormEl)"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { ElForm } from "element-plus";
import { defineComponent, reactive, toRefs, watch } from "vue";
import formRules from "@/utils/rules/departmentManageRules";
interface Info {
  name: string;
  introduction: string;
  number: string;
  location: string;
}
export default defineComponent({
  name: "DepartmentDialog",
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
      dialogTitle: "",
      form: {
        name: "",
        introduction: "",
        number: "",
        location: "",
      },
      departmentFormEl: ElForm,
      rules: formRules,
      isEdit: false,
    });
    const resetForm = () => {
      close();
    };
    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          emit("submitForm", { form: state.form, isEdit: state.isEdit });
          state.departmentFormEl.resetFields();
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
      state.departmentFormEl.resetFields();
    };
    watch(
      () => props.info,
      (newValue) => {
        if (newValue) {
          state.dialogTitle = "编辑科室信息";
          state.form = newValue as Info;
          state.isEdit = true;
        } else {
          state.dialogTitle = "新增科室信息";
          state.form = {
            name: "",
            introduction: "",
            number: "",
            location: "",
          };
          state.isEdit = false;
        }
      }
    );
    return { ...toRefs(state), resetForm, onSubmit, open, close };
  },
});
</script>

<style lang="scss" scoped></style>
