import { reactive } from "vue";

const rules = reactive({
  department: [{ required: true, message: "请输入科室名称", trigger: "blur" }],
  desc: [{ required: true, message: "请输入科室简介", trigger: "blur" }],
});

export default rules;
