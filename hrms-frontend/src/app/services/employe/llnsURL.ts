import { BaseURL } from "../baseURL";
export class llnsURL extends BaseURL{

    static getDsPTGiaDinh(idns: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/getNsLlnsGiadinhByNsId/${idns}`;
    }

    static insertPTGiaDinh() {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/insertNsLlnsGiadinh`;
    }

    static deletePTGiaDinh(nsGiadinhId: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/deleteNsLlnsGiadinh/${nsGiadinhId}`;
    }

    static updatePTGiaDinh() {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/updateNsLlnsGiadinh`;
    }

    //------------------------ người phụ thuộc ----------------------------------
    static getDsNguoiPT(idns: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/getNsLlnsPhuthuocByNsId/${idns}`;
    }

    static insertNguoiPT() {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/insertNsLlnsPhuthuoc`;
    }

    static updateNguoiPT() {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/updateNsLlnsPhuthuoc`;
    }

    static deleteNguoiPT(id: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/deleteNsLlnsPhuthuoc/${id}`;
    }

    //------------------------ khen thuong ----------------------------------
    static getDsKhenthuong(idns: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/getNsKhenthuongByNsId/${idns}`;
    }

    static saveKhenthuong() {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/saveNsKhenthuong`;
    }

    static deleteKhenthuong(id: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/deleteNsKhenthuong/${id}`;
    }

    static getFileKhenThuong(ktId: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/getFileKhenThuong/${ktId}`;
    }
    //------------------------ ky luay ----------------------------------
    static getDsKyluat(idns: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/getNsKyluatByNsId/${idns}`;
    }

    static saveKyluat() {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/saveNsKyluat`;
    }

    static deleteKyluat(id: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/deleteNsKyluat/${id}`;
    }

    //------------------------ nganh nghe sxkd ----------------------------------
    static getNsNganhkteByNsID(nsId: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/getNsNganhkteByNsID/${nsId}`;
    }

    static saveQtSXKD() {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/saveQtSXKD`;
    }

    static deleteNsNganhkte(id: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/deleteNsNganhkte/${id}`;
    }

    static getTdktSangkienByNsId(nsID: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/getTdktSangkienByNsId/${nsID}`;
    }

    static getNsGiaytoByNsId(nsID: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/getNsGiaytoByNsId/${nsID}`;
    }

    static saveNsGiayto(nsID: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/saveNsGiayto/${nsID}`;
    }

    static getFileHosoGiayto(nsHsGtId: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/getFileHosoGiayto/${nsHsGtId}`;
    }

    static deleteNsGiayto(nsHsGtId: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/deleteNsGiayto/${nsHsGtId}`;
    }


    //------------------------------- dieu dong thuyen chuyen ---------------------------------
    static getDsQdDieudong(nam: any,selectedDdnb: any) {
        return `${this.getOrigin()}/hrms/employe/v1/dieudong/getDsQdDieudong/${nam}/${selectedDdnb}`;
    }

    static getDsNsDdByQd(qdId: any) {
        return `${this.getOrigin()}/hrms/employe/v1/dieudong/getDsNsDdByQd/${qdId}`;
    }

    static updateNsDdtchuyenNhieuNs() {
        return `${this.getOrigin()}/hrms/employe/v1/dieudong/updateNsDdtchuyenNhieuNs`;
    }

    static insertNsDdtchuyenNhieuNs() {
        return `${this.getOrigin()}/hrms/employe/v1/dieudong/insertNsDdtchuyenNhieuNs`;
    }



    static temporaryDeleteDdtchuyenNhieuNs() {
        return `${this.getOrigin()}/hrms/employe/v1/dieudong/temporaryDeleteDdtchuyenNhieuNs`;
    }

    static getDsNsDdChuyen(donviId: any,nam: any,checkAll: any) {
        return `${this.getOrigin()}/hrms/employe/v1/dieudong/getDsNsDdChuyen/${donviId}/${nam}/${checkAll}`;
    }
    static getThongtinTuDonvicu(donviId: any,nsId: any) {
        return `${this.getOrigin()}/hrms/employe/v1/dieudong/getThongtinTuDonvicu/${donviId}/${nsId}`;
    }

    static getNsDdtchuyenNhanByNsId(nsId: any) {
        return `${this.getOrigin()}/hrms/employe/v1/dieudong/getNsDdtchuyenNhanByNsId/${nsId}`;
    }

    static nhanNhansu() {
        return `${this.getOrigin()}/hrms/employe/v1/dieudong/nhanNhansu`;
    }
    //------------------------------- danh sach nhan su ---------------------------------
    static getDsNhanSu() {
        return `${this.getOrigin()}/employee/list`;
    }

    static khongnhanhoso(checkAll: any) {
        return `${this.getOrigin()}/hrms/employe/v1/dieudong/khongnhanhoso/${checkAll}`;
    }

    static getDsCBQLDuongchuc(donviId: any, capQuanly: any, hthiTructhuoc: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/getDsCBQLDuongchuc/${donviId}/${capQuanly}/${hthiTructhuoc}`;
    }

    static getDsCBQLQuyhoach(donviId: any, capQuanly: any, hthiTructhuoc: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/getDsCBQLQuyhoach/${donviId}/${capQuanly}/${hthiTructhuoc}`;
    }

    static getDsCBQLCuaDonvi(donviId: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/getDsCBQLCuaDonvi/${donviId}`;
    }
}
