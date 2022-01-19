<template>
  <div class="home-container">
    <section>
      <el-carousel height="630px">
        <el-carousel-item v-for="item in bannerList" :key="item">
          <img class="banner-img" :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </section>
    <section class="content">
      <section class="news-home">
        <div class="news-banner">
          <el-carousel
            height="300px"
            indicator-position="outside"
            style="width: 400px"
            arrow="never"
          >
            <el-carousel-item v-for="item in newsBanner" :key="item">
              <img class="banner-img" :src="item" alt="" />
              <div class="news-banner-title">news</div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="news-list">
          <NewsList
            :title="['医院公告', '医院新闻']"
            width="100%"
            :data="newsData"
          ></NewsList>
        </div>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import NewsList from "@/components/NewsList.vue";

export default defineComponent({
  name: "UserHome",
  components: { NewsList },
  setup() {
    const state = reactive({
      bannerList: [
        "https://www.pdfy999.com/Uploads/Picture/2021-06-04/60b9ddd465ef0.jpg",
        "https://www.pdfy999.com/Uploads/Picture/2017-12-08/5a2a305de47fa.jpg",
        "https://www.pdfy999.com/Uploads/Picture/2017-12-08/5a2a3078c3c3f.jpg",
        "https://www.pdfy999.com/Uploads/Picture/2017-12-08/5a2a306886590.jpg",
        "https://www.pdfy999.com/Uploads/Picture/2021-04-21/607f9a1f149e6.JPG",
      ],
      newsBanner: [
        "https://www.pdfy999.com/Uploads/Picture/2021-12-12/61b5bf98c2258.png",
        "https://www.pdfy999.com/Uploads/Picture/2021-12-08/61aff8a32cdf6.png",
        "https://www.pdfy999.com/Uploads/Picture/2021-11-30/61a5d6727bbea.png",
      ],
      newsData: {
        noticeList: [
          {
            title: "2022年住院医师规范化培训招生简章",
            date: "2021-12-27",
          },
          {
            title: "攀大附院2022年规培护士招生简章",
            date: "2021-12-27",
          },
          {
            title: "攀枝花学院附属医院检验技师招聘公告",
            date: "2021-12-27",
          },
          {
            title: "攀枝花学院附属医院招聘启事",
            date: "2021-12-27",
          },
          {
            title: "攀枝花学院附属医院招聘启事",
            date: "2021-12-27",
          },
        ],
        newsList: [
          {
            title: `追剧《火红年华》，传承“三线精神”，攀大附院举行大型义诊活动`,
            date: "2021-12-27",
          },
          {
            title:
              "四川省推进中医药强省建设工作领导小组副组长，省中医药管理局党组书记、局长田兴军莅临我院调研指导工作",
            date: "2021-12-27",
          },
          {
            title:
              "诊问题，解难题，同担当，助发展，市卫健委党政领导莅临我院调研指导",
            date: "2021-12-27",
          },
          {
            title:
              "牵手德昌—攀大附院联盟医院暨眼科专家工作站在德昌县中医医院挂牌",
            date: "2021-12-27",
          },
          {
            title: "牵手宁蒗—攀大附院联盟医院在宁蒗县中医医院挂牌",
            date: "2021-12-27",
          },
        ],
      },
    });

    onMounted(() => {});
    return { ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped>
.home-container {
  overflow-x: hidden;
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
    }
    .news-home {
      display: flex;
    }
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
</style>
