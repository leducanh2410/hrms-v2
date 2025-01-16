import { BaseURL } from "../baseURL";

export class ChiTietNhanvienURL extends BaseURL{
    static getChiTietNhanVien() {
        return `${this.getOrigin()}/employee/list`;
    }
}