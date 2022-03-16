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
   * @description 修改病人
   * @param {object} data
   * @param {number} id
   * @return {*}
   */
  apiEditUser(data: object, id: number) {
    return request({
      url: `/user/updateUser/${id}`,
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
};
