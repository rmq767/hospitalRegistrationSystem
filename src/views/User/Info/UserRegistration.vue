<template>
  <el-card class="registration-list">
    <div v-if="isLogin">
      <h3>预约列表</h3>
      <el-radio-group v-model="type" @change="changeType">
        <el-radio-button label="1">已预约</el-radio-button>
        <el-radio-button label="2">正在就诊</el-radio-button>
        <el-radio-button label="3">就诊完成</el-radio-button>
        <el-radio-button label="4">取消预约</el-radio-button>
      </el-radio-group>
      <el-divider></el-divider>
      <UserRegistrationInfo
        class="registration-info"
        v-for="registration in registrationList"
        :key="registration.id"
        :info="registration"
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
import { Session } from "@/utils/session";
import { computed, defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import UserRegistrationInfo from "./components/UserRegistrationInfo.vue";
export default defineComponent({
  name: "UserRegistration",
  components: {
    UserRegistrationInfo,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      type: "1",
      registrationList: [
        {
          date: "2021-12-29 上午",
          department: "儿科",
          doctor: "李主任",
          name: "小阮",
          phone: "15281223440",
          id: "1234",
        },
        {
          date: "2021-12-29 上午",
          department: "儿科",
          doctor: "李主任",
          name: "小阮",
          phone: "15281223440",
          id: "123",
        },
      ],
    });
    /**
     * @description 筛选挂号
     */
    const changeType = (value: string) => {
      console.log(value);
    };
    const isLogin = computed(() => {
      const userInfo = Session.get("userInfo");
      if (userInfo) {
        return userInfo.roles === "user";
      } else {
        return false;
      }
    });
    const toPage = () => {
      router.push("/login");
    };
    return { ...toRefs(state), changeType, isLogin, toPage };
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
