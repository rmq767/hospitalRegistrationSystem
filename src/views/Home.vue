<template>
  <el-scrollbar>
    <div class="home-container">
      <header class="home-header">
        <div class="logo">
          <img
            src="https://www.pdfy999.com/Uploads/Picture/2017-10-16/59e4505ed1598.jpg"
            alt=""
          />
        </div>
        <div class="handle">
          <el-button type="text" @click="toLogin">登录</el-button>
        </div>
      </header>
      <section class="home-menu">
        <HomeNav></HomeNav>
      </section>
      <div class="home-main">
        <section class="home-container" v-if="notHomePage">
          <router-view></router-view>
        </section>
        <section v-else>
          <router-view></router-view>
        </section>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import HomeNav from "@/components/HomeNav/Index.vue";

import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "UserHome",
  components: { HomeNav },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toLogin = () => {
      router.push("/login");
    };
    const notHomePage = computed(() => {
      return route.path !== "/";
    });
    onMounted(() => {});
    return { toLogin, notHomePage };
  },
});
</script>

<style lang="scss" scoped>
.home-main {
  background-color: var(--el-color-info-light-9);
  min-height: calc(100vh - 170px);
  .home-container {
    width: 1200px;
    margin: 0 auto;
    background-color: var(--el-color-whites);
    height: 100%;
  }
}
.home-container {
  .content {
    width: 1200px;
    margin: 0 auto;
    .news-banner {
      margin-right: 40px;
      .news-banner-title {
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 999;
        background-color: rgba(0, 0, 0, 0.5);
        height: 30px;
        line-height: 30px;
        width: 400px;
        color: #fff;
        vertical-align: middle;
        padding: 0 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .news-list {
      flex: 1;
      .news-list-content {
        margin-top: 10px;
        .news-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 40px;
          margin-top: 10px;
          .news-title {
            font-size: 14px;
            max-width: 680px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            &:hover {
              color: var(--el-color-primary);
            }
            em {
              color: var(--el-color-primary);
            }
          }
          .news-date {
            color: #999;
            font-size: 12px;
          }
        }
      }
    }
    .news-home {
      display: flex;
    }
    .doctor-team {
      .doctor-list {
        display: flex;
        justify-content: space-evenly;
      }
    }
  }
  .home-header {
    width: 1200px;
    height: 120px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .home-menu {
    height: 50px;
    margin-bottom: 0;
    width: 1200px;
    margin: 0 auto;
  }
}
section {
  margin-bottom: 20px;
}
.banner-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.more {
  font-size: 12px;
  color: #999;
  cursor: pointer;
  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
