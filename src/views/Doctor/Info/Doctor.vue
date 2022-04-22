<template>
  <div class="doctor-info">
    <el-form
      :model="userForm"
      label-width="120px"
      :rules="formRule"
      ref="ruleFormRef"
    >
      <el-form-item label="医生图片：">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="doctorInfoForm.avatar"
            :src="doctorInfoForm.avatar"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><elementPlus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="医生姓名：">
        <el-input v-model="doctorInfoForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="doctorInfoForm.password"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：">
        <el-input v-model="doctorInfoForm.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="工作年限：">
        <p>{{ doctorInfoForm.workTime }}</p>
      </el-form-item>
      <el-form-item label="毕业院校：">
        <p>{{ doctorInfoForm.graduateInstitutions }}</p>
      </el-form-item>
      <el-form-item label="所属科室：">
        <p>{{ doctorInfoForm.administrativeName }}</p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editForm">修改信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import mixin from "@/mixin";
import { Session } from "@/utils/session";
import formRules from "@/utils/rules/formRulesRegistration";
import { useRoute, useRouter } from "vue-router";
import WorkTimeTable from "@/components/WorkTimeTable.vue";
import api from "@/api";
import { ElMessage } from "element-plus/lib/components";
export default defineComponent({
  name: "DoctorInfo",
  components: {
    WorkTimeTable,
  },
  mixins: [mixin],
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      doctorInfoForm: {
        id: "",
      },
    });
    const formRule = formRules;
    /**
     * @description 获取医生详情
     */
    const getDoctorDetail = async () => {
      if (route.params.id) {
        const response = await api.doctor.apiGetDoctorByID(
          route.params.id as string
        );
        state.doctorInfoForm = response.data.data;
      }
    };

    const handleAvatarSuccess = () => {};

    /**
     * @description 编辑信息
     */
    const editForm = async () => {
      const response = await api.doctor.apiEditDoctor(state.doctorInfoForm);
      if (response.data.code === 200) {
        ElMessage.success("修改成功！");
        getDoctorDetail();
      }
    };
    onMounted(() => {
      getDoctorDetail();
    });
    return {
      ...toRefs(state),
      handleAvatarSuccess,
      editForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.doctor-info {
  padding: 20px;
}
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}
:deep(.avatar-uploader-icon) {
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
