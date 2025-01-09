
import { BaseURL } from "../baseURL";

export class HSNhansuURL extends BaseURL{    
    static getDsDonviTructhuoc(donviId: any) {
        return `${this.getOrigin()}/donvi/getDsDonviTructhuoc/${donviId}`;
    }

    static getAllListDonvi() {
        return `${this.getOrigin()}/donvi/getAllListDonvi`;
    }

    static getDsNsTheodonvi() {
        return `${this.getOrigin()}/hoso/getDsNsCuaDonviFormSelect`;
    }

    static getHsNs(nsID: any) {
        return `${this.getOrigin()}/hoso/getHsNs/${nsID}`;
    }

    static genSohieuNS(donviId: any){
        return `${this.getOrigin()}/hoso/genSohieuNS/${donviId}`;
    }

    static getNganhSxID(donviId: any){
        return `${this.getOrigin()}/hoso/getNganhSxID/${donviId}`;
    }
    
    static getTenDvikyHDLD(donviId: any){
        return `${this.getOrigin()}/hoso/getTenDonviKyHdld/${donviId}`;
    }

    static validInfo() {
        return `${this.getOrigin()}/hoso/validInfo`;
    }

    static insertNsLlns() {
        return `${this.getOrigin()}/hoso/insertNsLlns`;
    }

    static updateNsLlns() {
        return `${this.getOrigin()}/hoso/saveNsLlns`;
    }

    static deleteHsNs(nsID: any) {
        return `${this.getOrigin()}/hoso/deleteHoso/${nsID}`;
    }

    static getQtlamviec(nsID: any) {
        return `${this.getOrigin()}/quaTrinhNhansu/getQtlamviecByNsId/${nsID}`;
    }

    static getDsLuong(nsID: any) {
        return `${this.getOrigin()}/salary/getByEmployeeId/${nsID}`;
    }

    static xuatSyllMauEvn(nsID: any, isView: any) {
        return `${this.getOrigin()}/hoso/xuatSyllMauEvn/${nsID}/${isView}`;
    }

    static xuatSyllMau02c(nsID: any, isView: any) {
        return `${this.getOrigin()}/hoso/xuatSyllMau02c/${nsID}/${isView}`;
    }

    static xuatSyllMau02cTCTW(nsID: any, isView: any) {
        return `${this.getOrigin()}/hoso/xuatSyllMau02cTCTW/${nsID}/${isView}`;
    }

    static saveAnhNs() {
        return `${this.getOrigin()}/hoso/saveAnhNs`;
    }

    static getAllHdld(nsID: any) {
        return `${this.getOrigin()}/quaTrinhNhansu/getAllHdld/${nsID}`;
    }

    
    static getSohieuNs(nsId: any,donviId: any) {
        return `${this.getOrigin()}/common/getSohieuNs/${nsId}/${donviId}`;
    }

    static getDsNhansunghiviec2(donviId: any) {
        return `${this.getOrigin()}/nsHdldong/getDsNhansunghiviec2/${donviId}`;
    }

    static getLoaiTTrangNghiviec() {
        return `${this.getOrigin()}/nsHdldong/getLoaiTTrangNghiviec`;
    }

    static insertNsHdnghiviec() {
        return `${this.getOrigin()}/nsHdldong/insertNsHdnghiviec`;
    }
    
    static updateNsHdnghiviec() {
        return `${this.getOrigin()}/nsHdldong/updateNsHdnghiviec`;
    }

    static deleteNghiviec() {
        return `${this.getOrigin()}/nsHdldong/deleteNghiviec`;
    }

    

}