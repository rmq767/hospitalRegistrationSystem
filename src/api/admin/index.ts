import request from "../http";

export default {
  /**
   * @description 获取管理员分页列表
   * @param {object} data
   * @return {*}
   */
  apiGetAdminList(data: object) {
    return request({
      url: "/admin/getAdminPage",
      method: "post",
      data,
    });
  },
  /**
   * @description 添加管理员
   * @param {object} data
   * @return {*}
   */
  apiAddAdmin(data: object) {
    return request({
      url: "/admin/addAdmin",
      method: "post",
      data,
    });
  },
  /**
   * @description 修改管理员
   * @param {object} data
   * @param {number} id
   * @return {*}
   */
  apiEditAdmin(data: object, id: number) {
    return request({
      url: `/admin/updateAdmin/${id}`,
      method: "put",
      data,
    });
  },
  /**
   * @description 删除管理员
   * @param {number} id
   * @return {*}
   */
  apiDeleteAdmin(id: number) {
    return request({
      url: `/admin/deleteAdmin/${id}`,
      method: "delete",
    });
  },
};
