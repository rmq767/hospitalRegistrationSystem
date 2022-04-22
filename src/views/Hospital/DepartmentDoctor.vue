<template>
  <div class="department">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        :label="item.name"
        :name="item.id"
        v-for="item in departmentOptions"
        :key="item.id"
      >
        <div>
          <el-divider content-position="left">科室医生</el-divider>
          <div class="doctors">
            <DoctorCard
              v-for="doctor in doctorList"
              :key="doctor.id"
              :data="doctor"
            ></DoctorCard>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import DoctorCard from "@/components/DoctorCard.vue";
import api from "@/api";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "HospitalDepartmentDoctor",
  components: {
    DoctorCard,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      activeName: "内科系统",
      departmentOptions: [],
      doctorList: [],
    });
    /**
     * @description 获取科室下拉
     */
    const getDepartment = async () => {
      try {
        const response = await api.department.apiGetAllAdministrative();
        if (response.data.code === 200) {
          state.departmentOptions = response.data.data;
          if (state.departmentOptions.length) {
            state.activeName = (state.departmentOptions[0] as any).id;
          }
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
    };
    /**
     * @description 获取医生列表
     */
    const getDoctorList = async () => {
      const params = {
        administrativeId: state.activeName,
      };
      const response = await api.doctor.apiGetDoctorList(params);
      if (response.data.code === 200) {
        state.doctorList = response.data.data.records;
      } else {
        ElMessage.error(response.data.msg);
      }
    };
    const handleClick = (tab: any) => {
      getDoctorList();
    };
    onMounted(async () => {
      await getDepartment();
      await getDoctorList();
    });
    return { ...toRefs(state), handleClick };
  },
});
</script>

<style lang="scss" scoped>
.department {
  padding: 20px;
  .content {
    padding: 20px;
    h3 {
      text-align: center;
      margin-bottom: 20px;
    }
    .doctors {
      display: flex;
      flex-wrap: wrap;
      > div {
        margin: 10px;
      }
    }
  }
}
</style>
