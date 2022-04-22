import { reactive } from "vue";
import { isIdCard } from "@/utils/validate";

const validateId = (rule: any, value: string, cb: Function) => {
  if (!value) {
    return cb(new Error("请输入身份证"));
  }
  if (!isIdCard(value)) {
    return cb(new Error("输入的身份证有误"));
  } else {
    return cb();
  }
};

export const userRegisterForm = reactive({
  username: [
    {
      required: true,
      message: "请输入姓名",
      trigger: "blur",
    },
  ],
  identityCard: [{ validator: validateId, trigger: "blur" }],
  phoneNumber: [
    {
      required: true,
      message: "请输入姓名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
  passwordAgain: [
    {
      required: true,
      message: "请确认密码",
      trigger: "blur",
    },
  ],
});
