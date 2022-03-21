<template>
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle" center>
    <el-form
      :model="form"
      label-width="100px"
      ref="noticeFormEl"
      :rules="rules"
    >
      <el-form-item label="公告标题：" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="content">
        <el-input v-model="form.content"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="onSubmit(noticeFormEl)"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { ElForm } from "element-plus";
import { defineComponent, reactive, toRefs, watch } from "vue";
import formRules from "@/utils/rules/noticeManageRules";
interface Info {
  title: string;
  content: string;
}
export default defineComponent({
  name: "NoticeDialog",
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
        title: "",
        content: "",
      },
      noticeFormEl: ElForm,
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
          state.noticeFormEl.resetFields();
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
      state.noticeFormEl.resetFields();
    };
    watch(
      () => props.info,
      (newValue) => {
        if (newValue) {
          state.dialogTitle = "编辑公告信息";
          state.form = newValue as Info;
          state.isEdit = true;
        } else {
          state.dialogTitle = "新增公告信息";
          state.form = {
            title: "",
            content: "",
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
