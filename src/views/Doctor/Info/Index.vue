<template>
  <div class="doctor-info">
    <el-form
      :model="userForm"
      label-width="120px"
      :rules="formRule"
      ref="formEl"
    >
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
      <div v-if="!isDoctor">
        <el-form-item label="出诊时间：">
          <WorkTimeTable></WorkTimeTable>
        </el-form-item>
        <el-form-item label="真实姓名：" prop="name">
          <el-input
            v-model="userForm.name"
            placeholder="请输入真实姓名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="id">
          <el-input
            v-model="userForm.id"
            placeholder="请输入身份证号码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="预约时间：" prop="date">
          <el-select
            v-model="userForm.date"
            placeholder="请选择预约时间"
            clearable
          >
            <el-option label="Zone No.1" value="shanghai"></el-option>
            <el-option label="Zone No.2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(formEl)">确认</el-button>
          <el-button @click="resetForm(formEl)">重置</el-button>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-if="isDoctor"
          >修改信息</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import mixin from "@/mixin";
import { Session } from "@/utils/session";
import formRules from "@/utils/rules/formRulesRegistration";
import { useRouter } from "vue-router";
import { ElForm } from "element-plus";
import WorkTimeTable from "@/components/WorkTimeTable.vue";
export default defineComponent({
  name: "DoctorInfo",
  components: {
    WorkTimeTable,
  },
  mixins: [mixin],
  setup() {
    const router = useRouter();
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
        date: ["2016-05-03", "2016-05-03", "2016-05-03"],
        allNumber: [100, 100, 100],
        remainNumber: [20, 10, 50],
      },
      userForm: {
        name: "",
        id: "",
        date: "",
      },
    });
    // const role = ref(Session.get("userInfo"));

    const isDoctor = computed(() => {
      let userinfo = Session.get("userInfo");
      const role = (userinfo && Session.get("userInfo").roles[0]) || "common";
      return role === "doctor";
    });

    const handleAvatarSuccess = () => {};
    const formRule = formRules;
    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    const resetForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };
    return {
      ...toRefs(state),
      handleAvatarSuccess,
      onSubmit,
      isDoctor,
      resetForm,
      formRule,
    };
  },
});
</script>

<style lang="scss" scoped>
.doctor-info {
  padding: 20px;
}
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
