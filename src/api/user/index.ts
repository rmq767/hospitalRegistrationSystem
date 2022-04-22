import request from "../http";

export default {
  /**
   * @description 获取病人分页列表
   * @param {object} data
   * @return {*}
   */
  apiGetUserList(data: object) {
    return request({
      url: "/user/getUserPage",
      method: "post",
      data,
    });
  },
  /**
   * @description 添加病人
   * @param {object} data
   * @return {*}
   */
  apiAddUser(data: object) {
    return request({
      url: "/user/addUser",
      method: "post",
      data,
    });
  },

  /**
   * @description 注册
   * @param {object} data
   * @return {*}
   */
  apiUserRegister(data: object) {
    return request({
      url: "/user/userRegister",
      method: "post",
      data,
    });
  },
  /**
   * @description 修改病人
   * @param {object} data
   * @param {number} id
   * @return {*}
   */
  apiEditUser(data: object) {
    return request({
      url: `/user/updateUser`,
      method: "put",
      data,
    });
  },
  /**
   * @description 删除病人
   * @param {number} id
   * @return {*}
   */
  apiDeleteUser(id: number | string) {
    return request({
      url: `/user/deleteUser/${id}`,
      method: "delete",
    });
  },
  /**
   * @description 获取病人预约列表
   * @param {*} data
   * @return {*}
   */
  apiGetUserSubscribe(data: object) {
    return request({
      url: "/subscribe/getUserByDoctorIdPage",
      method: "post",
      data,
    });
  },
  /**
   * @description 获取本人预约
   * @param {string} id
   * @return {*}
   */
  apiGetUserSubscribeById(data: object) {
    return request({
      url: `/subscribe/getSubscribeByUser`,
      method: "post",
      data,
    });
  },
  /**
   * @description 用户修改密码
   * @param {object} data
   * @return {*}
   */
  apiChangePwd(data: object) {
    return request({
      url: "/user/updateUserPassword",
      method: "put",
      data,
    });
  },
  /**
   * @description 取消预约
   * @param {object} data
   * @return {*}
   */
  apiCancelSubscribe(data: object) {
    return request({
      url: "/subscribe/cancelSubscribe",
      method: "post",
      data,
    });
  },
  /**
   * @description 添加评论
   * @param {object} data
   * @return {*}
   */
  apiAddCommon(data: object) {
    return request({
      url: "/board/addBoard",
      method: "post",
      data,
    });
  },
  /**
   * @description 预约
   * @param {object} data
   * @return {*}
   */
  apiAddSubscribe(data: object) {
    return request({
      url: "/subscribe/addSubscribe",
      method: "post",
      data,
    });
  },
};
