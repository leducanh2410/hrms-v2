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

  static getNSByOfficeId(id){
    return `${this.getOrigin()}/employee/findByOfficeId/${id}`;
  }

  static searchNhanSu(keyword){
    return `${this.getOrigin()}/employee/searchEmployee/${keyword}`;
  }

  static deleteNhanSu(id){
    return `${this.getOrigin()}/employee/delete/${id}`;
  }

  static uploadAnhNS(id){
    return `${this.getOrigin()}/employee/uploadAvatar/${id}`;
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


  // region
  static getDSThanhPho(){
    return `${this.getOrigin()}/master/getAllThanhPho`;
  }
  static getDSQuanHuyen(){
    return `${this.getOrigin()}/master/getAllQuanHuyen`;
  }
  static getDSPhuongXa(){
    return `${this.getOrigin()}/master/getAllPhuongXa`;
  }
}
