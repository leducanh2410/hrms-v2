import { BaseURL } from "../baseURL";

export class TrinhDoTinHocURL extends BaseURL{
    
    static getChungChiTinHocById(ccthId) {
        return `${this.getOrigin()}/it-certificate/getById/{id}`;
    }
    static updateChungChiTinHoc(ccthId) {
        return `${this.getOrigin()}/it-certificate/update/{id}`;
    }
    static getChungChiTinHocByEmployeeId(employeeId) {
        return `${this.getOrigin()}/it-certificate/getByEmplouyeeId/{employeeId}`;
    }
    static getAllChungChiTinHoc() {
        return `${this.getOrigin()}/it-certificate/getAll`;
    }
    static createChungChiTinHoc(employeeId) {
        return `${this.getOrigin()}/it-certificate/createByEmployeeId/{employeeId}`;
    }
}