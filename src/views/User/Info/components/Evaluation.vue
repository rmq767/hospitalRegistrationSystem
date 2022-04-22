<template>
  <el-dialog v-model="dialogFormVisible" title="评价">
    <el-form :model="form" label-width="100px">
      <el-form-item label="评价类型：">
        <el-radio-group v-model="form.type">
          <el-radio label="表扬">表扬</el-radio>
          <el-radio label="建议">建议</el-radio>
          <el-radio label="投诉">投诉</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="建议：">
        <el-input
          v-model="form.content"
          type="textarea"
          placeholder="您有什么宝贵的意见，都可以说哦"
          :rows="4"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="onSubmit">评价</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
export default defineComponent({
  name: "Evaluation",
  emits: ["submit"],
  setup(props, { emit }) {
    const state = reactive({
      dialogFormVisible: false,
      form: {
        type: "",
        content: "",
      },
    });
    const open = () => {
      state.dialogFormVisible = true;
    };
    const close = () => {
      state.dialogFormVisible = false;
      state.form = {
        type: "",
        content: "",
      };
    };
    const onSubmit = () => {
      emit("submit", state.form);
      close();
    };
    return { ...toRefs(state), onSubmit, open, close };
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
