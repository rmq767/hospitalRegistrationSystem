<template>
  <el-card>
    <el-descriptions :title="info.date" :column="3" border>
      <template #extra>
        <el-button type="primary" @click="cancel" v-if="info.cancelStatus === 0"
          >取消预约</el-button
        >
        <el-button type="primary" @click="evaluation" v-if="info.sawStatus === 1">评价</el-button>
      </template>
      <el-descriptions-item label="我的姓名">{{
        info.userName
      }}</el-descriptions-item>
      <el-descriptions-item label="我的电话">{{
        info.userPhone
      }}</el-descriptions-item>
      <el-descriptions-item label="我的身份证号">{{
        info.userIdCard
      }}</el-descriptions-item>
      <el-descriptions-item label="预约医生">
        <el-tag size="small">{{ info.doctorName }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="预约科室">
        <el-tag size="small">{{ info.administrativeName }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <Evaluation ref="evaluationEl" @submit="submitEvalution"></Evaluation>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";
import { ElMessageBox, ElMessage, ElDialog } from "element-plus";
import { UserInterface } from "@/utils/interface/user";
import { useRouter } from "vue-router";
import Evaluation from "./Evaluation.vue";
import api from "@/api";
export default defineComponent({
  name: "UserRegistrationInfo",
  components: {
    Evaluation,
  },
  props: {
    info: {
      type: Object as PropType<UserInterface>,
      default: () => {},
    },
  },
  emits: ["cancel", "submitEvalution"],
  setup(props, { emit }) {
    const router = useRouter();
    const state = reactive({
      evaluationEl: ElDialog,
    });
    /**
     * @description 取消预约
     */
    const cancel = () => {
      ElMessageBox.confirm("确定取消预约?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          emit("cancel", props.info.id);
        })
        .catch(() => {});
    };
    /**
     * @description 评价
     */
    const evaluation = () => {
      state.evaluationEl.open();
    };
    const submitEvalution = (form: any) => {
      emit("submitEvalution", form);
    };
    return { ...toRefs(state), cancel, evaluation, submitEvalution };
  },
});
</script>

<style lang="scss" scoped></style>
