<template>
  <div class="department">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        :label="item.name"
        :name="item.name"
        v-for="item in department"
        :key="item.name"
      >
        <el-radio-group v-model="subDepartment">
          <el-radio-button
            :label="sub.name"
            v-for="sub in item.sub"
            :key="sub.name"
          ></el-radio-button>
        </el-radio-group>
        <div class="content" v-for="sub in item.sub" :key="sub.name">
          <div v-show="sub.name === subDepartment">
            <h3>{{ sub.name }}简介</h3>
            <article>{{ sub.descrption }}</article>
            <el-divider content-position="left">科室医生</el-divider>
            <div class="doctors">
              <DoctorCard
                v-for="doctor in sub.doctors"
                :key="doctor.name"
              ></DoctorCard>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import DoctorCard from "@/components/DoctorCard.vue";
export default defineComponent({
  name: "HospitalDepartmentDoctor",
  components: {
    DoctorCard,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      activeName: "内科系统",
      subDepartment: "内分泌科",
      department: [
        {
          name: "内科系统",
          sub: [
            {
              name: "内分泌科",
              descrption:
                "内分泌科，始建于1998年，2010年独立成科，经过多年努力，现已建成基础设施完善、技术力量雄厚、管理水平较高的集医疗、教学、科研于一体的市重点中医专科。是攀枝花地区中医医结合防治内分泌代谢性疾病的龙头单位。",
              doctors: [
                {
                  name: "张先用",
                  type: "专家",
                  rank: "博士研究生",
                },
                {
                  name: "张先用1",
                  type: "专家",
                  rank: "博士研究生",
                },
                {
                  name: "张先用31",
                  type: "专家",
                  rank: "博士研究生",
                },
                {
                  name: "张先用13",
                  type: "专家",
                  rank: "博士研究生",
                },
                {
                  name: "张先用222",
                  type: "专家",
                  rank: "博士研究生",
                },
                {
                  name: "张先用12",
                  type: "专家",
                  rank: "博士研究生",
                },
              ],
            },
            {
              name: "风湿科",
              descrption:
                "攀枝花学院附属医院风湿免疫科成立于2002年，是攀西地区建立最早的正规风湿性疾病诊治机构。在刘敏副院长的带领下，与北京301、华西医院等建立了紧密合作关系，在学科建设、专业人员培训、学术研究和诊治手段等方面建立起了共建共享机制。在风湿免疫疾病诊治能力及手段等方面已与国内一流医院风湿免疫专科实现同步发展。科室通过10多年的发展，拥有了先进的专业免疫实验室，培养了风湿病专科副主任医师3名，主治医师1名、住院医师1名。开展了流式细胞仪检测HLA-B27、淋巴细胞亚群等，在攀西地区率先开展了血液灌流、血浆置换等治疗重症风湿免疫性疾病，设置层流病床，提高了风湿性疾病的诊治水平，我科诊断治疗严谨规范、中西医结合特色突出，在类风湿性关节炎、系统性红斑狼疮、强直性脊柱炎、干燥综合征、多发性肌炎、硬皮病、脂膜炎、血管炎、骨关节炎、痛风等风湿性疾病的诊治上积累了丰富的经验。严谨的诊疗程序使我们始终保持与国内先进水平同步,加上先进的实验室检查设备,使大量的风湿免疫病人能够及时明确诊断。传统的中医优势, 明显降低了药物的毒副作用,极大地改善了风湿性免疫疾病的预后。中西医结合特色在社会上产生了较大的影响力，目前病员已辐射攀西、凉山及云南部分地区。科室现有副主任医师2名，主治医师2名，住院医师2名，现有专科开放床位36张，我科同仁愿秉承高尚医德，精湛技术为风湿免疫疾病患者提供优质技术服务。",
              doctors: [
                {
                  name: "张先用2",
                  type: "专家",
                  rank: "博士研究生",
                },
                {
                  name: "张先用3",
                  type: "专家",
                  rank: "博士研究生",
                },
              ],
            },
          ],
        },
        {
          name: "外科系统",
          sub: [
            {
              name: "胸外科",
              descrption:
                "胸外科专业成立于2001年，经多年努力，现已建成基础设施完善、技术力量雄厚、管理水平较高的集医疗、教学、科研于一体的科室。",
              doctors: [
                {
                  name: "张先用4",
                  type: "专家",
                  rank: "博士研究生",
                },
                {
                  name: "张先用5",
                  type: "专家",
                  rank: "博士研究生",
                },
              ],
            },
            {
              name: "耳鼻喉科",
              descrption:
                "耳鼻喉科成立于1971年，经过多年努力，现已建成基础设施完善、技术力量雄厚、管理水平较高的集医疗、教学、科研于一体的耳鼻咽喉头颈外重点专科（学科），下设耳、鼻亚专科组，在核心期刊发表论文30余篇。",
              doctors: [
                {
                  name: "张先用6",
                  type: "专家",
                  rank: "博士研究生",
                },
                {
                  name: "张先用7",
                  type: "专家",
                  rank: "博士研究生",
                },
              ],
            },
          ],
        },
        {
          name: "眼科医院",
          sub: [
            {
              name: "青光眼白内障科",
              descrption:
                "常规开展各种类型的白内障超声乳化+人工晶体植入术（目前治疗白内障最成熟、疗效最好的手术方式），复杂性白内障超声乳化手术（婴幼儿先天性白内障、外伤性白内障、晶状体半脱位、小瞳孔极硬核白内障、抗青光眼术后或玻璃体切割手术后的白内障），II期人工晶体植入术，人工晶体悬吊植入术，晶体半脱位超声乳化加囊袋张力环联合人工晶体植入术，虹膜修补修复瞳孔缺损等。",
              doctors: [
                {
                  name: "张先用8",
                  type: "专家",
                  rank: "博士研究生",
                },
                {
                  name: "张先用9",
                  type: "专家",
                  rank: "博士研究生",
                },
              ],
            },
            {
              name: "视光学中心",
              descrption:
                "开展全飞秒激光角膜基质内透镜取出手术（SMILE）治疗近视，有晶体眼后房植入人工晶体(ICL)矫正超高度近视。不同类型弱视的规范诊治，包括多媒体训练系统、弱视治疗仪及同视机等综合治疗，视觉训练双眼视功能的康复。",
              doctors: [
                {
                  name: "张先用10",
                  type: "专家",
                  rank: "博士研究生",
                },
                {
                  name: "张先用11",
                  type: "专家",
                  rank: "博士研究生",
                },
              ],
            },
          ],
        },
      ],
    });
    const handleClick = (tab: any) => {
      state.department.forEach((item) => {
        if (item.name === tab.paneName) {
          state.subDepartment = item.sub[0].name;
        }
      });
    };
    onMounted(() => {
      let { department, subDepartment } = route.query;
      if (department && subDepartment) {
        state.activeName = department as string;
        state.subDepartment = subDepartment as string;
      }
    });
    return { ...toRefs(state), handleClick };
  },
});
</script>

<style lang="scss" scoped>
.department {
  padding: 20px;
  .content {
    padding: 20px;
    h3 {
      text-align: center;
      margin-bottom: 20px;
    }
    .doctors {
      display: flex;
      flex-wrap: wrap;
      > div {
        margin: 10px;
      }
    }
  }
}
</style>
