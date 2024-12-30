import { BaseURL } from "../baseURL";

export class QuytrinhLuongURL extends BaseURL {
    static getDanhSachNL(namSelected) {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/getDanhSachNL/${namSelected}`;
    }

    static getNsDanhsachLuongByTkiemid(tkiemId) {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/getNsDanhsachLuongByTkiemid/${tkiemId}`;
    }

    static xoaFileduthao() {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/xoaFileduthao`;
    }

    static taoDuthao() {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/taoDuthao`;
    }

    static taoDuthaoTapthe() {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/taoDuthaoTapthe`;
    }

    static checkTrangthaiChuyenDthaosangDO() {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/checkTrangthaiChuyenDthaosangDO`;
    }


    static uploadFileDuthao() {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/uploadFileDuthao`;
    }

    static getFileDuthao(objId,isTapthe) {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/getFileDuthao/${objId}/${isTapthe}`;
    }

    static insertNsTimkiemDsachtk() {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/insertNsTimkiemDsachtk`;
    }

    static updateNsTimkiemDsachtk() {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/updateNsTimkiemDsachtk`;
    }

    static capnhatdsnhansuNangluong() {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/capnhatdsnhansuNangluong`;
    }

    static capnhatdsTabDenhanNL() {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/capnhatdsTabDenhanNL`;
    }    

    
    static checkTrangthaiKhiSuaXoa() {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/checkTrangthaiKhiSuaXoa`;
    }

    static chuyencaptren() {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/chuyencaptren`;
    }

    static getDanhSachNhanSu(donviId) {
        return `${this.getOrigin()}/hrms/employe/v1/chonNhanSu/danhSachNhanSu/${donviId}`;
    }

    static getDanhSachDonViTrucThuoc(donviId) {
        return `${this.getOrigin()}/hrms/employe/v1/donvi/getDsDonviTructhuoc/${donviId}`;
    }

    static refreshInfoDsNsLuong() {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/refreshInfoDsNsLuong`;
    }

    static getDsNangluongForTimkiem(donviId, nam) {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/getDsNangluongForTimkiem/${donviId}/${nam}`;
    }

    static timkiemDsNangluong() {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/timkiemDsNangluong`;
    }


    static deleteNsDanhsachLuong(dsnangluongId) {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/deleteNsDanhsachLuong/${dsnangluongId}`;
    }

    static deleteDsNangLuong(nsTimkiemDsachtkId) {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/deleteDsNangLuong/${nsTimkiemDsachtkId}`;
    }

    static getDsDonviTructhuoc(donviId) {
        return `${this.getOrigin()}/hrms/employe/v1/donvi/getDsDonviTructhuoc/${donviId}`;
    }

    static xuatExcelDsNangluong() {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/xuatExcelDsNangluong`;
    }

    static getDsNhansuDenhanNL(fDate, tDate, donviTTSelectedId, gomTT, isCongNhan) {
        return `${this.getOrigin()}/hrms/employe/v1/quytrinhluong/getDsNhansuDenhanNL/${fDate}/${tDate}/${donviTTSelectedId}/${gomTT}/${isCongNhan}`;
    }


}