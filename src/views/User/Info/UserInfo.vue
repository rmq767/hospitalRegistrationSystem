<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form :model="userInfoForm" label-width="120px">
          <el-form-item label="姓名：">
            <el-input v-model="userInfoForm.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input v-model="userInfoForm.id"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="userInfoForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="年龄：">
            <el-input-number
              v-model="userInfoForm.years"
              :min="0"
              :max="100"
              size="large"
              :controls="false"
            ></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12"> </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import UserRegistrationInfo from "./components/UserRegistrationInfo.vue";
import mixin from "@/mixin";
export default defineComponent({
  name: "UserInfo",
  components: {
    UserRegistrationInfo,
  },
  mixins: [mixin],
  setup() {
    const state = reactive({
      userInfoForm: {
        name: "王仙芝",
        years: 30,
        id: 123,
        phone: 456,
      },
    });

    const onSubmit = () => {};
    return { ...toRefs(state), onSubmit };
  },
});
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
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
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader-icon svg {
  margin-top: 74px; /* (178px - 28px) / 2 - 1px */
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
