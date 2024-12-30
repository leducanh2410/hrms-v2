import { BaseURL } from "../baseURL";

export class QuatrinhLamviecURL extends BaseURL{
    
    static insertQtlamviec() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/insertQtlamviec`;
    }

    static updateQtlamviec() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/updateNsQtlamviec`;
    }

    static deleteQtlamviec(id) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/deleteQtlamviec/${id}`;
    }
    static getAllQtcv(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/getAllQtcv/${nsId}`;
    }
    
    static insertNsChucvu() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/insertNsChucvu`;
    }

    static loadQtlamviec(){
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/loadQtlamviec`;
    }

    static updateNsChucvu() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/updateNsChucvu`;
    }


    static deleteNsChucvu(cvId) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/deleteNsChucvu/${cvId}`;
    }
    

    static xuatExcel(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/xuatExcelQtlamviec/${nsId}`;
    }

    static getAllTTrangHD() {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/getAllTTrangHD`;
    }

    static insertHdld() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/insertHdld`;
    }

    static updateHdld() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/updateHdld`;
    }

    static deleteHdld() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/deleteHopdonglaodong`;
    }

    static getHdldSelected(hdID) {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/getHdldSelected/${hdID}`;
    }

    
    //-------------------- qua trinh doan the ---------------------------------
    static getDsNsCvudthe(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/getDsNsCvudthe/${nsId}`;
    }

    static insertNsCvuDthe() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/insertNsCvuDthe`;
    }

    static updateNsCvuDthe() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/updateNsCvuDthe`;
    }

    static deleteNsCvuDthe(nsCvudtheId) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/deleteNsCvuDthe/${nsCvudtheId}`;
    }

    static checkNgayHieuLucQTLVChuyenTrach() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/checkNgayHieuLucQTLVChuyenTrach`;
    }

    static getNsCvuDtheUnique() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/getNsCvuDtheUnique`;
    }

    static validQtlamviec() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/validQtlamviec`;
    }
    
    static validXoaQtLamviec() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/validXoaQtLamviec`;
    }
    

}