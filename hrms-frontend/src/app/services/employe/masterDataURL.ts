import { BaseURL } from '../baseURL';

export class MasterDataURL extends BaseURL {
  static getAllVPLamViec() {
    return `${this.getOrigin()}/master/getAllVPLamViec`;
  }

  static getAllThanhPhanNS() {
    return `${this.getOrigin()}/master/getAllThanhPhanNS`;
  }

  static getAllPhapNhan() {
    return `${this.getOrigin()}/master/getAllPhapNhan`;
  }

  static getAllNghiepVu() {
    return `${this.getOrigin()}/master/getAllNghiepVu`;
  }

  static getAllDepartments() {
    return `${this.getOrigin()}/master/getAllDepartments`;
  }

  static getAllLoaiLaoDong() {
    return `${this.getOrigin()}/master/getAllLoaiLaoDong`;
  }

  static getAllDongXe() {
    return `${this.getOrigin()}/master/getAllDongXe`;
  }

  static getAllChucDanh() {
    return `${this.getOrigin()}/master/getAllChucDanh`;
  }

  static getAllCapDoNS() {
    return `${this.getOrigin()}/master/getAllCapDoNS`;
  }

  static getAllLoaiQTCT() {
    return `${this.getOrigin()}/master/getAllLoaiQTCT`;
  }
}
