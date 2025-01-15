import { NhanThan } from '../../modules/employee/hosonhansu/model/nhanthan';
import { BaseURL } from '../baseURL';
export class llnsURL extends BaseURL {
  static getDsNhanSu() {
    return `${this.getOrigin()}/employee/list`;
  }

  static getDsById(id) {
    return `${this.getOrigin()}/employee/findById/${id}`;
  }

  static updateNhanSu(id) {
    return `${this.getOrigin()}/employee/update/${id}`;
  }

  static createNhanSu() {
    return `${this.getOrigin()}/employee/create`;
  }

  // nhan than
  static createNhanThanByEmpId(id) {
    return `${this.getOrigin()}/family/createByEmployeeId/${id}`;
  }

  static updateNhanThanById(id) {
    return `${this.getOrigin()}/family/update/${id}`;
  }

  static deleteNhanThanById(id) {
    return `${this.getOrigin()}/family/deleteById/${id}`;
  }

  static getAllNhanThanByEmpId(id) {
    return `${this.getOrigin()}/family/getByEmployeeId/${id}`;
  }

  static getNhanThanById(id) {
    return `${this.getOrigin()}/family/getById/${id}`;
  }

  // danh gia
  static createDanhGiaByEmpId(id) {
    return `${this.getOrigin()}/family/createByEmployeeId`;
  }

  // qua trinh cong tac
  static createQTCTByEmpId(empId) {
    return `${this.getOrigin()}/job-journey/create/${empId}`;
  }

  static updateQTCTById(id) {
    return `${this.getOrigin()}/job-journey/update/${id}`;
  }

  static deleteQTCT(id) {
    return `${this.getOrigin()}/job-journey/delete/${id}`;
  }

  static getQTCTByEmpId(empId) {
    return `${this.getOrigin()}/job-journey/getByEmpId/${empId}`;
  }

  static getQTCTById(id) {
    return `${this.getOrigin()}/job-journey/getById/${id}`;
  }

  // dang doan
  static updateDangDoan(id) {
    return `${this.getOrigin()}/military/update/${id}`;
  }
}
