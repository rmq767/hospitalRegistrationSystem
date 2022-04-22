import request from "../http";

export default {
  /**
   * @description 获取管理员登录
   * @param {object} data
   * @return {*}
   */
  apiAdminLogin(data: object) {
    return request({
      url: "/admin/Login",
      method: "post",
      data,
    });
  },
};
