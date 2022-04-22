import { reactive } from "vue";

const rules = reactive({
  updateTime: [
    { required: true, message: "请选择预约日期", trigger: ["change", "blur"] },
  ],
  subscribeTime: [
    { required: true, message: "请选择预约时间", trigger: ["change", "blur"] },
  ],
});

export default rules;
