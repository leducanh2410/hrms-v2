import { BaseURL } from "../baseURL";

export class DanhGiaURL extends BaseURL{
    static getAllDotDanhGia() {
        return `${this.getOrigin()}/master/getAllDotDanhGia`;
    }

    static getDanhGiaById(id) {
        return `${this.getOrigin()}/review/getById/${id}`;
    }

    static deleteDanhGia(id) {
        return `${this.getOrigin()}/review/delete/${id}`;
    }

    static createDanhGiaByEmplId(epmId) {
        return `${this.getOrigin()}/review/createByEmployeeId/${epmId}`;
    }

    static updateDanhGia(id) {
        return `${this.getOrigin()}/review/update/${id}`;
    }

    static getDanhGiaByEmpId(epmId) {
        return `${this.getOrigin()}/review/getByEmplouyeeId/${epmId}`;
    }
}