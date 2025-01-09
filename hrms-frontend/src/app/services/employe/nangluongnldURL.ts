import { BaseURL } from "../baseURL";

export class NangLuongNldURL extends BaseURL {
    static getLuongNhanSuHienHuong(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/dangKyNangLuong/luongNhanSuHienHuong/${nsId}`;
    }

    static getLuongDangKyGanNhat(luongId) {
        return `${this.getOrigin()}/hrms/employe/v1/dangKyNangLuong/luongDangKyGanNhat/${luongId}`;
    }

    static getThongTinNhanSuDangKyNangLuong(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/dangKyNangLuong/thongTinNhanSuDangKyNangLuong/${nsId}`;
    }

    static getThongTinDangKyNangLuongGanNhatByNsId(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/dangKyNangLuong/thongTinDangKyNangLuongGanNhatByNsId/${nsId}`;
    }

    static checkDapUngDkNangLuongByNsId(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/dangKyNangLuong/checkDapUngDkNangLuong/${nsId}`;
    }

    static getDsKhenThuongByNsId(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/dangKyNangLuong/getDsKhenThuong/${nsId}`;
    }

    static getDsKyLuatByNsId(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/dangKyNangLuong/getDsKyLuat/${nsId}`;
    }

    static insertThongTinDangKy() {
        return `${this.getOrigin()}/hrms/employe/v1/dangKyNangLuong/insertThongTinDangKy`;
    }

    static convertToPdf() {
        return `${this.getOrigin()}/hrms/employe/v1/file/convertToPdf`;
    }
}