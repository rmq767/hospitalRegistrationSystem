<template>
  <el-card class="doctor-card" shadow="hover">
    <div class="doctor-img">
      <img
        src="https://www.pdfy999.com/Uploads/Picture/2017-09-05/59ae0764c42ea.jpg"
        class="image"
      />
    </div>
    <div class="doctor-info">
      <p>
        <span class="name">张先勇</span>
        <span class="type">专家</span>
      </p>
      <p class="rank">博士研究生 检验科</p>
      <div class="handle">
        <el-button type="primary" size="mini" @click="toPage">详情</el-button>
        <el-button type="warning" size="mini">预约</el-button>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "DoctorCard",
  setup() {
    const router = useRouter();
    const toPage = () => {
      router.push(`/hospital/doctor/info/${1}`);
    };
    return { toPage };
  },
});
</script>

<style lang="scss" scoped>
.doctor-card {
  width: 200px;
  height: 300px;
  padding: 0;
  .doctor-img {
    border-radius: 50%;
    width: 100%;
    height: 158px;
    overflow: hidden;
    .image {
      width: 100%;
      display: block;
    }
  }
  .doctor-info {
    > p {
      text-align: center;
      margin-top: 10px;
      font-size: 16px;
    }
    .name {
      font-weight: bold;
    }
    .type {
      display: inline-block;
      margin-left: 10px;
      font-size: 14px;
      color: var(--el-color-warning);
    }
    .rank {
      width: 158px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .handle {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
