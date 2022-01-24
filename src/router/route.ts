import { Session } from "@/utils/session";
import { RouteRecordRaw } from "vue-router";

/**
 * @description 需要动态加载的路由
 * title:名称，
 * roles:权限，
 * icon:图标
 * isHide:是否侧边菜单隐藏
 */
export const dynamicRoutes: Array<RouteRecordRaw> = [
  {
    path: "/admin",
    name: "Admin",
    redirect: "/adminhome",
    component: () => import("@/layout/Home.vue"),
    children: [
      {
        path: "/adminhome",
        name: "AdminHome",
        component: () => import("@/views/AdminHome.vue"),
        meta: {
          title: "首页",
          roles: ["admin", "doctor"],
          icon: "",
          isHide: false,
          permission: true,
        },
      },
      {
        path: "/about",
        name: "About",
        component: () => import("@/views/About.vue"),
        meta: {
          roles: ["admin", "common"],
          title: "关于我",
          icon: "",
          isHide: true,
          permission: true,
        },
      },
      {
        path: "/changepassword",
        name: "ChangePassword",
        component: () => import("@/views/ChangePassword.vue"),
        meta: {
          roles: ["admin", "common", "doctor"],
          title: "修改密码",
          icon: "",
          isHide: true,
          permission: true,
        },
      },
      {
        path: "/user/registration/:id",
        name: "UserRegistration",
        component: () => import("@/views/User/Info/UserRegistration.vue"),
        meta: {
          roles: ["common"],
          title: "我的挂号",
          icon: "",
          isHide: false,
        },
      },
      {
        path: "/user/registration",
        name: "Registration",
        component: () => import("@/views/User/Registration/Index.vue"),
        meta: {
          roles: ["common"],
          title: "我要挂号",
          icon: "",
          isHide: false,
        },
      },
      {
        path: "/user/information/:id",
        name: "UserInfo",
        component: () => import("@/views/User/Info/UserInfo.vue"),
        meta: {
          roles: ["common"],
          title: "用户信息",
          icon: "",
          isHide: true,
        },
      },
      {
        path: "/doctor/search",
        name: "DoctorSearch",
        component: () => import("@/views/Doctor/Filter/Index.vue"),
        meta: {
          roles: ["common"],
          title: "医生搜索",
          icon: "",
          isHide: false,
        },
      },
      {
        path: "/doctor/registration/:id",
        name: "DoctorRegistration",
        component: () =>
          import("@/views/Doctor/Filter/DoctorRegistrationForm.vue"),
        meta: {
          roles: ["common"],
          title: "挂号医生",
          icon: "",
          isHide: true,
        },
      },
      {
        path: "/doctor/info/:id",
        name: "DoctorInfo",
        component: () => import("@/views/Doctor/Info/Index.vue"),
        meta: {
          roles: ["common", "doctor"],
          title: "医生详情",
          icon: "",
          isHide: true,
        },
      },
      // {
      //   path: "/evaluation/:id",
      //   name: "Evaluation",
      //   component: () => import("@/views/User/Evaluation/Index.vue"),
      //   meta: {
      //     roles: ["common"],
      //     title: "用户评价",
      //     icon: "",
      //     isHide: false,
      //   },
      // },
      {
        path: "/doctor/worktime/info",
        name: "WorkTimeInfo",
        component: () => import("@/views/Doctor/WorkTime/WorkTimeInfo.vue"),
        meta: {
          roles: ["doctor"],
          title: "每日详情",
          icon: "",
          isHide: false,
          permission: true,
        },
      },
      {
        path: "/doctor/worktime",
        name: "WorkTime",
        component: () => import("@/views/Doctor/WorkTime/Index.vue"),
        meta: {
          roles: ["doctor"],
          title: "工作日历",
          icon: "",
          isHide: false,
          permission: true,
        },
      },
      {
        path: "/doctor/worktime/adjust",
        name: "WorkTimeToAdjust",
        component: () => import("@/views/Doctor/WorkTime/WorkTimeToAdjust.vue"),
        meta: {
          roles: ["doctor"],
          title: "时间调整",
          icon: "",
          isHide: false,
          permission: true,
        },
      },
      {
        path: "/admin/doctor",
        name: "AdminDoctor",
        redirect: "/admin/doctor/manage",
        component: () => import("@/views/Admin/DoctorManage/Index.vue"),
        meta: {
          roles: ["admin"],
          title: "医生管理",
          icon: "",
          isHide: false,
          permission: true,
        },
        children: [
          {
            path: "/admin/doctor/manage",
            name: "AdminDoctorManage",
            component: () => import("@/views/Admin/DoctorManage/Index.vue"),
            meta: {
              roles: ["admin"],
              title: "账号信息",
              icon: "",
              isHide: false,
              permission: true,
            },
          },
        ],
      },
      {
        path: "/admin/user",
        name: "AdminUser",
        redirect: "/admin/user/manage",
        component: () => import("@/views/Admin/UserManage/Index.vue"),
        meta: {
          roles: ["admin"],
          title: "用户管理",
          icon: "",
          isHide: false,
          permission: true,
        },
        children: [
          {
            path: "/admin/user/manage",
            name: "AdminUserManage",
            component: () => import("@/views/Admin/UserManage/Index.vue"),
            meta: {
              roles: ["admin"],
              title: "账号信息",
              icon: "",
              isHide: false,
              permission: true,
            },
          },
        ],
      },
      {
        path: "/setting",
        name: "Setting",
        redirect: "/setting/department",
        component: () => import("@/views/Setting/Department/Index.vue"),
        meta: {
          roles: ["admin"],
          title: "基本管理",
          icon: "",
          isHide: false,
          permission: true,
        },
        children: [
          {
            path: "/setting/department",
            name: "SettingDepartment",
            component: () => import("@/views/Setting/Department/Index.vue"),
            meta: {
              roles: ["admin"],
              title: "科室管理",
              icon: "",
              isHide: false,
              permission: true,
            },
          },
          {
            path: "/setting/notice",
            name: "SettingNotice",
            component: () => import("@/views/Setting/Notice/Index.vue"),
            meta: {
              roles: ["admin"],
              title: "公告管理",
              icon: "",
              isHide: false,
              permission: true,
            },
          },
          {
            path: "/setting/evaluation",
            name: "SettingEvaluation",
            component: () => import("@/views/Setting/Evaluation/Index.vue"),
            meta: {
              roles: ["admin"],
              title: "评价管理",
              icon: "",
              isHide: false,
              permission: true,
            },
          },
        ],
      },
    ],
  },
];

/**
 * @description 静态路由
 */
export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/Index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import("@/views/404.vue"),
    meta: {
      title: "页面找不到",
    },
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "首页",
      roles: ["common", "admin", "doctor"],
      icon: "",
      isHide: true,
    },
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("@/views/Hospital/Index.vue"),
        meta: {
          title: "首页",
          roles: ["common", "admin", "doctor"],
          icon: "",
          isHide: true,
        },
      },
      {
        path: "/hospital/about",
        name: "HospitalAbout",
        component: () => import("@/views/Hospital/About.vue"),
        meta: {
          title: "医院简介",
          roles: ["common", "admin", "doctor"],
          icon: "",
          isHide: true,
        },
      },
    ],
  },
];
