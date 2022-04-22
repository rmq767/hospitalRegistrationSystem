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
          :disabled="true"
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
        <p>{{ doctorInfoForm.username }}</p>
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
      <el-form-item label="个人简介：">
        <p>{{ doctorInfoForm.introduction }}</p>
      </el-form-item>
      <el-form-item label="出诊时间：">
        <el-button type="primary" @click="seeTime">查看时间</el-button>
      </el-form-item>
      <el-form-item label="预约日期：" prop="updateTime">
        <el-date-picker v-model="userForm.updateTime" type="date" />
      </el-form-item>
      <el-form-item label="预约时间：" prop="subscribeTime">
        <el-radio-group v-model="userForm.subscribeTime">
          <el-radio label="上午">上午</el-radio>
          <el-radio label="下午">下午</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)"
          >确认</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="排班" v-model="visible" width="60%">
      <el-calendar ref="calendar">
        <template #header="{ date }">
          <span>{{ date }}</span>
          <el-button-group>
            <el-button size="small" @click="selectDate('prev-month')"
              >上个月</el-button
            >
            <el-button size="small" @click="selectDate('today')"
              >今天</el-button
            >
            <el-button size="small" @click="selectDate('next-month')"
              >下个月</el-button
            >
          </el-button-group>
        </template>
        <template #dateCell="{ data }">
          <div class="day" @click="toWorkInfo(data.day)">
            <span>
              {{ data.day.split("-").slice(1).join("-") }}
            </span>
            <p class="highlight">{{ filterDate(data) }}</p>
          </div>
        </template>
      </el-calendar>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="visible = false">确认</el-button>
        </span>
      </template>
    </el-dialog>
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
import { ElForm, FormInstance } from "element-plus";
import WorkTimeTable from "@/components/WorkTimeTable.vue";
import api from "@/api";
import store from "@/store";
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
    const ruleFormRef = ref<FormInstance>();
    const calendar = ref();
    const state = reactive({
      doctorInfoForm: {
        id: "",
      },
      userForm: {
        updateTime: "",
        subscribeTime: "",
      },
      visible: false,
      date: [],
      nowDate: "",
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
    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          if (Session.get("userInfo")) {
            const params = {
              userId: Session.get("userInfo").id,
              subDoctorId: state.doctorInfoForm.id,
              ...state.userForm,
            };
            try {
              const response = await api.user.apiAddSubscribe(params);
              if (response.data.code === 200) {
                ElMessage.success("预约成功！");
                router.push("/user/registration");
              } else {
                ElMessage.error(response.data.msg);
              }
            } catch (error: any) {
              ElMessage.error(error);
            }
          } else {
            ElMessage.warning("请先登录！");
          }
        } else {
          return false;
        }
      });
    };
    const resetForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };
    /**
     * @description 查看时间
     */
    const seeTime = () => {
      state.visible = true;
      nextTick(() => {
        state.nowDate = calendar.value.curMonthDatePrefix;
        getMonthTime();
      });
    };
    /**
     * @description 获取每月工作时间
     */
    const getMonthTime = async () => {
      const params = {
        doctorId: state.doctorInfoForm.id,
        month: state.nowDate,
      };
      const response = await api.doctor.apiGetMonthTime(params);
      state.date = response.data.data;
    };
    const selectDate = (val: string) => {
      calendar.value.selectDate(val);
      state.nowDate = calendar.value.curMonthDatePrefix;
      getMonthTime();
    };
    /**
     * @description 筛选有工作时间的时期展示
     */
    const filterDate = (data: any) => {
      let result = state.date.find((date: any) => {
        let d = date.workTime.split(" ")[0] as string;
        return d === data.day;
      });
      if (result) {
        return (result as any).workTime;
      } else {
        return "";
      }
    };
    onMounted(() => {
      getDoctorDetail();
    });
    return {
      ...toRefs(state),
      handleAvatarSuccess,
      onSubmit,
      resetForm,
      formRule,
      ruleFormRef,
      seeTime,
      selectDate,
      filterDate,
      calendar,
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
