import { isIdCard } from "@/utils/validate";
/**
 * @description 验证身份证
 */
const validateId = (rule: any, value: string, callback: Function) => {
  if (!isIdCard(value)) {
    callback(new Error("身份证号码不正确"));
  } else {
    callback();
  }
};

const rules = {
  name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
  id: [
    { required: true, message: "请输入身份证号码", trigger: "blur" },
    { validator: validateId, trigger: "blur" },
  ],
  date: [
    { required: true, message: "请选择预约时间", trigger: ["change", "blur"] },
  ],
};

export default rules;
