<template>
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle" center>
    <el-form
      :model="form"
      label-width="100px"
      ref="doctorFormEl"
      :rules="rules"
    >
      <el-form-item label="医生姓名：" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="账号：" prop="account">
        <el-input v-model="form.account" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="年龄：" prop="age">
        <el-input-number
          v-model="form.age"
          :min="1"
          :max="100"
          :step="1"
          :controls="false"
        >
        </el-input-number>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="onSubmit(doctorFormEl)"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { ElForm } from "element-plus";
import { defineComponent, reactive, toRefs, watch } from "vue";
import formRules from "@/utils/rules/doctorManageRules";
interface Info {
  name: string;
  age: number;
  account: string;
}
export default defineComponent({
  name: "DoctorInfo",
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
        age: 18,
        account: "",
      },
      doctorFormEl: ElForm,
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
          state.doctorFormEl.resetFields();
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
      state.doctorFormEl.resetFields();
    };
    watch(
      () => props.info,
      (newValue) => {
        if (newValue) {
          state.dialogTitle = "编辑医生信息";
          state.isEdit = true;
          state.form = newValue as Info;
        } else {
          state.dialogTitle = "新增医生信息";
          state.isEdit = false;
          state.form = {
            name: "",
            age: 18,
            account: "",
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
