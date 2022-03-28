import request from "../http";

export default {
  /**
   * @description 获取评价分页列表
   * @param {object} data
   * @return {*}
   */
  apiGetEvaluationList(data: object) {
    return request({
      url: "/board/getBoardPage",
      method: "post",
      data,
    });
  },
  /**
   * @description 删除评价
   * @param {*} id
   * @return {*}
   */
  apiDeleteEvaluation(id: string) {
    return request({
      url: `/board/deleteBoard/${id}`,
      method: "delete",
    });
  },
};
