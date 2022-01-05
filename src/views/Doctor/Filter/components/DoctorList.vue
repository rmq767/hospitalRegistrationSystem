<template>
  <el-card>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="专家名称" />
      <el-table-column prop="yearsWork" label="工作年限"> </el-table-column>
      <el-table-column prop="graduateSchool" label="毕业院校">
      </el-table-column>
      <el-table-column prop="professionalDirection" label="专业方向">
      </el-table-column>
      <el-table-column prop="department" label="所属科室" />
      <el-table-column prop="desc" label="简介"> </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" size="small" @click="toDoctorInfo(scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { Doctor } from "@/utils/interface/doctor";
export default defineComponent({
  name: "DoctorList",
  setup() {
    const state = reactive({
      tableData: [
        {
          name: "吕亚洲",
          yearsWork: 15,
          graduateSchool: "华西医科大学",
          professionalDirection: "儿科",
          department: "儿科",
          desc: "从事儿科重症工作10余年，先后到重庆医科大学、北京儿童医院学习、进修，擅长儿科呼吸系统、神经系统、消化系统及危重疑难疾病的诊治。发表国·家级论文十余篇，出版专著一部 ",
        },
        {
          name: "杜清勉",
          yearsWork: 15,
          graduateSchool: "华西医科大学",
          professionalDirection: "儿科",
          department: "儿科",
          desc: "1985年7月毕业于河南医科大学医疗系，从事儿童临床工作35年，2006年晋升为儿科主任医师。曾在天津市儿童医院进修学习一年，在省级、国·家级及核心期刊发表医学论文20篇，获市级科技进步二等奖八项，三等奖两项，著书一部。擅长儿童呼吸（长期发热、咳嗽、气喘等）、肾病综合征、过敏性紫癜、内分泌、血液、神经及小儿腹痛、腹泻、厌食等的治疗 ",
        },
        {
          name: "高华",
          yearsWork: 15,
          graduateSchool: "华西医科大学",
          professionalDirection: "儿科",
          department: "儿科",
          desc: "擅长治疗儿童常见病多发病。尤其对儿童各种类型癫痫，抽动障碍，发育迟缓，各种脑损伤（新生儿缺血缺氧性脑病，早产低体重，头外伤，各种脑炎）的评估与干预指导，遗传代谢病，反复呼吸道感染，慢性咳嗽，儿童支气管哮喘有比较深入的研究。",
        },
      ] as Doctor[],
    });
    const router = useRouter();
    const toDoctorInfo = (row: Doctor) => {
      router.push({ name: "DoctorInfo", params: { id: row.name } });
    };
    return { ...toRefs(state), toDoctorInfo };
  },
});
</script>

<style lang="scss" scoped></style>
