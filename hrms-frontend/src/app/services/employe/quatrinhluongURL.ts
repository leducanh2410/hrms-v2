import { BaseURL } from "../baseURL";

export class QuatrinhLuongURL extends BaseURL {
    static getNsLuong(nsId) {
        return `${this.getOrigin()}/salary/getByEmployeeId/${nsId}`;
    }

    static getAllNgachLuong() {
        return `${this.getOrigin()}/master/getAllNgachLuong`;
    }

    static getAllBacLuong() {
        return `${this.getOrigin()}/master/getAllBacLuong`;
    }

    static insertNsLuong() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/insertNsLuong`;
    }

    static updateNsLuong() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/updateNsLuong`;
    }

    static validInfoLuong() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/validInfoLuong`;
    }

    static deleteNsLuong(id) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/deleteNsLuong/${id}`;
    }
}