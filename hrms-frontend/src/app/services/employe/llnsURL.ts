import { NhanThan } from '../../modules/employee/hosonhansu/model/nhanthan';
import { BaseURL } from '../baseURL';
export class llnsURL extends BaseURL {
  static getDsNhanSu() {
    return `${this.getOrigin()}/employee/list`;
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
  static updateQTCTById(id) {
    return `${this.getOrigin()}/job-journey/update/${id}`;
  }
}
