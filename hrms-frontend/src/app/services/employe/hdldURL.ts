import { BaseURL } from "../baseURL";

export class hdldURL extends BaseURL {

    static getDanhSachNghiepVuByOrg(donviId, phanLoaiNhom, namSelected) {
        return `${this.getOrigin()}/hrms/employe/v1/ketquatimkiem/getDanhSachNghiepVuByOrg/${donviId}/${phanLoaiNhom}/${namSelected}`;
    }

    static getNsDsachHDLDByTkiemid(tkiemId) {
        return `${this.getOrigin()}/hrms/employe/v1/ketquatimkiem/getNsDsachHDLDByTkiemid/${tkiemId}`;
    }

    static getNsDsachHdldListFromCanhbaoDenhan() {
        return `${this.getOrigin()}/hrms/employe/v1/ketquatimkiem/getNsDsachHdldListFromCanhbaoDenhan`;
    }

    static getNsDsachHdldListByDonvi(donviId, getAll) {
        return `${this.getOrigin()}/hrms/employe/v1/ketquatimkiem/getNsDsachHdldListByDonvi/${donviId}/${getAll}`;
    }

    static getThongtinHopdongList() {
        return `${this.getOrigin()}/hrms/employe/v1/thongtincanhbao/getThongtinHopdongList`;
    }

    static getDsNhansuThaydoiVtri(donviId, nam, thang) {
        return `${this.getOrigin()}/hrms/employe/v1/thongtincanhbao/getDsNhansuThaydoiVtri/${donviId}/${nam}/${thang}`;
    }

    static GetPhucapList() {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/GetPhucapList`;
    }

    static insertDsNsHDLD() {
        return `${this.getOrigin()}/hrms/employe/v1/ketquatimkiem/insertDsNsHDLD`;
    }

    static updateDsNsHDLD() {
        return `${this.getOrigin()}/hrms/employe/v1/ketquatimkiem/updateDsNsHDLD`;
    }

    static deleteDsNsHDLD() {
        return `${this.getOrigin()}/hrms/employe/v1/ketquatimkiem/deleteDsNsHDLD`;
    }

    static getFileDuthao(objId) {
        return `${this.getOrigin()}/hrms/employe/v1/ketquatimkiem/getFileDuthao/${objId}`;
    }

    static taoDuthao() {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/taoDuthao`;
    }

    static copyLoaiHdldCu() {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/copyLoaiHdldCu`;
    }

    static xoaDsHdld(dsTimkiemId) {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/xoaDsHdld/${dsTimkiemId}`;
    }

    static checkTenDanhsachHdld(donviId, year, tenDanhsach) {
        return `${this.getOrigin()}/hrms/employe/v1/ketquatimkiem/checkTenDanhsachHdld/${donviId}/${year}/${tenDanhsach}`;
    }


    static chuyenKyHdld() {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/chuyenKyHdld`;
    }


    static getListHDLD(trangthai: string, page: number) {
        return `${this.getOrigin()}/hrms/employe/v1/ketquatimkiem/listDshdld/${trangthai}/${page}`;
    }

    static getCountPhieu() {
        return `${this.getOrigin()}/hrms/employe/v1/ketquatimkiem/counter`;
    }

    static getFile(id) {
        return `${this.getOrigin()}/hrms/employe/v1/file/callDataUtils/${id}`;
    }

    static convertToPdf() {
        return `${this.getOrigin()}/hrms/employe/v1/file/convertToPdf`;
    }

    static qlXulyHopdong(phieuId) {
        return `${this.getOrigin()}/hrms/employe/v1/ketquatimkiem/qtxuly/${phieuId}`;
    }

    static chuyenPhathanhDO() {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/chuyenPhathanhDO`;
    }

    static getDsDangTamngung(donviId) {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/getDsDangTamngung/${donviId}`;
    }

    static getDsChamdutTamngung(donviId, page) {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/getDsChamdutTamngung/${donviId}/${page}`;
    }

    static getTamngungCounter(donviId) {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/getTamngungCounter/${donviId}`;
    }

    static suaThongtinTamNgung() {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/suaThongtinTamNgung`;
    }

    static xoaThongtinTamNgung(nsHdnghiviecId) {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/xoaTamNgung/${nsHdnghiviecId}`;
    }

    static timkiemTamngung() {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/timkiemTamngung`;
    }

    static suaThongtinChamdut() {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/suaThongtinChamdut`;
    }

    static checkDkSuaTamngung(nsQtlamviecId) {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/checkDkSuaTamngung/${nsQtlamviecId}`;
    }

    static getNsQdndung(qdinhId) {
        return `${this.getOrigin()}/hrms/employe/v1/nsHdldong/getNsQdnoidung/${qdinhId}`;
    }

    static timkiemDsHdld() {
        return `${this.getOrigin()}/hrms/employe/v1/ketquatimkiem/timkiem`;
    }
}

