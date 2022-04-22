<template>
  <div>
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
          <NewsList :title="['医院公告']">
            <template #content>
              <div class="news-list-content">
                <p
                  class="news-item"
                  v-for="(item, index) in noticeList"
                  :key="index"
                >
                  <span class="news-title"><em>•</em> {{ item.title }}</span>
                  <span class="news-date">{{
                    formatTime(item.createTime)
                  }}</span>
                </p>
              </div>
            </template>
          </NewsList>
        </div>
      </section>
      <section class="doctor-team">
        <NewsList :title="['专家团队']">
          <template #content>
            <swiper
              :slides-per-view="5"
              :slidesPerGroup="5"
              :slidesPerGroupAuto="true"
              :space-between="10"
              :autoplay="{
                delay: 6000,
              }"
              :loop="true"
            >
              <swiper-slide v-for="item in doctorList" :key="item.id">
                <DoctorCard class="mt20" :data="item"></DoctorCard>
              </swiper-slide>
            </swiper>
          </template>
        </NewsList>
      </section>
      <section class="department-list">
        <NewsList :title="['科室导航']">
          <template #content>
            <div class="department-info">
              <img
                src="https://www.pdfy999.com/Uploads/Picture/2019-01-08/5c3458a01ca6b.png"
                alt=""
                class="department-img"
              />

              <div class="department-content">
                <p v-for="department in departmentList" :key="department.id">
                  <el-icon><elementCaretRight /></el-icon
                  ><span>{{ department.name }}</span>
                </p>
              </div>
            </div>
          </template>
        </NewsList>
      </section>
      <section class="hospital-show">
        <NewsList :title="['附院风采']">
          <template #content>
            <swiper
              :slides-per-view="4"
              :slidesPerGroupAuto="true"
              :space-between="10"
              :autoplay="true"
              :loop="true"
            >
              <swiper-slide v-for="pic in culture" :key="pic">
                <img class="culture-img" :src="pic" alt="" />
              </swiper-slide>
            </swiper>
          </template>
        </NewsList>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import NewsHeader from "@/components/News/NewsHeader.vue";
import DoctorCard from "@/components/DoctorCard.vue";
import NewsList from "@/components/News/NewsList.vue";
import SwiperCore, { Autoplay } from "swiper";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";
// Import Swiper styles
import "swiper/swiper.min.css";
import api from "@/api";
import { formatDate } from "@/utils/formatTime";
SwiperCore.use([Autoplay]);
export default defineComponent({
  name: "Hospital",
  components: {
    NewsHeader,
    DoctorCard,
    NewsList,
    Swiper,
    SwiperSlide,
  },
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

      noticeList: [],

      department: [
        {
          name: "内科系统",
          sub: [
            "内分泌",
            "风湿科",
            "血液科",
            "肾内科",
            "重症医学科",
            "儿科",
            "心血管科",
            "肿瘤科",
          ],
        },
        {
          name: "外科系统",
          sub: [
            "内分泌",
            "风湿科",
            "血液科",
            "肾内科",
            "重症医学科",
            "儿科",
            "心血管科",
            "肿瘤科",
          ],
        },
        {
          name: "眼科医院",
          sub: [
            "内分泌",
            "风湿科",
            "血液科",
            "肾内科",
            "重症医学科",
            "儿科",
            "心血管科",
            "肿瘤科",
          ],
        },
        {
          name: "骨科医院",
          sub: [
            "内分泌",
            "风湿科",
            "血液科",
            "肾内科",
            "重症医学科",
            "儿科",
            "心血管科",
            "肿瘤科",
          ],
        },
        {
          name: "消化中心",
          sub: [
            "内分泌",
            "风湿科",
            "血液科",
            "肾内科",
            "重症医学科",
            "儿科",
            "心血管科",
            "肿瘤科",
          ],
        },
      ],
      culture: [
        "https://www.pdfy999.com/Uploads/Picture/2018-03-23/5ab464ccf0b77.jpg",
        "https://www.pdfy999.com/Uploads/Picture/2018-03-23/5ab4648beca14.jpg",
        "https://www.pdfy999.com/Uploads/Picture/2018-03-23/5ab46527a823a.jpg",
        "https://www.pdfy999.com/Uploads/Picture/2018-03-23/5ab465485a83d.jpg",
        "https://www.pdfy999.com/Uploads/Picture/2018-03-23/5ab465643b15e.jpg",
        "https://www.pdfy999.com/Uploads/Picture/2018-03-23/5ab4651088805.jpg",
        "https://www.pdfy999.com/Uploads/Picture/2018-07-24/5b56cb2fb7d4d.jpg",
        "https://www.pdfy999.com/Uploads/Picture/2018-07-24/5b56cb3a48c0d.jpg",
        "https://www.pdfy999.com/Uploads/Picture/2018-07-24/5b56cb4a541e5.jpg",
        "https://www.pdfy999.com/Uploads/Picture/2018-07-24/5b56cb5fbd286.jpg",
        "https://www.pdfy999.com/Uploads/Picture/2018-07-24/5b56cb244c0c5.jpg",
        "https://www.pdfy999.com/Uploads/Picture/2018-07-24/5b56cb5597595.jpg",
        "",
      ],
      doctorList: [],
      departmentList: [],
      active: 0,
      activeName: "内科系统",
    });
    /**
     * @description 获取首页公告
     */
    const getNoticeList = async () => {
      const params = {
        currentPage: 1,
        pageSize: 5,
      };
      const response = await api.notice.apiGetAnnouncementList(params);
      state.noticeList = response.data.data.records;
    };
    /**
     * @description 获取首页医生
     */
    const getDoctorList = async () => {
      const params = {
        currentPage: 1,
        pageSize: 10,
      };
      const response = await api.doctor.apiGetDoctorList(params);
      state.doctorList = response.data.data.records;
    };
    /**
     * @description 获取科室
     */
    const getDepartmentList = async () => {
      const response = await api.department.apiGetAllAdministrative();
      state.departmentList = response.data.data;
    };

    const formatTime = (date: number) => {
      return formatDate(new Date(date), "YYYY-mm-dd");
    };

    onMounted(() => {
      getNoticeList();
      getDoctorList();
      getDepartmentList();
    });
    return { ...toRefs(state), formatTime };
  },
});
</script>

<style lang="scss" scoped>
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
    .news-list-content {
      margin-top: 10px;
      .news-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        margin-top: 10px;
        .news-title {
          font-size: 14px;
          max-width: 680px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          &:hover {
            color: var(--el-color-primary);
          }
          em {
            color: var(--el-color-primary);
          }
        }
        .news-date {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
  .news-home {
    display: flex;
  }
  .doctor-team {
    .doctor-list {
      display: flex;
      justify-content: space-evenly;
    }
  }
  .department-list {
    .department-info {
      margin-top: 20px;
      display: flex;
      align-items: flex-start;
      .department-img {
        margin-right: 20px;
      }
    }
    .department-content {
      display: flex;
      flex-wrap: wrap;
      > p {
        // flex-basis: 20%;
        font-size: 18px;
        cursor: pointer;
        margin: 10px;
        display: flex;
        align-items: center;
        &:hover {
          color: var(--el-color-primary);
        }
      }
    }
  }
  .hospital-show {
    .culture-img {
      width: 280px;
      height: 220px;
      object-fit: cover;
      margin: 10px;
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
.more {
  font-size: 12px;
  color: #999;
  cursor: pointer;
  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
