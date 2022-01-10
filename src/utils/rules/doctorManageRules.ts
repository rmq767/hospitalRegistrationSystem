import { reactive } from "vue";
/**
 * @description 验证身份证
 */
// const validateId = (rule: any, value: string, callback: Function) => {
//   if (!isIdCard(value)) {
//     callback(new Error("身份证号码不正确"));
//   } else {
//     callback();
//   }
// };

const rules = reactive({
  name: [{ required: true, message: "请输入医生姓名", trigger: "blur" }],
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  age: [{ required: true, message: "输入年龄", trigger: "blur" }],
});

export default rules;
