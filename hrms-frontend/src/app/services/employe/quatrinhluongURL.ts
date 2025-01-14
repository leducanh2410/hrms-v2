import { BaseURL } from "../baseURL";

export class QuatrinhLuongURL extends BaseURL {
    static getNsLuong(nsId) {
        return `${this.getOrigin()}/salary/getByEmployeeId/${nsId}`;
    }
    static getNsLuongById(nsId) {
        return `${this.getOrigin()}/salary/getById/${nsId}`;
    }

    static getAllNgachLuong() {
        return `${this.getOrigin()}/master/getAllNgachLuong`;
    }

    static getAllBacLuong() {
        return `${this.getOrigin()}/master/getAllBacLuong`;
    }

    static deleteNSLuong(id){
        return `${this.getOrigin()}/salary/delete/${id}`; 
    }

    static updateNSLuong(id){
        return `${this.getOrigin()}/salary/update/${id}`; 
    }

    static createNSLuongByEmpId(empId){
        return `${this.getOrigin()}/salary/createByEmployeeId/${empId}`; 
    }
}