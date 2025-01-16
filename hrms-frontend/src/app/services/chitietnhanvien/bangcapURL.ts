import { BaseURL } from "../baseURL";

export class BangCapURL extends BaseURL{
    static searchBangCap() {
        return `${this.getOrigin()}/professional-certificate/search`;
    }
    static getBangCapById(bangCapId) {
        return `${this.getOrigin()}/professional-certificate/getById/{id}`;
    }
    static updateBangCap(bangCapId) {
        return `${this.getOrigin()}/professional-certificate/update/{id}`;
    }
    static getBangCapByEmployeeId(employeeId) {
        return `${this.getOrigin()}/professional-certificate/getByEmplouyeeId/{employeeId}`;
    }
    static getAllBangCap() {
        return `${this.getOrigin()}/professional-certificate/getAll`;
    }
    static createBangCap(employeeId) {
        return `${this.getOrigin()}/professional-certificate/createByEmployeeId/{employeeId}`;
    }
}