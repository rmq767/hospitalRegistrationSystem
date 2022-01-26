<template>
  <div class="culture">
    <swiper
      :autoplay="options.autoplay"
      :loop="options.loop"
      :navigation="options.navigation"
      :thumbs="options.thumbs"
      ref="swiperEl"
    >
      <swiper-slide v-for="pic in culture" :key="pic">
        <img class="culture-img" :src="pic" alt="" />
        <p class="culture-img-desc">{{ pic }}</p>
      </swiper-slide>
    </swiper>
    <swiper
      :slides-per-view="options.slidesPerView"
      :space-between="options.spaceBetween"
      :watchSlidesVisibility="options.watchSlidesVisibility"
      class="swiperThumbsEl"
    >
      <swiper-slide v-for="pic in culture" :key="pic">
        <img class="culture-img" :src="pic" alt="" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import SwiperCore, { Autoplay, Navigation, Thumbs } from "swiper";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";
// Import Swiper styles
import "swiper/swiper-bundle.min.css";
SwiperCore.use([Autoplay, Navigation, Thumbs]);
export default defineComponent({
  name: "HospitalCulture",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const state = reactive({
      options: {
        autoplay: {
          disableOnInteraction: false, // 鼠标滑动后继续自动播放
          delay: 6000, //4秒切换一次
        },
        thumbs: {
          swiper: {
            el: ".swiperThumbsEl",
            spaceBetween: 20,
            slidesPerView: 4,
            watchSlidesVisibility: true,
            loop: true,
          },
          slideThumbActiveClass: "slide-thumb-active",
        },
        loop: true,
        navigation: {
          nextElRef: ".swiper-button-next",
          prevElRef: ".swiper-button-prev",
        },
        spaceBetween: 20,
        slidesPerView: 4,
        watchSlidesVisibility: true, //防止不可点击
      },
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
    });
    // onMounted(() => {
    //   state.options.thumbs.swiper.el = state.swiperThumbsEl;
    //   state.swiperEl.controller.control = state.swiperThumbsEl;
    //   state.swiperThumbsEl.controller.control = state.swiperEl;
    // });
    return { ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped>
.culture {
  padding: 20px;
}
.culture-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.culture-img-desc {
  position: absolute;
  padding-left: 10px;
  padding-right: 100px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
}
:deep(.swiper-button-prev) {
  color: var(--el-color-primary);
}
:deep(.swiper-button-next) {
  color: var(--el-color-primary);
}
.swiperThumbsEl {
  padding: 20px;
  :deep(.swiper-slide) {
    opacity: 0.5;
  }
  :deep(.slide-thumb-active) {
    opacity: 1;
  }
}
</style>
