import { BaseURL } from "../baseURL";

export class HopDongURL extends BaseURL{
    static getContractCurrentByEmployeeId(employeeId) {
        return `${this.getOrigin()}/contract/getContractCurrentByEmployeeId/{employeeId}`;
    }
    static updateContract(contractId) {
        return `${this.getOrigin()}/contract/update/{id}`;
    }
    static createContract(employeeId) {
        return `${this.getOrigin()}/contract/createByEmployeeId/{employeeId}`;
    }
    static getContractById(contractId) {
        return `${this.getOrigin()}/contract/getById/{id}`;
    }
    static getContractByEmployeeId(employeeId) {
        return `${this.getOrigin()}/contract/getByEmplouyeeId/${employeeId}`;
    }
    static getAllContract() {
        return `${this.getOrigin()}/contract/getAll`;
    }
}