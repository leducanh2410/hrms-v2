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
}