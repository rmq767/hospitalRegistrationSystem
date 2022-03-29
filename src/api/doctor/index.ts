import request from "../http";

export default {
  /**
   * @description 获取医生分页列表
   * @param {object} data
   * @return {*}
   */
  apiGetDoctorList(data: object) {
    return request({
      url: "/doctor/getDoctorPage",
      method: "post",
      data,
    });
  },
  /**
   * @description 添加医生
   * @param {object} data
   * @return {*}
   */
  apiAddDoctor(data: object) {
    return request({
      url: "/doctor/addDoctor",
      method: "post",
      data,
    });
  },
  /**
   * @description 修改医生
   * @param {object} data
   * @param {number} id
   * @return {*}
   */
  apiEditDoctor(data: object) {
    return request({
      url: `/doctor/updateDoctor`,
      method: "put",
      data,
    });
  },
  /**
   * @description 删除医生
   * @param {number} id
   * @return {*}
   */
  apiDeleteDoctor(id: number) {
    return request({
      url: `/doctor/deleteDoctor/${id}`,
      method: "delete",
    });
  },
  /**
   * @description 获取指定医生工作时间
   * @param {*} params
   * @return {*}
   */
  apiGetWorkTime(params: object) {
    return request({
      url: "/workerSchedule/getWorkerScheduleById",
      method: "get",
      params,
    });
  },
};
