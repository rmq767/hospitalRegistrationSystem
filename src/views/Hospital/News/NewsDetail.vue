<template>
  <div class="news-detail">
    <h2>{{ news.title }}</h2>
    <p>
      <span>{{ news.time }}</span>
    </p>
    <article v-html="news.content"></article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "HospitalNewsDetail",
  setup() {
    const state = reactive({
      news: {
        title: "我院召开迎新春知识分子和各界人士代表座谈会",
        time: "发布时间：2022-01-25 ",
        content: `
        <p>
          <span>1月21日下午，我院召开迎新春知识分子和各界人士代表座谈会。院长陈建勋同志主持会议，院党委书记田巨龙同志、副院长樊涛同志、副院长包家新同志、副院长卿丽华同志、副院长任楷同志出席。院内知识分子代表、青年代表、民主党派和无党派人士代表及相关职能部门负责人共60余人参加座谈。 </span> 
        </p>
        <p>
          <span><img src="https://www.pdfy999.com/Uploads/Editor/2022-01-25/61efbe48bc8ac.png" width="800" height="575" alt="" /><br />
          </span> 
        </p>
        `,
      },
    });
    const route = useRoute();
    const id = computed(() => {
      return route.params.id;
    });
    return { id, ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped>
.news-detail {
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
}
</style>
