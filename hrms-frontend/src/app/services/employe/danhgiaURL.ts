import { BaseURL } from "../baseURL";

export class DanhGiaURL extends BaseURL{
    static getAllDotDanhGia() {
        return `${this.getOrigin()}/master/getAllDotDanhGia`;
    }
}