import request from "../http";

export default {
  /**
   * @description 获取科室分页列表
   * @param {object} data
   * @return {*}
   */
  apiGetAdministrativeList(data: object) {
    return request({
      url: "/administrative/getAdministrativePage",
      method: "post",
      data,
    });
  },
  /**
   * @description 添加科室
   * @param {object} data
   * @return {*}
   */
  apiAddAdministrative(data: object) {
    return request({
      url: "/administrative/addAdministrative",
      method: "post",
      data,
    });
  },
  /**
   * @description 修改科室
   * @param {object} data
   * @param {number} id
   * @return {*}
   */
  apiEditAdministrative(data: object) {
    return request({
      url: `/administrative/updateAdministrative`,
      method: "put",
      data,
    });
  },
  /**
   * @description 删除科室
   * @param {number} id
   * @return {*}
   */
  apiDeleteAdministrative(params: object) {
    return request({
      url: `/administrative/deleteAdministrative`,
      method: "delete",
      params,
    });
  },
  /**
   * @description 根据ID获取对应科室
   * @param {object} params
   * @return {*}
   */
  apiGetAdministrativeById(params: object) {
    return request({
      url: "/administrative/getAdministrativeById",
      method: "get",
      params,
    });
  },
  /**
   * @description 获取所有科室
   * @return {*}
   */
  apiGetAllAdministrative() {
    return request({
      url: "/administrative/getAdministrativeList",
      method: "get",
    });
  },
};
