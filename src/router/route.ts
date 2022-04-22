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
        path: "/about",
        name: "About",
        component: () => import("@/views/About.vue"),
        meta: {
          roles: ["admin", "user"],
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
          roles: ["admin", "user", "doctor"],
          title: "修改密码",
          icon: "",
          isHide: true,
          permission: false,
        },
      },
      {
        path: "/user/information/:id",
        name: "UserInfo",
        component: () => import("@/views/User/Info/UserInfo.vue"),
        meta: {
          roles: ["user"],
          title: "用户信息",
          icon: "",
          isHide: true,
          permission: true,
        },
      },
      {
        path: "/doctor/info/:id",
        name: "DoctorInfo",
        component: () => import("@/views/Doctor/Info/Doctor.vue"),
        meta: {
          roles: ["doctor"],
          title: "医生详情",
          icon: "",
          isHide: true,
          permission: true,
        },
      },
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
              title: "医生账号信息",
              icon: "",
              isHide: false,
              permission: true,
            },
          },
          {
            path: "/admin/doctor/time",
            name: "AdminDoctorTime",
            component: () => import("@/views/Admin/DoctorManage/Time.vue"),
            meta: {
              roles: ["admin"],
              title: "医生工作时间",
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
              title: "病人账号信息",
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
      permission: false,
    },
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import("@/views/404.vue"),
    meta: {
      title: "页面找不到",
      permission: false,
    },
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "首页",
      roles: ["user", "admin", "doctor"],
      icon: "",
      isHide: true,
      permission: false,
    },
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("@/views/Hospital/Index.vue"),
        meta: {
          title: "首页",
          roles: ["user", "admin", "doctor"],
          icon: "",
          isHide: true,
          permission: false,
        },
      },
      {
        path: "/hospital/about",
        name: "HospitalAbout",
        component: () => import("@/views/Hospital/About.vue"),
        meta: {
          title: "医院简介",
          roles: ["user", "admin", "doctor"],
          icon: "",
          isHide: true,
          permission: false,
        },
      },
      {
        path: "/hospital/culture",
        name: "HospitalCulture",
        component: () => import("@/views/Hospital/Culture.vue"),
        meta: {
          title: "附院文化",
          roles: ["user", "admin", "doctor"],
          icon: "",
          isHide: true,
          permission: false,
        },
      },
      {
        path: "/hospital/news",
        name: "HospitalNews",
        component: () => import("@/views/Hospital/News/NewsList.vue"),
        meta: {
          title: "附院要闻",
          roles: ["user", "admin", "doctor"],
          icon: "",
          isHide: true,
          permission: false,
        },
      },
      {
        path: "/hospital/news/:id",
        name: "HospitalNewsDetail",
        component: () => import("@/views/Hospital/News/NewsDetail.vue"),
        meta: {
          title: "新闻详情",
          roles: ["user", "admin", "doctor"],
          icon: "",
          isHide: true,
          permission: false,
        },
      },
      {
        path: "/hospital/notice",
        name: "HospitalNotice",
        component: () => import("@/views/Hospital/Notice/NoticeList.vue"),
        meta: {
          title: "附院公告",
          roles: ["user", "admin", "doctor"],
          icon: "",
          isHide: true,
          permission: false,
        },
      },
      {
        path: "/hospital/notice/:id",
        name: "HospitalNoticeDetail",
        component: () => import("@/views/Hospital/Notice/NoticeDetail.vue"),
        meta: {
          title: "公告详情",
          roles: ["user", "admin", "doctor"],
          icon: "",
          isHide: true,
          permission: false,
        },
      },
      {
        path: "/hospital/departmentdoctor",
        name: "HospitalDepartmentDoctor",
        component: () => import("@/views/Hospital/DepartmentDoctor.vue"),
        meta: {
          title: "科室及医生",
          roles: ["user", "admin", "doctor"],
          icon: "",
          isHide: true,
          permission: false,
        },
      },
      {
        path: "/hospital/doctor/info/:id",
        name: "HospitalDoctorInfo",
        component: () => import("@/views/Doctor/Info/Index.vue"),
        meta: {
          roles: ["user", "doctor", "admin"],
          title: "医生详情",
          icon: "",
          isHide: true,
          permission: false,
        },
      },
      // {
      //   path: "/user/registration",
      //   name: "Registration",
      //   component: () => import("@/views/User/Registration/Index.vue"),
      //   meta: {
      //     roles: ["user"],
      //     title: "我要挂号",
      //     icon: "",
      //     isHide: false,
      //     permission: false,
      //   },
      // },
      {
        path: "/doctor/search",
        name: "DoctorSearch",
        component: () => import("@/views/Doctor/Filter/Index.vue"),
        meta: {
          roles: ["user"],
          title: "医生搜索/预约挂号",
          icon: "",
          isHide: false,
          permission: false,
        },
      },
      {
        path: "/user/registration",
        name: "UserRegistration",
        component: () => import("@/views/User/Info/UserRegistration.vue"),
        meta: {
          roles: ["user"],
          title: "我的挂号",
          icon: "",
          isHide: false,
          permission: false,
        },
      },
      {
        path: "/user/changepassword",
        name: "UserChangePassword",
        component: () => import("@/views/ChangePassword.vue"),
        meta: {
          roles: ["user"],
          title: "修改密码",
          icon: "",
          isHide: true,
          permission: false,
        },
      },
    ],
  },
];
