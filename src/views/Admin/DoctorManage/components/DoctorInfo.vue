<template>
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle" center>
    <el-form
      :model="form"
      label-width="100px"
      ref="doctorFormEl"
      :rules="rules"
    >
      <el-form-item label="医生图片：" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><elementPlus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="form.password"></el-input>
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
      <el-form-item label="性别：" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio :label="0"> 女 </el-radio>
          <el-radio :label="1"> 男 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="级别：" prop="doctorRank">
        <el-select v-model="form.doctorRank">
          <el-option
            v-for="item in rank"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="毕业院校" prop="graduateInstitutions">
        <el-input v-model="form.graduateInstitutions"></el-input>
      </el-form-item>
      <el-form-item label="工作年限：" prop="workTime">
        <el-input-number
          v-model="form.workTime"
          :min="1"
          :max="100"
          :step="1"
          :controls="false"
        >
        </el-input-number>
      </el-form-item>
      <el-form-item label="联系电话：" prop="phoneNumber">
        <el-input v-model="form.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="简介：" prop="introduction">
        <el-input
          type="textarea"
          :rows="2"
          v-model="form.introduction"
        ></el-input>
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
import mixin from "@/mixin";
import { defineComponent, reactive, toRefs, watch } from "vue";
import formRules from "@/utils/rules/doctorManageRules";
export default defineComponent({
  name: "DoctorInfo",
  mixins: [mixin],
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
      isEdit: false,
      form: {},
      doctorFormEl: ElForm,
      rules: formRules,
      rank: ["普通医生", "专家", "主任"],
    });
    const resetForm = () => {
      close();
    };
    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          emit("submitForm", { isEdit: state.isEdit, form: state.form });
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
          state.form = newValue;
        } else {
          state.dialogTitle = "新增医生信息";
          state.isEdit = false;
          state.form = {};
        }
      }
      // {
      //   immediate: true,
      //   deep: true,
      // }
    );
    const handleAvatarSuccess = () => {};
    // onMounted(() => {
    //   state.form = (props.info as Info)
    //     ? (props.info as Info)
    //     : {
    //         name: "",
    //         age: 18,
    //         username: "",
    //       };
    //   console.log(state.form);
    // });
    return {
      ...toRefs(state),
      resetForm,
      onSubmit,
      open,
      close,
      handleAvatarSuccess,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
