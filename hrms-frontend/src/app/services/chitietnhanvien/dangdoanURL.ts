import { BaseURL } from "../baseURL";

export class DangDoanURL extends BaseURL{
    
    static getDangDoanById(dangDoanId) {
        return `${this.getOrigin()}/military/getById/{id}`;
    }
    static updateDangDoan(dangDoanId) {
        return `${this.getOrigin()}/military/update/{id}`;
    }
    static getDangDoanByEmployeeId(employeeId) {
        return `${this.getOrigin()}/military/getByEmployeeId/{employeeId}`;
    }
    static getAllDangDoan() {
        return `${this.getOrigin()}/military/getAll`;
    }
    static createDangDoan(employeeId) {
        return `${this.getOrigin()}/military/createByEmployeeId/{employeeId}`;
    }
}