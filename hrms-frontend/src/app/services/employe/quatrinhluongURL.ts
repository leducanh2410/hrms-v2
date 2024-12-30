import { BaseURL } from "../baseURL";

export class QuatrinhLuongURL extends BaseURL {
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

    static xuatExcel(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/xuatExcelQtLuong/${nsId}`;
    }

    static xuatExcelQtLuongDieuchinh(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/xuatExcelQtLuongDieuchinh/${nsId}`;
    }

    static xuatExcelPhucap(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/xuatExcelQtPhucap/${nsId}`;
    }
    

    static getThoiGianNangLuongLanSau(ngayhieuluc, bacluongId, donviId) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/getThoiGianNangLuongLanSau/${ngayhieuluc}/${bacluongId}/${donviId}`;
    }

    static getDsNsPhucap(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/getDsNsPhucap/${nsId}`;
    }
    
    static insertNsPhucap() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/insertNsPhucap`;
    }

    static updateNsPhucap() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/updateNsPhucap`;
    }

    static deleteNsPhucap(id) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/deleteNsPhucap/${id}`;
    }

    static getDsLuongDieuchinh(nsID) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/getDsLuongDieuchinh/${nsID}`;
    }

    static insertNsLuongDieuchinh() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/insertNsLuongDieuchinh`;
    }

    static updateNsLuongDieuchinh() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/updateNsLuongDieuchinh`;
    }

    static deleteNsLuongDieuchinh(id) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/deleteNsLuongDieuchinh/${id}`;
    }

    static getLBacluongForSearch(luongCode,mangachluong,bac) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/getLBacluongForSearch/${luongCode}/${mangachluong}/${bac}`;
    }
    
}