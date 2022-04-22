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
   * @description 获取所有医生
   * @return {*}
   */
  apiGetAllDoctor() {
    return request({
      url: "/doctor/getDoctorList",
      method: "get",
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
   * @description 获取医生详情
   * @param {number} id
   * @return {*}
   */
  apiGetDoctorByID(id: string | number) {
    return request({
      url: `/doctor/getDoctorById/${id}`,
      method: "get",
    });
  },
  /**
   * @description 获取指定医生工作时间
   * @param {*} data
   * @return {*}
   */
  apiGetWorkTime(data: object) {
    return request({
      url: "/workerSchedule/getWorkerSchedulePage",
      method: "post",
      data,
    });
  },
  /**
   * @description 获取所有医生工作时间
   * @param {*} data
   * @return {*}
   */
  apiGetAllWorkTime(data: object) {
    return request({
      url: "/workerSchedule/getAllWorkerSchedulePage",
      method: "post",
      data,
    });
  },
  /**
   * @description 添加医生工作时间
   * @param {*} data
   * @return {*}
   */
  apiAddWorkTime(data: object) {
    return request({
      url: "/workerSchedule/addWorkerSchedule",
      method: "post",
      data,
    });
  },
  /**
   * @description 修改医生工作时间
   * @param {*} data
   * @return {*}
   */
  apiEditWorkTime(data: object) {
    return request({
      url: "/workerSchedule/updateWorkerSchedule",
      method: "put",
      data,
    });
  },
  /**
   * @description 修改医生工作时间
   * @param {*} data
   * @return {*}
   */
  apiDeleteWorkTime(id: object) {
    return request({
      url: `/workerSchedule/deleteWorkerSchedule/${id}`,
      method: "delete",
    });
  },
  /**
   * @description 就诊展示数据
   * @return {*}
   */
  apiGetStatistics(data: object) {
    return request({
      url: "/workerSchedule/getWorkerScheduleNum",
      method: "post",
      data,
    });
  },
  /**
   * @description 获取每月工作时间
   * @param {object} data
   * @return {*}
   */
  apiGetMonthTime(data: object) {
    return request({
      url: "/workerSchedule/getWorkerScheduleListByMonth",
      method: "post",
      data,
    });
  },
  /**
   * @description 就诊完成
   * @param {object} data
   * @return {*}
   */
  apiFinishSaw(data: object) {
    return request({
      url: "/subscribe/userSaw",
      method: "post",
      data,
    });
  },
};
