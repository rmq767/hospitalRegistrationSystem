<template>
  <el-dialog v-model="dialogFormVisible" title="评价">
    <el-form :model="form" label-width="100px">
      <el-form-item label="评价类型：">
        <el-radio-group v-model="form.type">
          <el-radio label="1">表扬</el-radio>
          <el-radio label="2">建议</el-radio>
          <el-radio label="3">投诉</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="医生评价：">
        <el-rate
          v-model="form.doctor"
          :colors="colors"
          :texts="texts"
          show-text
        >
        </el-rate>
      </el-form-item>
      <el-form-item label="医院评价：">
        <el-rate
          v-model="form.hospital"
          :colors="colors"
          :texts="texts"
          show-text
        >
        </el-rate>
      </el-form-item>
      <el-form-item label="建议：">
        <el-input
          v-model="form.advice"
          type="textarea"
          placeholder="您有什么宝贵的意见，都可以说哦"
          :rows="4"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">评价</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
export default defineComponent({
  name: "Evaluation",
  setup() {
    const colors = ref(["#99A9BF", "#F7BA2A", "#FF9900"]);
    const texts = ref(["很差", "差", "一般", "好", "很好"]);
    const state = reactive({
      dialogFormVisible: false,
      form: {
        type: "1",
        doctor: null,
        hospital: null,
        advice: "",
      },
    });
    const open = () => {
      state.dialogFormVisible = true;
    };
    const close = () => {
      state.dialogFormVisible = false;
    };
    const onSubmit = () => {
      console.log(state.form);
      close();
    };
    return { ...toRefs(state), colors, texts, onSubmit, open };
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
