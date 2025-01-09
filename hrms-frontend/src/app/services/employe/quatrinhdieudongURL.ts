import { BaseURL } from "../baseURL";

export class QuatrinhDieuDongURL extends BaseURL{
    static getAllQuatrinhDDTChuyen(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/getAllQuatrinhDDTChuyen/${nsId}`;
    }

    static validInfoDieudong() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/validInfoDieudong`;
    }

    static insertNsDdtchuyen() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/insertNsDdtchuyen`;
    }
    static updateNsDdtchuyen() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/updateNsDdtchuyen`;
    }
    static deleteDieudongthuyenchuyen(id) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/deleteDieudongthuyenchuyen/${id}`;
    }

    static xuatExcel(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/xuatExcelQtdieudong/${nsId}`;
    }
    
}