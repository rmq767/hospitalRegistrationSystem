<template>
  <div class="home-container">
    <el-row :gutter="15">
      <el-col :sm="6" class="mb15">
        <div class="home-card-item home-card-first">
          <div class="flex-margin flex">
            <img :src="getUserInfos.photo" />
            <div class="home-card-first-right ml15">
              <div class="flex-margin">
                <div class="home-card-first-right-title">
                  {{ currentTime }}，{{
                    getUserInfos.userName === ""
                      ? "test"
                      : getUserInfos.userName
                  }}！
                </div>
                <div class="home-card-first-right-msg mt5">
                  {{
                    getUserInfos.userName === "admin" ? "超级管理" : "普通用户"
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :sm="6" class="mb15" v-for="(v, k) in topCardItemList" :key="k">
        <div
          class="home-card-item home-card-item-box"
          :style="{ background: v.color }"
        >
          <div class="home-card-item-flex">
            <div class="home-card-item-title pb3">{{ v.title }}</div>
            <div class="home-card-item-title-num pb6">{{ v.titleNum }}</div>
            <div class="home-card-item-tip pb3">{{ v.tip }}</div>
            <div class="home-card-item-tip-num">{{ v.tipNum }}</div>
          </div>
          <i :class="v.icon" :style="{ color: v.iconColor }"></i>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18" :offset="0">
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-card class="mb20">
              <div id="lineCharts1" style="width: 100%; height: 400px"></div>
            </el-card>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-card>
              <div id="pieCharts" style="width: 100%; height: 400px"></div>
            </el-card>
          </el-col>
        </el-row>
        <el-card>
          <div id="lineCharts" style="width: 100%; height: 400px"></div>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="0">
        <el-card style="height: 100%">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :hollow="activity.hollow"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import * as echarts from "echarts";

type EChartsOption = echarts.EChartsOption;
export default defineComponent({
  name: "Home",
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
    const init1 = () => {
      var chartDom = document.getElementById("lineCharts")!;
      var myChart = echarts.init(chartDom);
      var option: EChartsOption;

      option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      };
      option && myChart.setOption(option);
    };
    const init2 = () => {
      var chartDom = document.getElementById("lineCharts1")!;
      var myChart = echarts.init(chartDom);
      var option: EChartsOption;
      option = {
        title: {
          text: "Stacked Line",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Direct",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };

      option && myChart.setOption(option);
    };

    const init3 = () => {
      var chartDom = document.getElementById("pieCharts")!;
      var myChart = echarts.init(chartDom);
      var option: EChartsOption;

      option = {
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [20, 100],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
              { value: 32, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 28, name: "rose 5" },
              { value: 26, name: "rose 6" },
              { value: 22, name: "rose 7" },
              { value: 18, name: "rose 8" },
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    };

    onMounted(() => {
      init1();
      init2();
      init3();
    });
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
