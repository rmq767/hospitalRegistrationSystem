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
      <el-form-item label="医生姓名：" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="form.username" :disabled="isEdit"></el-input>
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
import mixin from "@/mixin";
import { defineComponent, reactive, toRefs, watch } from "vue";
import formRules from "@/utils/rules/doctorManageRules";
interface Info {
  avatar: string;
  name: string;
  age: number;
  username: string;
}
export default defineComponent({
  name: "DoctorInfo",
  mixins: [mixin],
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
        avatar: "",
        name: "",
        age: 18,
        username: "",
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
          if (props.info) {
            // 编辑
          } else {
            // 新增
          }
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
            avatar: "",
            name: "",
            age: 18,
            username: "",
          };
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
  border: 1px dashed var(--el-border-color-base);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
}
.avatar-uploader-icon svg {
  margin-top: 45px; /* (120px - 28px) / 2 - 1px */
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
