import { BaseURL } from "../baseURL";

export class BaoHiemURL extends BaseURL{
    static updateBaoHiem(chungTuId) {
        return `${this.getOrigin()}/insurance-certificate/update/{chungTuId}`;
    }
    static createBaoHiem(baoHiemId) {
        return `${this.getOrigin()}/insurance-certificate/createByInssuranceId/{baoHiemId}`;
    }
    static getAllBaoHiem() {
        return `${this.getOrigin()}/insurance-certificate/list`;
    }
    
}