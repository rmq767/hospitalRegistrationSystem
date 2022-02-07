<template>
  <el-card shadow="hover">
    <div class="news-item">
      <div class="content">
        <h3>{{ news.title }}</h3>
        <p v-if="news.content">{{ news.content }}</p>
      </div>
      <div class="info">
        <p>
          <span>发布时间：</span>
          <span>{{ news.time }}</span>
        </p>
      </div>
      <div class="handle">
        <el-button type="primary" @click="toNewsDetail">查看更多</el-button>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "NewsItem",
  props: {
    news: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const toNewsDetail = () => {
      console.log(route.name);
      if (route.name === "HospitalNews") {
        router.push({
          name: "HospitalNewsDetail",
          params: {
            id: props.news.id,
          },
        });
      }
      if (route.name === "HospitalNotice") {
        router.push({
          name: "HospitalNoticeDetail",
          params: {
            id: props.news.id,
          },
        });
      }
    };
    return { toNewsDetail };
  },
});
</script>

<style lang="scss" scoped>
.news-item {
  display: flex;
  align-items: center;
  min-height: 100px;
  &:hover {
    h3 {
      color: var(--el-color-primary);
    }
  }
  .content {
    width: 720px;
    h3 {
      margin-bottom: 10px;
      font-size: 18px;
    }
    p {
      font-size: 16px;
    }
  }
  .info,
  .handle {
    width: 200px;
    padding-left: 50px;
  }
  .info p {
    display: flex;
    flex-direction: column;
  }
}
</style>
