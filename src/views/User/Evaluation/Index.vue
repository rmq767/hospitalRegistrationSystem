<template>
  <el-card>
    <div class="evaluation">
      <div class="evaluation-item">
        <span>评价类型：</span>
        <el-radio-group v-model="form.type">
          <el-radio label="1">表扬</el-radio>
          <el-radio label="2">建议</el-radio>
          <el-radio label="3">投诉</el-radio>
        </el-radio-group>
      </div>
      <div class="evaluation-item">
        <span>医生评价：</span>
        <el-rate
          v-model="form.doctor"
          :colors="colors"
          :texts="texts"
          show-text
        >
        </el-rate>
      </div>
      <div class="evaluation-item">
        <span>医院评价：</span>
        <el-rate
          v-model="form.hospital"
          :colors="colors"
          :texts="texts"
          show-text
        >
        </el-rate>
      </div>
      <div class="evaluation-item">
        <span>建议：</span>
        <el-input
          v-model="form.advice"
          type="textarea"
          placeholder="您有什么宝贵的意见，都可以说哦"
          :rows="4"
        ></el-input>
      </div>
      <div class="evaluation-item">
        <span></span>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
export default defineComponent({
  name: "Evaluation",
  setup() {
    const colors = ref(["#99A9BF", "#F7BA2A", "#FF9900"]);
    const texts = ref(["很差", "差", "一般", "好", "很好"]);
    const state = reactive({
      form: {
        type: "1",
        doctor: null,
        hospital: null,
        advice: "",
      },
    });
    const onSubmit = () => {
      console.log(state.form);
    };
    return { ...toRefs(state), colors, texts, onSubmit };
  },
});
</script>

<style lang="scss" scoped>
.evaluation {
  display: flex;
  flex-direction: column;
  .evaluation-item {
    min-height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    > span {
      display: inline-block;
      margin-right: 8px;
      min-width: 80px;
    }
  }
}
</style>
