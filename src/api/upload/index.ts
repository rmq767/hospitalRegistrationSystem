import request from "../http";

export default {
  /**
   * @description 上传图片
   * @param {object} data
   * @return {*}
   */
  apiUpload(data: object) {
    return request({
      url: "/images/upload",
      method: "post",
    });
  },
};
