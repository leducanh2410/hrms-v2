import { BaseURL } from "../baseURL";

export class NangLuongLdpbURL extends BaseURL {
    static getThongtinNsChoXuLyNangLuong(donviId, departmentId) {
        return `${this.getOrigin()}/hrms/employe/v1/xuLyNangLuong/thongtinNsChoXuLyNangLuong/${donviId}/${departmentId}`;
    }

    static duyetNsDangKyNangLuong() {
        return `${this.getOrigin()}/hrms/employe/v1/xuLyNangLuong/duyetNsDangKyNangLuong`;
    }

    static getThongtinNsDaXuLyNangLuong(donviId, departmentId) {
        return `${this.getOrigin()}/hrms/employe/v1/xuLyNangLuong/thongtinNsDaXuLyNangLuong/${donviId}/${departmentId}`;
    }

    static xoaFileDinhKem() {
        return `${this.getOrigin()}/hrms/employe/v1/xuLyNangLuong/xoaFileDinhKem`;
    }

    static convertToPdf() {
        return `${this.getOrigin()}/hrms/employe/v1/file/convertToPdf`;
    }

    static huyXacNhan() {
        return `${this.getOrigin()}/hrms/employe/v1/xuLyNangLuong/huyXacNhan`;
    }
}