<template>
  <el-card>
    <el-descriptions :title="info.date" :column="3" border>
      <template #extra>
        <el-button type="primary" @click="cancel">取消预约</el-button>
        <el-button type="primary" @click="evaluation">评价</el-button>
      </template>
      <el-descriptions-item label="我的姓名">{{
        info.name
      }}</el-descriptions-item>
      <el-descriptions-item label="我的电话">{{
        info.phone
      }}</el-descriptions-item>
      <el-descriptions-item label="我的身份证号">{{
        info.id
      }}</el-descriptions-item>
      <el-descriptions-item label="预约医生">{{
        info.doctor
      }}</el-descriptions-item>
      <el-descriptions-item label="预约科室">
        <el-tag size="small">{{ info.department }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { UserInterface } from "@/utils/interface/user";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "UserRegistrationInfo",
  props: {
    info: {
      type: Object as PropType<UserInterface>,
      default: () => {},
    },
  },
  setup(props) {
    const router = useRouter();
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
          ElMessage({
            type: "success",
            message: "取消成功！",
          });
        })
        .catch(() => {});
    };
    /**
     * @description 评价
     */
    const evaluation = () => {
      router.push({ name: "Evaluation", params: { id: props.info.id } });
    };
    return { cancel, evaluation };
  },
});
</script>

<style lang="scss" scoped></style>
