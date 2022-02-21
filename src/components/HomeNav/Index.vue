<template>
  <div>
    <div class="nav">
      <ul class="nav-content">
        <li
          v-for="(nav, index) in navs"
          :key="index"
          @mouseover="selectStyle(nav)"
          @mouseout="outStyle(nav)"
        >
          <div class="nav-item" @click="toPage(nav.path)">{{ nav.name }}</div>
          <ul v-show="nav.isSubShow">
            <li v-for="subItem in nav.subItems" :key="subItem.name">
              <div class="nav-sub-item" @click="toPage(subItem.path)">
                {{ subItem.name }}
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "home-nav",
  setup() {
    const router = useRouter();
    const state = reactive({
      activeIndex: 0,
      navs: [
        {
          name: "首页",
          path: "/",
          isSubShow: false,
          subItems: [],
        },
        {
          name: "医院概况",
          isSubShow: false,
          subItems: [
            {
              name: "医院简介",
              path: "/hospital/about",
            },
            {
              name: "附院文化",
              path: "/hospital/culture",
            },
          ],
        },
        {
          name: "新闻动态",
          isSubShow: false,
          subItems: [
            {
              name: "附院要闻",
              path: "/hospital/news",
            },
            {
              name: "医院公告",
              path: "/hospital/notice",
            },
          ],
        },
        {
          name: "科室及医生",
          isSubShow: false,
          path: "/hospital/departmentdoctor",
          subItems: [],
        },
        {
          name: "患者服务",
          isSubShow: false,
          subItems: [
            {
              name: "门诊时间",
              path: "/hospital/time",
            },
            {
              name: "预约挂号",
              path: "/doctor/search",
            },
            {
              name: "我的挂号",
              path: "/user/registration/:id",
            },
            {
              name: "修改密码",
              path: "/user/changepassword",
            },
          ],
        },
      ],
    });
    const selectStyle = (item: any) => {
      item.isSubShow = true;
    };
    const outStyle = (item: any) => {
      item.isSubShow = false;
    };
    const toPage = (path: string) => {
      console.log(path);
      path && router.push(path);
    };
    return { ...toRefs(state), selectStyle, outStyle, toPage };
  },
});
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 100%;
  background: var(--el-color-primary);
  .nav-content {
    width: 100%;
    height: 100%;
    display: flex;
    > li {
      flex: 1;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .nav-item {
      width: 100%;
      height: 100%;
      font-size: 18px;
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background-color: var(--el-color-primary-light-1);
      }
    }
    ul {
      position: absolute;
      left: 0;
      top: 50px;
      width: 100%;
      z-index: 99;
      li {
        flex: 1;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--el-color-primary);
        color: #fff;
        .nav-sub-item {
          width: 100%;
          height: 100%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover {
            background-color: var(--el-color-primary-light-1);
          }
        }
      }
    }
  }
}
// .nav .nav-content {
//   width: 1200px;
//   margin: 0 auto;
//   height: 50px;
// }
// .nav .nav-content > li {
//   width: 120px;
//   height: 50px;
//   display: block;
//   float: left;
//   text-align: center;
//   margin-right: 20px;
//   position: relative;
//   cursor: pointer;
// }
// .nav .nav-content li a {
//   width: 120px;
//   height: 50px;
//   display: block;
//   font-size: 18px;
//   line-height: 50px;
//   color: #fff;
// }
// .nav .nav-content ul {
//   position: absolute;
//   left: 0;
//   top: 50px;
//   z-index: 99;
//   width: 100%;
// }
// .nav .nav-content ul li {
//   width: 120px;
//   height: 50px;
//   display: block;
//   float: left;
//   text-align: center;
//   margin-right: 20px;
//   line-height: 50px;
//   background: var(--el-color-primary);
// }
// .nav .nav-content ul li a:hover {
//   background: #fff;
//   color: var(--el-color-primary);
// }
// .nav .nav-content li a:hover {
//   background: #fff;
//   color: var(--el-color-primary);
// }
// .nav .nav-content li a.on {
//   background: #fff;
//   color: var(--el-color-primary);
// }
</style>
