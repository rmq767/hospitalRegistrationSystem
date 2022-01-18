<template>
  <el-header>
    <div class="header">
      <h2 class="title">医院挂号系统</h2>
      <div class="aside">
        <Aside
          mode="horizontal"
          width="100%"
          style="box-shadow: none"
          v-if="isCommon"
        ></Aside>
      </div>
      <div class="user">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <el-dropdown trigger="click" @command="chooseMenu">
          <span class="el-dropdown-link">
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
              <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { Session } from "@/utils/session";
import { ElMessage, ElMessageBox } from "element-plus";
import { resetRoute } from "@/router/index";
import Aside from "./Aside.vue";
export default defineComponent({
  name: "Header",
  components: {
    ArrowDown,
    Aside,
  },
  setup() {
    const router = useRouter();
    const chooseMenu = (menu: string) => {
      switch (menu) {
        case "userInfo":
          toUserInfoPage();
          break;
        case "changePwd":
          toChangePwd();
          break;
        case "loginOut":
          LoginOut();
          break;
      }
    };
    const isCommon = computed(() => {
      return Session.get("userInfo").roles[0] === "common";
    });
    /**
     * @description 跳转个人信息
     */
    const toUserInfoPage = () => {
      const role = Session.get("userInfo").roles[0];
      const id = "123";
      let routerName = "";
      switch (role) {
        case "common":
          routerName = "UserInfo";
          break;
        case "doctor":
          routerName = "DoctorInfo";
          break;
      }
      router.push({ name: routerName, params: { id } });
    };
    /**
     * @description 跳转个人信息
     */
    const toChangePwd = () => {
      router.push({ name: "ChangePassword" });
    };
    /**
     * @description 退出登录操作
     */
    const LoginOut = () => {
      ElMessageBox.confirm("确认退出?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          Session.clear();
          // 重置路由
          resetRoute();
          router.push("/login");
          ElMessage.success("退出登录！");
        })
        .catch(() => {});
    };
    return { chooseMenu, isCommon };
  },
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .user {
    display: flex;
    align-items: center;
  }
  .aside {
    flex: 1;
  }
}
.el-header {
  background-color: var(--el-color-white);
  box-shadow: var(--box-shadow);
}
</style>
