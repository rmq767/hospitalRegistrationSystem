<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="dialogTitle"
    center
    width="30%"
  >
    <el-form :model="form" label-width="100px" :rules="rules" ref="ruleFormRef">
      <el-form-item label="医生" prop="doctorId">
        <el-select v-model="form.doctorId" filterable>
          <el-option
            v-for="item in doctors"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="日期：" prop="updateTime">
        <el-date-picker
          v-model="form.updateTime"
          type="date"
          placeholder="日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="时间：" prop="workTime">
        <el-radio-group v-model="form.workTime">
          <el-radio label="上午">上午</el-radio>
          <el-radio label="下午">下午</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="onSubmit(ruleFormRef)"
          >添加</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import api from "@/api";
import { ElMessage, FormInstance } from "element-plus";
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  watch,
  getCurrentInstance,
  onMounted,
  nextTick,
} from "vue";

interface InfoForm {
  doctorId: string;
  workTime: string;
  updateTime: string;
}
export default defineComponent({
  name: "AddTimeForm",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["submitForm"],
  setup(props, { emit }) {
    const { ctx } = getCurrentInstance() as any;
    const ruleFormRef = ref<FormInstance>();
    const state = reactive({
      dialogFormVisible: false,
      form: {
        doctorId: "",
        workTime: "上午",
        updateTime: "",
      },
      dialogTitle: "",
      isEdit: false,
      doctors: [],
    });
    const rules = reactive({
      doctorId: [
        {
          type: "string",
          required: true,
          message: "请选择医生",
          trigger: "change",
        },
      ],
      updateTime: [
        {
          type: "date",
          required: true,
          message: "请选择日期",
          trigger: "change",
        },
      ],
      workTime: [
        {
          type: "string",
          required: true,
          message: "请选择时间",
          trigger: "change",
        },
      ],
    });
    /**
     * @description 获取医生下拉
     */
    const getAllDoctor = async () => {
      try {
        const response = await api.doctor.apiGetAllDoctor();
        if (response.data.code === 200) {
          state.doctors = response.data.data;
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
    };
    const open = () => {
      state.dialogFormVisible = true;
    };
    const close = () => {
      state.dialogFormVisible = false;
    };
    const onSubmit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          emit("submitForm", { isEdit: state.isEdit, form: state.form });
        } else {
          return false;
        }
      });
    };
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
      close();
    };
    watch(
      () => props.data,
      (newValue) => {
        if (newValue) {
          state.dialogTitle = "编辑工作时间";
          state.isEdit = true;
          nextTick(() => {
            state.form = newValue as InfoForm;
          });
        } else {
          state.dialogTitle = "新增工作时间";
          state.isEdit = false;
          ruleFormRef.value?.resetFields();
        }
      }
    );
    onMounted(() => {
      getAllDoctor();
    });
    return {
      ...toRefs(state),
      rules,
      onSubmit,
      resetForm,
      open,
      close,
      ruleFormRef,
    };
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
