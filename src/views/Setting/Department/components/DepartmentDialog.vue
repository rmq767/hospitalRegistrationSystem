<template>
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle" center>
    <el-form
      :model="form"
      label-width="100px"
      ref="departmentFormEl"
      :rules="rules"
    >
      <el-form-item label="科室名称：" prop="department">
        <el-input v-model="form.department"></el-input>
      </el-form-item>
      <el-form-item label="简介：" prop="desc">
        <el-input v-model="form.desc"></el-input>
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
  department: string;
  desc: string;
}
export default defineComponent({
  name: "DepartmentDialog",
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
      form: {
        department: "",
        desc: "",
      },
      departmentFormEl: ElForm,
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
        } else {
          state.dialogTitle = "新增科室信息";
          state.form = {
            department: "",
            desc: "",
          };
        }
      }
      // {
      //   immediate: true,
      //   deep: true,
      // }
    );
    // onMounted(() => {
    //   state.form = (props.info as Info)
    //     ? (props.info as Info)
    //     : {
    //         name: "",
    //         age: 18,
    //         account: "",
    //       };
    //   console.log(state.form);
    // });
    return { ...toRefs(state), resetForm, onSubmit, open, close };
  },
});
</script>

<style lang="scss" scoped></style>
