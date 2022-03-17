import { isPhone } from "./../validate";
import { reactive } from "vue";
/**
 * @description 验证手机号
 */
const checkPhone = (rule: any, value: string, callback: Function) => {
  if (!isPhone(value)) {
    callback(new Error("手机号码不正确"));
  } else {
    callback();
  }
};

const rules = reactive({
  username: [{ required: true, message: "请输入医生姓名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  phoneNumber: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { validator: checkPhone, trigger: "blur" },
  ],
});

export default rules;
