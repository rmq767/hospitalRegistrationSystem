import request from "../http";

export default {
  /**
   * @description 获取公告分页列表
   * @param {object} data
   * @return {*}
   */
  apiGetAnnouncementList(data: object) {
    return request({
      url: "/announcement/getAnnouncementPage",
      method: "post",
      data,
    });
  },
  /**
   * @description 添加公告
   * @param {object} data
   * @return {*}
   */
  apiAddAnnouncement(data: object) {
    return request({
      url: "/announcement/addAnnouncement",
      method: "post",
      data,
    });
  },
  /**
   * @description 修改公告
   * @param {object} data
   * @param {number} id
   * @return {*}
   */
  apiEditAnnouncement(data: object) {
    return request({
      url: `/announcement/updateAnnouncement`,
      method: "put",
      data,
    });
  },
  /**
   * @description 删除公告
   * @param {number} id
   * @return {*}
   */
  apiDeleteAnnouncement(id: number) {
    return request({
      url: `/announcement/deleteAnnouncement/${id}`,
      method: "delete",
    });
  },
  /**
   * @description 根据ID获取对应公告
   * @param {object} params
   * @return {*}
   */
  apiGetAnnouncementById(params: object) {
    return request({
      url: "/announcement/getAnnouncementById",
      method: "get",
      params,
    });
  },
};
