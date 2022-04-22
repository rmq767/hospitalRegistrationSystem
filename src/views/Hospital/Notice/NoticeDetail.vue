<template>
  <div class="notice-detail">
    <h2>{{ notice.title }}</h2>
    <p>
      <span>{{ formatDate(notice.createTime) }}</span>
    </p>
    <article v-html="notice.content"></article>
    <div class="publish">发布人员：{{ notice.adminName }}</div>
  </div>
</template>

<script lang="ts">
import api from "@/api";
import mixin from "@/mixin";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "HospitalNewsDetail",
  mixins: [mixin],
  setup() {
    const state = reactive({
      notice: {},
    });
    const route = useRoute();
    /**
     * @description 获取新闻详情
     */
    const getNewsById = async () => {
      let id = route.params.id as string;
      const response = await api.notice.apiGetAnnouncementById(id);
      state.notice = response.data.data;
    };
    onMounted(() => {
      getNewsById();
    });
    return { ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped>
.notice-detail {
  padding: 20px;
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  p {
    text-align: center;
    margin: 20px;
    color: #999;
  }
  article {
    :deep(p) {
      text-align: left;
      text-indent: 2em;
      font-size: 16px;
      margin-bottom: 20px;
    }
    :deep(img) {
      display: block;
      margin: 0 auto;
    }
  }
  .publish {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
