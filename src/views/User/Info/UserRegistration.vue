<template>
  <el-card class="registration-list">
    <div v-if="isLogin">
      <h3>预约列表</h3>
      <el-radio-group v-model="type" @change="changeType">
        <el-radio-button :label="0">已预约</el-radio-button>
        <el-radio-button :label="1">正在就诊</el-radio-button>
        <el-radio-button :label="2">就诊完成</el-radio-button>
        <el-radio-button :label="3">取消预约</el-radio-button>
      </el-radio-group>
      <el-divider></el-divider>
      <UserRegistrationInfo
        class="registration-info"
        v-for="registration in registrationList"
        :key="registration.id"
        :info="registration"
        @cancel="cancel"
        @submitEvalution="submitEvalution"
      ></UserRegistrationInfo>
    </div>
    <el-result icon="warning" title="您未登录" sub-title="请先登录查看" v-else>
      <template #extra>
        <el-button type="primary" @click="toPage">去登录</el-button>
      </template>
    </el-result>
  </el-card>
</template>

<script lang="ts">
import api from "@/api";
import store from "@/store";
import { Session } from "@/utils/session";
import { ElMessage } from "element-plus/lib/components";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import UserRegistrationInfo from "./components/UserRegistrationInfo.vue";
export default defineComponent({
  name: "UserRegistration",
  components: {
    UserRegistrationInfo,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      type: 0,
      registrationList: [],
    });
    /**
     * @description 获取本人预约列表
     */
    const getList = async () => {
      if (Session.get("userInfo")) {
        const params = {
          userId: Session.get("userInfo").id,
          status: state.type,
        };
        const response = await api.user.apiGetUserSubscribeById(params);
        state.registrationList = response.data.data;
      }
    };
    /**
     * @description 取消预约
     */
    const cancel = async (id: string) => {
      const params = {
        id,
      };
      const response = await api.user.apiCancelSubscribe(params);
      if (response.data.code === 200) {
        ElMessage.success("取消成功！");
        getList();
      }
    };
    /**
     * @description 评论
     */
    const submitEvalution = async (form: any) => {
      let user = Session.get("userInfo");
      if (user) {
        const params = {
          userId: user.id,
          userName: user.username,
          ...form,
        };
        const response = await api.user.apiAddCommon(params);
        if (response.data.code === 200) {
          ElMessage.success("评价成功！");
          getList();
        }
      }
      console.log(form);
    };
    /**
     * @description 筛选挂号
     */
    const changeType = () => {
      getList();
    };
    const isLogin = computed(() => {
      return store.state.userInfos.roles === "user";
    });
    const toPage = () => {
      router.push("/login");
    };
    onMounted(() => {
      getList();
    });
    return {
      ...toRefs(state),
      changeType,
      toPage,
      cancel,
      submitEvalution,
      isLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.registration-list {
  h3 {
    margin-bottom: 20px;
  }
  .registration-info {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
</style>
