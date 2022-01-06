<template>
  <div>
    <el-form :model="doctorInfoForm" label-width="120px">
      <el-form-item label="医生图片：">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :disabled="!isDoctor"
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
        <el-input v-model="doctorInfoForm.name" v-if="isDoctor"></el-input>
        <p v-else>{{ doctorInfoForm.name }}</p>
      </el-form-item>
      <el-form-item label="工作年限：">
        <el-input-number
          v-model="doctorInfoForm.yearsWork"
          :min="0"
          :max="100"
          size="large"
          :controls="false"
          v-if="isDoctor"
        ></el-input-number>
        <p v-else>{{ doctorInfoForm.yearsWork }}</p>
      </el-form-item>
      <el-form-item label="毕业院校：">
        <el-input
          v-model="doctorInfoForm.graduateSchool"
          v-if="isDoctor"
        ></el-input>
        <p v-else>{{ doctorInfoForm.graduateSchool }}</p>
      </el-form-item>
      <el-form-item label="专业方向：">
        <el-input
          v-model="doctorInfoForm.professionalDirection"
          v-if="isDoctor"
        ></el-input>
        <p v-else>{{ doctorInfoForm.professionalDirection }}</p>
      </el-form-item>
      <el-form-item label="所属科室：">
        <el-input
          v-model="doctorInfoForm.department"
          v-if="isDoctor"
        ></el-input>
        <p v-else>{{ doctorInfoForm.department }}</p>
      </el-form-item>
      <el-form-item label="个人简介：">
        <el-input
          type="textarea"
          :rows="4"
          v-model="doctorInfoForm.desc"
          v-if="isDoctor"
        ></el-input>
        <p v-else>{{ doctorInfoForm.desc }}</p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-if="isDoctor"
          >修改信息</el-button
        >
        <el-button type="primary" v-if="!isDoctor">去预约</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import mixin from "@/mixin";
import { Session } from "@/utils/session";
export default defineComponent({
  name: "DoctorInfo",
  mixins: [mixin],
  setup() {
    const state = reactive({
      doctorInfoForm: {
        avatar:
          "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        name: "王仙芝",
        yearsWork: 15,
        graduateSchool: "四川大学",
        professionalDirection: "儿科",
        department: "儿科",
        desc: "从事儿科重症工作10余年，先后到重庆医科大学、北京儿童医院学习、进修，擅长儿科呼吸系统、神经系统、消化系统及危重疑难疾病的诊治。发表国·家级论文十余篇，出版专著一部",
      },
    });
    // const role = ref(Session.get("userInfo"));

    const isDoctor = computed(() => {
      const role = Session.get("userInfo").roles[0];
      return role === "doctor";
    });

    const handleAvatarSuccess = () => {};
    const onSubmit = () => {};
    return { ...toRefs(state), handleAvatarSuccess, onSubmit, isDoctor };
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
