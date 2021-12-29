import { ElMessage } from "element-plus";

const baseMixin = {
  data() {
    return {
      uploadUrl: "https://jsonplaceholder.typicode.com/posts/",
    };
  },
  methods: {
    beforeAvatarUpload(file: File) {
      const isJPGorPNG =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPGorPNG) {
        ElMessage.error("图片必须是JPG或者PNG格式!");
      }
      if (!isLt2M) {
        ElMessage.error("图片大小不能超过2MB!");
      }
      return isJPGorPNG && isLt2M;
    },
  },
};

export default baseMixin;
