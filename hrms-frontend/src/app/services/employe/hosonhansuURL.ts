
import { BaseURL } from "../baseURL";

export class HSNhansuURL extends BaseURL{    
    static getDsDonviTructhuoc(donviId: any) {
        return `${this.getOrigin()}/hrms/employe/v1/donvi/getDsDonviTructhuoc/${donviId}`;
    }

    static getAllListDonvi() {
        return `${this.getOrigin()}/hrms/employe/v1/donvi/getAllListDonvi`;
    }

    static getDsNsTheodonvi() {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/getDsNsCuaDonviFormSelect`;
    }

    static getHsNs(nsID: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/getHsNs/${nsID}`;
    }

    static genSohieuNS(donviId: any){
        return `${this.getOrigin()}/hrms/employe/v1/hoso/genSohieuNS/${donviId}`;
    }

    static getNganhSxID(donviId: any){
        return `${this.getOrigin()}/hrms/employe/v1/hoso/getNganhSxID/${donviId}`;
    }
    
    static getTenDvikyHDLD(donviId: any){
        return `${this.getOrigin()}/hrms/employe/v1/hoso/getTenDonviKyHdld/${donviId}`;
    }

    static validInfo() {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/validInfo`;
    }

    static insertNsLlns() {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/insertNsLlns`;
    }

    static updateNsLlns() {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/saveNsLlns`;
    }

    static deleteHsNs(nsID: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/deleteHoso/${nsID}`;
    }

    static getQtlamviec(nsID: any) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/getQtlamviecByNsId/${nsID}`;
    }

    static getDsLuong(nsID: any) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/getDsLuong/${nsID}`;
    }

    static xuatSyllMauEvn(nsID: any, isView: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/xuatSyllMauEvn/${nsID}/${isView}`;
    }

    static xuatSyllMau02c(nsID: any, isView: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/xuatSyllMau02c/${nsID}/${isView}`;
    }

    static xuatSyllMau02cTCTW(nsID: any, isView: any) {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/xuatSyllMau02cTCTW/${nsID}/${isView}`;
    }

    static saveAnhNs() {
        return `${this.getOrigin()}/hrms/employe/v1/hoso/saveAnhNs`;
    }

    static getAllHdld(nsID: any) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinhNhansu/getAllHdld/${nsID}`;
    }

    
    static getSohieuNs(nsId: any,donviId: any) {
        return `${this.getOrigin()}/hrms/employe/v1/common/getSohieuNs/${nsId}/${donviId}`;
    }

    static getDsNhansunghiviec2(donviId: any) {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/getDsNhansunghiviec2/${donviId}`;
    }

    static getLoaiTTrangNghiviec() {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/getLoaiTTrangNghiviec`;
    }

    static insertNsHdnghiviec() {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/insertNsHdnghiviec`;
    }
    
    static updateNsHdnghiviec() {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/updateNsHdnghiviec`;
    }

    static deleteNghiviec() {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/deleteNghiviec`;
    }

    

}