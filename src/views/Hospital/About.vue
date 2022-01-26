<template>
  <div class="about">
    <article>
      <h1>医院简介</h1>
      <p class="about-img">
        <img
          src="https://www.pdfy999.com/Uploads/Editor/2017-10-23/59edae9cc6145.jpg"
          alt=""
        />
      </p>
      <article v-html="article"></article>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "HospitalAbout",
  setup() {
    const state = reactive({
      article: `
      <p>
        医院始建于1971年，现已建成为一所集医疗、科研、教学、康复、保健为一体的国家三级甲等中西医结合医院、全国重点中西医结合医院，川西南、滇西北地区唯一一所大学直管附属医院。
      </p>
      <h3>一、医院概况</h3>
      <p>
        2003年建设成为集医疗、科研、教学、康复、保健为一体的国家三级甲等中西医结合医院。
      </p>
      <p>
        2011年顺利通过国家中医药管理局“全国重点中西医结合医院”评审，是国家中医药管理局在川西南地区的布点医院。
      </p>
      <p>2016年纳入省卫计委管理，成为四川省五所大学直管附属医院之一。</p>
      <p>2017年建成国家住院医师规范化培训基地。</p>
      <p>2019年建设成为四川省首家地市级互联网医院。</p>
      <h3>二、近年荣誉</h3>
      <p>
        2017年荣获“国家胸痛中心年度质控金奖”，荣获“第二届全国护理专业本科临床技能大赛”三等奖，被四川省社会医疗保险管理局评为医疗保险管理工作先进单位，被确定为攀枝花市“家庭医生”签约服务试点医院。
      </p>
      <p>
        2018年通过国家呼吸与危重症医学（PCCM）认证，建成国家高级卒中中心，被国家卫健委等六个部门遴选确定为建立健全现代医院管理制度试点医院，荣获中国管理全球论坛“互联网+医疗健康最佳建设奖”，被四川省卫健委评为“发挥信息优势”示范医院，荣获四川省首届基层中医药适宜技术技能大赛团体三等奖，被评为四川省三星数字化医院，成为四川省治未病中心攀西分中心。
      </p>
      <p>
        2019年顺利通过国家GCP专业认证，建成为四川省首家地市级互联网医院，被四川省中医药管理局确定为全省七大中医医疗区域中心建设单位之一。
      </p>
      <p>
        2020年荣获四川省援鄂抗疫先锋单位，四川省中医药传承创新发展先进集体，四川省卫生健康系统先进集体、四川省对口帮扶先进集体等荣誉称号。
      </p>
      <p>
        医院先后获得四川省文明单位，四川省十佳医院，四川省卫生先进单位，攀枝花市惠民医院，攀枝花市爱婴医院等荣誉称号。
      </p>
      <h3>三、医院规模</h3>
      <p>医院占地面积2.8万㎡，业务用房面积9.7万㎡，开放床位1200张。下设三个分院，金江铁路医院、盐边县第二人民医院、米易县中医医院。</p>
      <p class="about-img">
      <img src="https://www.pdfy999.com/Uploads/Editor/2017-10-23/59edb1cc43cad.png" alt="" class="about-img">
      </p>
      `,
    });
    return { ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped>
.about {
  padding: 20px;
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  :deep(h3) {
    margin-bottom: 10px;
  }
  :deep(p) {
    font-size: 16px;
    text-indent: 2em;
    margin-bottom: 8px;
  }
  :deep(.about-img) {
    text-align: center;
  }
}
</style>
