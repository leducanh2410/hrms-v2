
import { BaseURL } from "../baseURL";

export class DanhMucURL extends BaseURL {


    static getLKhenthuong(id) {
        return `${this.getOrigin()}/hrms/employe/v1/common/getLKhenthuong/${id}`;
    }

    static getOrganization(id) {
        return `${this.getOrigin()}/hrms/employe/v1/common/getOrganization/${id}`;
    }


    static getListThanhPho() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLDdttpho`;
    }

    static getListQHuyen(thanhPho) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getQhuyenByTpho/${thanhPho}`;
    }

    static getListDantoc() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLDantoc`;
    }

    static getListQuocgia() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLQuocgia`;
    }

    static getListTongiao() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLTongiao`;
    }

    static getListTrinhdoLLCT() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getTrinhdoLLCTList`;
    }

    static getListTpGD() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLTpgdinh`;
    }

    static getListNganHang() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLNganhang`;
    }

    static getListNgheNghiep() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLNnTruoctd`;
    }

    static getListTrinhdo() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLTrinhdo`;
    }

    static getListHocvi() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLHocvi`;
    }

    static getListHthucdtao() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getLHthucdtaoByDonviId`;
    }

    static getListXeploai() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLXeploai`;
    }

    static getListTruongdt() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLTruongdt`;
    }

    static getListCCNNgu() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLTrinhdonn`;
    }

    static getListCCNNguByIdNN(idNgoaingu) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getLTrinhdonn/${idNgoaingu}`;
    }

    static getListHthucKhenthg() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getLKthuongList`;
    }

    static getListChucVu() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getChucvuForQdnoidung`;
    }

    static getListNganhnghe() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getLNganhngheList`;
    }

    static getListNgoaingu() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLNgoaingu`;
    }

    static getListQhegiadinh() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLQhegdinh`;
    }

    static getListQhephuthuoc() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLQhePthuoc`;
    }



    static getListHthucKyluat() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getDsHthucKluat`;
    }

    static getDsTtranghonnhan() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllTtranghonnhan`;
    }

    static getAllTTrangHopdong() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllTTrangHopdong`;
    }

    static getListVtriCdanh() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getListVtriCdanh`;
    }

    static getListVtriCdanhByDonvi(donviId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getListVtriCdanhByDonvi/${donviId}`;
    }


    static getChucvuForQdnoidung() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getChucvuForQdnoidung2`;
    }

    static getVtriCdanhForQtlamviec() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getVtriCdanhForQtlamviec`;
    }

    static getAllNganhngheKinhte() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllNganhngheKinhte`;
    }

    static getListHocham() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLHocham`;
    }

    static getListTrinhdoQLKT() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLTrinhdoQlkte`;
    }

    static getAllDepartment(donviId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllDepartment/${donviId}`;
    }

    static getDsAllPhongbanIsActAndNoAct(donviId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getDsAllPhongbanIsActAndNoAct/${donviId}`;
    }


    static getDsCapKhenThuong() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getDsTdktCapkt`;
    }

    static getDanhhieuRaQD(CapKtId, cntt, donviId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getDanhhieuRaQD/${CapKtId}/${cntt}/${donviId}`;
    }


    static getAllLPhucap() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLPhucap`;
    }



    static getLPhucapHesobyIdPc(idPc) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getLPhucapHesobyIdPc/${idPc}`;
    }

    static getPhucapById(idPc) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getPhucapById/${idPc}`;
    }


    //--------------------- nsQdnoidung --------------------------------
    static getChucvuForQdnoidung2() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getChucvuForQdnoidung2`;
    }

    static getFileQuyetDinh(qdId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getFileQuyetDinh/${qdId}`;
    }

    static getFileQdNotContend(qdId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getFileQdNotContend/${qdId}`;
    }
    

    static getDsQdnoidung(dvId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getDsQdnoidung/${dvId}`;
    }

    static getDsQdnoidungByDvIdAndNam() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getDsQdnoidungByDvIdAndNam`;
    }

    static postNsQdndungBySoQd() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getNsQdndungBySoQd`;
    }

    static postNsQdndungBySoQdNamQd() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getNsQdndungBySoQdNamQd`;
    }

    static getNsQdnoidungById(id) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getNsQdnoidungById/${id}`;
    }

    static validateSoQd() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/validateSoQd`;
    }

    static getListNgheCNKT() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLNghecnkt`;
    }

    static getListNhomNgheCNKT() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLNhomnghecnkt`;
    }

    static checkCdanhCnkt(vitriId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/checkCdanhCnkt/${vitriId}`;
    }

    static xuatExcel() {
        return `${this.getOrigin()}/hrms/employe/v1/common/xuatExcel`;
    }

    static xuatExcel2() {
        return `${this.getOrigin()}/hrms/employe/v1/common/xuatExcel2`;
    }

    static getAllDsLDoanthe() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllDsLDoanthe`;
    }

    static getAllDsLDoantheCv(idDoanthe) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllDsLDoantheCv/${idDoanthe}`;
    }

    static getNsCvudtheById(nsCvudtheId) {
        return `${this.getOrigin()}/hrms/employe/v1/common/getNsCvudtheById/${nsCvudtheId}`;
    }

    static getAllLNhomnganhTduong() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLNhomnganhTduong`;
    }

    static getAllLDanhmucdt() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLDanhmucdt`;
    }

    static getAllLHsnsGiayto() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLHsnsGiayto`;
    }

    static getAllKieugiayto() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllKieugiayto`;
    }

    static getListThangbangluong(id) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getListThangbangluong/${id}`;
    }

    static getListBangluong() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getDsBangluong`;
    }
    static getLuongInfo(bacluongId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getLuongInfo/${bacluongId}`;
    }

    static getAllSDepartmentType() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllSDepartmentType`;
    }

    static createYearList() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/createYearList`;
    }


    static getLVtricdanh(donviId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getLVtricdanh/${donviId}`;
    }

    static createVtriKhungChucDanhEvnTree() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/createVtriKhungChucDanhEvnTree`;
    }


    static getAllKnlLJobFamily() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllKnlLJobFamily`;
    }

    static getAllKnlLJob() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllKnlLJob`;
    }

    static getKnlLJobByFamily(familyId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getKnlLJobByFamily/${familyId}`;
    }

    static getLVtricdanhChuanEvnByDonviCap(jobId : any,jobFamilyId : any,listId : any) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getLVtricdanhChuanEvnByDonviCap/${jobId}/${jobFamilyId}/${listId}`;
    }

    static createMachucdanhCv(vtriChuanEvnCode,vtriChuanEvnId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/createMachucdanhCv/${vtriChuanEvnCode}/${vtriChuanEvnId}`;
    }

    static getVtriChuanEvn() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getVtriChuanEvn/`;
    }

    static getListJobFamily() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getListJobFamily/`;
    }
    static getListJob(jobFamilyId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getListJob/${jobFamilyId}`;
    }

    static getListKnlLJobArea() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getListKnlLJobArea/`;
    }

    static getNhomCdanhTgduong() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getNhomCdanhTgduong/`;
    }

    static getListLDieukienLviec() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getListLDieukienLviec/`;
    }

    static getAllLTrinhdo() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getAllLTrinhdo/`;
    }

    static getLNganhngheList() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getLNganhngheList/`;
    }

    static getListKhungNangluc(jobId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getListKhungNangluc/${jobId}`;
    }

    static getListKhungNanglucTheoKhungEVN(vtriChuanEvnId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getListKhungNanglucTheoKhungEVN/${vtriChuanEvnId}`;
    }

    static getVtricdanhById(vtriId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getVtricdanhById/${vtriId}`;
    }


    static insertHsCdVtri() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/insertHsCdVtri/`;
    }

    static updateHsCdVtri() {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/updateHsCdVtri/`;
    }

    static getListkhungNLByVtriId(vtriId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/getListkhungNLByVtriId/${vtriId}`;
    }
    static deleteVtriChucdanh(vtriId) {
        return `${this.getOrigin()}/hrms/employe/v1/danhMuc/deleteVtriChucdanh/${vtriId}`;
    }

    static getFileContend(fileId) {
        return `${this.getOrigin()}/hrms/employe/v1/file/getFileContend/${fileId}`;
    }


}
