<template>
  <div class="home-container">1</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  name: "UserHome",
  components: {},
  setup() {
    const state = reactive({
      getUserInfos: {
        photo:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        userName: "admin",
      },
      currentTime: new Date().toLocaleDateString(),
      topCardItemList: [
        {
          title: "今日访问人数",
          titleNum: "123",
          tip: "在场人数",
          tipNum: "911",
          color: "#F95959",
          iconColor: "#F86C6B",
          icon: "iconfont icon-jinridaiban",
        },
        {
          title: "实验室总数",
          titleNum: "123",
          tip: "使用中",
          tipNum: "611",
          color: "#8595F4",
          iconColor: "#92A1F4",
          icon: "iconfont icon-AIshiyanshi",
        },
        {
          title: "申请人数（月）",
          titleNum: "123",
          tip: "通过人数",
          tipNum: "911",
          color: "#FEBB50",
          iconColor: "#FDC566",
          icon: "iconfont icon-shenqingkaiban",
        },
      ],
      activities: [
        {
          content: "Custom icon",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
        },
        {
          content: "Custom color",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
        },
        {
          content: "Custom size",
          timestamp: "2018-04-03 20:46",
          size: "large",
        },
        {
          content: "Custom hollow",
          timestamp: "2018-04-03 20:46",
          type: "primary",
          hollow: true,
        },
        {
          content: "Default node",
          timestamp: "2018-04-03 20:46",
        },
      ],
    });

    onMounted(() => {});
    return { ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped>
.home-container {
  overflow-x: hidden;
  .home-card-item {
    width: 100%;
    height: 103px;
    background: var(--el-text-color-secondary);
    border-radius: 4px;
    transition: all ease 0.3s;
    &:hover {
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      transition: all ease 0.3s;
    }
  }
  .home-card-item-box {
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    &:hover {
      i {
        right: 0px !important;
        bottom: 0px !important;
        transition: all ease 0.3s;
      }
    }
    i {
      position: absolute;
      right: -10px;
      bottom: -10px;
      font-size: 70px;
      transform: rotate(-30deg);
      transition: all ease 0.3s;
    }
    .home-card-item-flex {
      padding: 0 20px;
      color: var(--color-whites);
      .home-card-item-title,
      .home-card-item-tip {
        font-size: 13px;
      }
      .home-card-item-title-num {
        font-size: 18px;
      }
      .home-card-item-tip-num {
        font-size: 13px;
      }
    }
  }
  .home-card-first {
    background: var(--el-color-white);
    border: 1px solid var(--el-border-color-light, #ebeef5);
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 100%;
      border: 2px solid var(--color-primary-light-5);
    }
    .home-card-first-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      .home-card-first-right-title {
        color: var(--el-color-black);
      }
      .home-card-first-right-msg {
        font-size: 13px;
        color: var(--el-text-color-secondary);
      }
    }
  }
  .home-monitor {
    height: 200px;
    .flex-warp-item {
      width: 50%;
      height: 100px;
      display: flex;
      .flex-warp-item-box {
        margin: auto;
        height: auto;
        text-align: center;
        color: var(--el-text-color-primary);
      }
    }
  }
  .home-warning-card {
    height: 292px;
    ::v-deep(.el-card) {
      height: 100%;
    }
  }
  .home-dynamic {
    height: 200px;
    .home-dynamic-item {
      display: flex;
      width: 100%;
      height: 60px;
      overflow: hidden;
      &:first-of-type {
        .home-dynamic-item-line {
          i {
            color: orange !important;
          }
        }
      }
      .home-dynamic-item-left {
        text-align: right;
        .home-dynamic-item-left-time1 {
        }
        .home-dynamic-item-left-time2 {
          font-size: 13px;
          color: var(--el-text-color-secondary);
        }
      }
      .home-dynamic-item-line {
        height: 60px;
        border-right: 2px dashed var(--el-border-color-light, #ebeef5);
        margin: 0 20px;
        position: relative;
        i {
          color: var(--color-primary);
          font-size: 12px;
          position: absolute;
          top: 1px;
          left: -6px;
          transform: rotate(46deg);
          background: var(--el-color-white);
        }
      }
      .home-dynamic-item-right {
        flex: 1;
        .home-dynamic-item-right-title {
          i {
            margin-right: 5px;
            border: 1px solid var(--el-border-color-light, #ebeef5);
            width: 20px;
            height: 20px;
            border-radius: 100%;
            padding: 3px 2px 2px;
            text-align: center;
            color: var(--color-primary);
          }
        }
        .home-dynamic-item-right-label {
          font-size: 13px;
          color: var(--el-text-color-secondary);
        }
      }
    }
  }
}
</style>
