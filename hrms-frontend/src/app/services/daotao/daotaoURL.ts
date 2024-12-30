import { API, Environment } from "../../../app/core/config/app.config";
import { BaseURL } from "../baseURL";

export class DaotaoURL extends BaseURL {

    static getDtKhoadtByTTrang(donviId: number, trangthai: string, page: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDtKhoadtByTTrang/${donviId}/${trangthai}/${page}`;
    }

    static getDtKhoadtByTTrangTCNS(donviId: number, trangthai: string, page: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDtKhoadtByTTrangTCNS/${donviId}/${trangthai}/${page}`;
    }

    static getDtKhoadtByTTrangNLD(donviId: number, trangthai: string, page: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDtKhoadtByTTrangNLD/${donviId}/${trangthai}/${page}`;
    }

    static getDtKhoadtByTTrangCapTren(donviId: number, trangthai: string, page: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDtKhoadtByTTrangCapTren/${donviId}/${trangthai}/${page}`;
    }

    static getCountDtKhoadt() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/counter`;
    }

    static getCountDtKhoadtCapTren() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/counterCapTren`;
    }

    static getQtXulyGroup(khoadtid: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/qtxulygroup/${khoadtid}`;
    }

    static getKhoadtUI(trangthai:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getKhoadtUI/${trangthai}`;
    }

    static getListNSChitieuChidinhByKhoadtIdAndDonviId(khoadtid:number,type:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListNSChitieuChidinhByKhoadtIdAndDonviId/${khoadtid}/${type}`;
    }

    static getListCheckHVChidinhByKhoadtId(khoadtid:number,type:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListCheckHVChidinhByKhoadtId/${khoadtid}/${type}`;
    }

    static getDSHocvienAll(khoadtid: number, trangthai: number, duyetkhoa: boolean) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDSHocvienAll/${khoadtid}/${trangthai}/${duyetkhoa}`;
    }

    static getDtthongbaodonvi(khoadtid: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDtthongbaodonvi/${khoadtid}`;
    }

    static getDtthongbaodonviPB(khoadtid: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDtthongbaodonviPB/${khoadtid}`;
    }

    static getDthocvien(khoadtid: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDthocvien/${khoadtid}`;
    }

    static updateDtthongbaodonvi() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/updateDtthongbaodonvi`;
    }

    static insertHocvienNLD(status: boolean, chitieuPB: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/insertHocvienNLD/${status}/${chitieuPB}`;
    }

    static insertHocvienNLDChidinh(hocvienId: boolean, tthaiDky: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/insertHocvienNLDChidinh/${hocvienId}/${tthaiDky}`;
    }

    static insertHocvienPB(chotkq: boolean) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/insertHocvienPB/${chotkq}`;
    }


    static insertDtthongbaodonvi( ngayDK: Date) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/insertDtthongbaodonvi/${ngayDK}`;
    }
    static deleteDtthongbao(khoadtId: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/deleteDtthongbao/${khoadtId}`;
    }
    static getDtthongbao(khoadtId: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDtthongbao/${khoadtId}`;
    }
    static xuatExcel(khoadtId: number, type: string) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/xuatExcelTBdaotao/${khoadtId}/${type}`;
    }
    static insertThongbaodvchoPB(khoadtId:number,ngayDK:Date) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/insertThongbaodvchoPB/${khoadtId}/${ngayDK}`;
    }
    static insertThongbaodvchoDV(khoadtId:number,ngayDK:Date) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/insertThongbaodvchoDV/${khoadtId}/${ngayDK}`;
    }
    static getListPBDVorderbyTBDV(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListPBDVorderbyTBDV/${khoadtId}`;
    }
    static deletedDtthongbaodvctren(khoadtId:number,idCtieu:string) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/deletedDtthongbaodvctren/${khoadtId}/${idCtieu}`;
    }

    static deleteallDtthongbaoctren(thongbaodtId:string,donviId:number ) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/deleteDtthongbaoctren/${thongbaodtId}/${donviId}`;
    }


    // /** CÁC API ngày làm việc  */
    // static rangeHolidays(start: string, end: string) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/holiday/range/${start}/${end}`;
    // }

    // static allHolidays(year: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/holiday/all/${year}`;
    // }

    // static monthHolidays(year: number, month: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/holiday/month/${year}/${month}`;
    // }

    // static saveHoliday() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/holiday/save`;
    // }

    // /** CÁC API File  */

    // static sysConfigs() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/config/dkct`;
    // }

    // static saveConfig() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/config/save`;
    // }

    // static saveConfigs() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/config/saves`;
    // }

    // static deleteConfigs(nghiepvu: string) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/config/delete/${nghiepvu}`;
    // }

    // static configDau() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/config/byconfig.dau`;
    // }

    // static updateConfigDau(loaiky: string) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/config/update.loaiky/${loaiky}`;
    // }

    // static uploadFileMau() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/upload.file`;
    // }

    // static uploadMultiFile() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/upload.multifile`;
    // }

    // static savePheduyets() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/nodes.save`;
    // }

    // static uploadUtilFile() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/upload.file`;
    // }

    // static getDataFile(path_file) {
    //     return `${this.getOrigin()}/rpc/utils/file/download/${path_file}`;
    // }

    // static downloadFileMau(type_file: string) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/download/${type_file}`;
    // }

    // /** CÁC API Nhân sự */
    // static allDonvi() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/nhansu/donvis`;
    // }
    // static allByDonvi(parentId: number) {
    //     return `${this.getOrigin()}/tivp/apigw/api/user/listDonvi/${parentId}`;
    // }


    // static banLanhdao() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/nhansu/banlanhdao`;
    // }

    // static allNhansu() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/nhansu/list`;
    // }

    // static allNhansuBychucdanh(chucdanh: string) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/nhansu/bychucdanh/${chucdanh}`;
    // }

    // static saveThukylanhdao() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/thuky/save`;
    // }

    // static deleteThukylanhdao(id: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/thuky/delete/${id}`;
    // }

    // static allPhongban() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/nhansu/phongban`;
    // }

    // static allBanlanhdaoMR() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/nhansu/banlanhdaomorong`;
    // }


    // static allNsPhongban(departmentId: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/nhansu/nsphongban/${departmentId}`;
    // }
    // /** CÁC API XE Ô TÔ */

    // static listXeoto() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/xeoto/list`;
    // }

    // static saveXeoto() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/xeoto/save`;
    // }

    // static deleteXeoto(id: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/xeoto/delete/${id}`;
    // }

    // /* API Đăng ký nghỉ phép */
    // static getListPhieuNghiPhep(trangthai: string, page: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dknp/list/${trangthai}/${page}`;
    // }

    // static createPhieuNghiPhep() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dknp/save`;
    // }

    // static getPhieuNghiPhep(idPhieu: number, lantrinh: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dknp/editphieu/${idPhieu}/${lantrinh}`;
    // }

    // static chitietPhieuNghiPhep(
    //     phieuid: number,
    //     lantrinh: number,
    //     trangthai: string
    // ) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dknp/chitietphieu/${phieuid}/${lantrinh}/${trangthai}`;
    // }

    // static deletePhieuNP(idPhieu: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dknp/delete/${idPhieu}`;
    // }

    // static uploadMultiFiles() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dknp/upload.multifile`;
    // }

    // static previewFile(id: string) {
    //     return `${this.getOrigin()}/rpc/utils/file/download${id}`;
    // }

    // static getNgayNghiPhepNam() {
    //     return `${this.getOrigin()}/hrmsapi/api/v1/phep.getngayphepnam`;
    // }

    // static traLaiPhieu() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dknp/tralai`;
    // }

    // static pheduyetPhieu() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dknp/duyetphieu`;
    // }

    // static reportOfMe() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/baocao/me`;
    // }

    // static editPhieuNghiPhep(lantrinh: number, phieuid: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dknp/editphieu/${lantrinh}/${phieuid}`;
    // }

    // static getQtXuly(phieuid: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dknp/qtxuly/${phieuid}`;
    // }

    // static getQtXulyGroup(phieuid: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dknp/qtxulygroup/${phieuid}`;
    // }

    // static getCountPhieuNP() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dknp/counter`;
    // }
    // static sendPhieuNP(phieuid: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dknp/guiphieu/${phieuid}`;
    // }
    // static thuHoiNP(phieuid: number, lantrinh: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dknp/thuhoi/${phieuid}/${lantrinh}`;
    // }
    // /* API Cây phê duyệt */

    // static getLitsRoot() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/list/root`;
    // }

    // static createCaypheduyets() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/node.save`;
    // }

    // static createOneNodeCaypheduyet() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/save`;
    // }

    // static getListByRootId(id: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/byidroot/${id}`;
    // }

    // static listCaypheduyet() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/list`;
    // }

    // static uploadFileCaypheduyet() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/upload.file`;
    // }

    // static getListCayPheDuyetByNghiepVu(code: string) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/listby/${code}`;
    // }

    // static getAllVitri() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/list/vitripheduyet`;
    // }

    // static getByRootCaypheduyet(rootId: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/byidroot/${rootId}`;
    // }

    // static deleteAllCaypheduyet(rootId: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/deleteAll/${rootId}`;
    // }

    // static allVaitroPheduyet() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/list/vitripheduyet`;
    // }

    // static ddeleteAllCaypheduyet(rootId: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/deleteAll/${rootId}`;
    // }

    // static saveCaypheduyets() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/nodes.save`;
    // }

    // static allByRootId(id: number, nghiepvuCode: string) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/byrootid/${id}/${nghiepvuCode}`;
    // }

    // static uploadFilesMauCaypheduyet() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/upload.files`;
    // }

    // static deleteNodeCaypheduyet(nodeId: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/caypheduyet/delete/${nodeId}`;
    // }

    // /** CÁC API CHẾ ĐỘ NGHỈ*/
    // static listAllCheDoNghi(loaihinh: string) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/chedonghi/list/${loaihinh}`;
    // }

    // static listCheDoNghi() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/chedonghi/list/hoatdong`;
    // }

    // static getAllCheDoNghi() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/chedonghi/list`;
    // }

    // static saveCheDoNghi() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/chedonghi/save`;
    // }

    // static deleteCheDoNghi(id: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/chedonghi/delete/${id}`;
    // }

    // /** CÁC API THE TAXI */
    // static listThetaxi() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/thetaxi/list`;
    // }

    // static saveThetaxi() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/thetaxi/save`;
    // }

    // static deleteThetaxi(id: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/thetaxi/delete/${id}`;
    // }

    // /** CÁC API SAN BAY */
    // static listSanbay() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/sanbay/list`;
    // }

    // static saveSanbay() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/sanbay/save`;
    // }

    // static deleteSanbay(id: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/sanbay/delete/${id}`;
    // }

    // /*API Giấy đi đường */
    // static getListGiayDD() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/giaydiduong/list`;
    // }



    // static getListCountGiayDD() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/giaydiduong/counter`;
    // }

    // static chitietPhieuCoGiay(phieuid) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/giaydiduong/phieuct/${phieuid}`;
    // }

    // static capdauGiaydiduong() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/capdau`;
    // }

    // static kysoGiaydiduong() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/kysogiaydiduong`;
    // }

    // static duyegiaydiduongs() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/giaydiduong/duyegiaydiduongs`;
    // }

    // static kygiayduong() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/giaydiduong/kygiayduong`;
    // }
    // static xacnhancongtac() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/xacnhan/kygiadiduong`;
    // }


    // static listNodeNotifiCT(phieuid: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/giaydiduong/listnodegui/${phieuid}`;
    // }



    // static userNotifiNguoidiCTAndLD(phieuid: number, actionCode: string) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/giaydiduong/danhguikyso/${phieuid}/${actionCode}`;
    // }

    // static TIVP_getGiayDDDaXuLy() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/giaydiduong/listdaxuly`;
    // }



    // static createGiayDD(phieuid) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/giaydiduong/creategiayddsync/${phieuid}`;
    // }

    // static createGiayDDNosync(phieuid) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/giaydiduong/creategiaydd/${phieuid}`;
    // }

    // static laygiaydd(phieuId: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/giaydiduong/guigiaydd/${phieuId}`;
    // }



    // static nhangiaydd(url: string) {
    //     return `${url}/tivp/apigw/v1/giaydiduong/nhangiaydd`;
    // }


    // // API Danh Mục

    // static getListDiaDiem() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hanhchinh/tinhtp`;
    // }

    // static getAllTinhtp() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hanhchinh/dropdownlist`;
    // }

    // static getListDiaDiemSanBay() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hanhchinh/tinhtpsaybay`;
    // }

    // static getListDonVi() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/nhansu/donvis`;
    // }

    // static getListXe() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/phanxethetaxi/list/phieuxe`;
    // }

    // static getListTheTaxi() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/phanxethetaxi/list/phieuthetaxi`;
    // }

    // // API Phiếu công tác

    // static getCountAllTIVP() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/home/counter`;
    // }

    // static getListPhieuCT(trangthai: string, page: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/list/${trangthai}/${page}`;
    // }

    // static getCountPhieuCT() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/counter`;
    // }



    // static getCountKysoGdd() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/giaydiduong/counter`;
    // }

    // static chitietPhieuCongTac(
    //     phieuid: number,
    //     lantrinh: number,
    //     trangthai: string
    // ) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/chitietphieu/${phieuid}/${lantrinh}/${trangthai}`;
    // }

    // static deletePhieuCongTac(idPhieu: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/delete/${idPhieu}`;
    // }

    // static pheduyetPhieuCT() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/duyetphieu`;
    // }

    // static configcapDau(phieuid: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/configcapDau/${phieuid}`;
    // }

    // static traLaiPhieuCT() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/tralai`;
    // }

    // static getQtXulyGroupCT(phieuid: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/qtxulygroup/${phieuid}`;
    // }

    // static counterGiayDiDuong() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/giaydiduong/counter`;
    // }



    // static editPhieuCongTac(lantrinh: number, phieuid: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/editphieu/${lantrinh}/${phieuid}`;
    // }

    // static createPhieuCongTac() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/save`;
    // }

    // static uploadMultiFilesCT() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/upload.multifile`;
    // }

    // static sendPhieuCT(phieuid) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/guiphieu/${phieuid}`;
    // }

    // static thuHoiCT(phieuid: number, lantrinh: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/thuhoi/${phieuid}/${lantrinh}`;
    // }


    // static huyPhieuCT(phieuid: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/huyphieu/${phieuid}`;
    // }



    // /// Phân xe

    // static khongPhanXeThe() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/phanxethetaxi/xethetaxi.none`;
    // }

    // static phanXe() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/phanxethetaxi/phanxe.save`;
    // }


    // static phanThetaxi() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/phanxethetaxi/thetaxi.save`;
    // }

    // static thuhoiXe(phieuid, xeid) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/phanxethetaxi/thuhoixe/${phieuid}/${xeid}`;
    // }

    // static thuhoiThetaxi(phieuid, theid) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/phanxethetaxi/thuhoithe/${phieuid}/${theid}`;
    // }

    // static getTPhanCTac(phieuid) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/phanxethetaxi/thanhphans/${phieuid}`;
    // }

    // static listVemaybay(phieuid: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/phanxethetaxi/list/vemaybay/${phieuid}`;
    // }

    // static deleteVemaybay(itemId: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/phanxethetaxi/vemaybay/delete/${itemId}`;
    // }

    // static uploadVeMayBay() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/upload.vemabay`;
    // }

    // ///////// giấy đi đường API (hub)

    // static reCreateGiayDD(cayPdmauId, phieuid) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/giaydiduong/creategiayddsync/${phieuid}/${cayPdmauId}`;
    // }
    // static createHashGiayDD() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/hash`;
    // }



    // static thanhphans(phieuId: any) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/thanhphans/${phieuId}`;
    // }

    // static insertHashGiayDD() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/dkct/dongdau`;
    // }

    // static insertHashHubGiayDD() {
    //     //return `${this.getOrigin()}/hub/api/v1/giaydiduong/dongdau`;
    //     return `${this.getOrigin()}/tivp/apigw/v1/xacnhan/dongdau`;
    // }

    // static createHashHubGiayDD() {
    //     //return `${this.getOrigin()}/hub/api/v1/giaydiduong/hash`;
    //     return `${this.getOrigin()}/tivp/apigw/v1/xacnhan/hash`;
    // }
    // //////// Thanh toán
    // static createThanhToan(phieuId: any) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/thanhtoan/create/${phieuId}`;
    // }
    // static xacnhanThanhToan(phieuId: any) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/thanhtoan/xacnhan/${phieuId}`;
    // }

    // static xacnhanThanhToanEpay(phieuId: any) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/thanhtoan/chuyenepayment/${phieuId}`;
    // }

    // static listXacnhanTP(phieuId: any) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/giaydiduong/thanhphan/${phieuId}`;
    // }



    // static thanhphanCancel(phieuId: number, nsId: number, active: boolean) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/giaydiduong/thanhphan.cancel/${phieuId}/${nsId}/${active}`;
    // }



    // // Báo cáo
    // static baocaoDKCT() {
    //     return `${this.getOrigin()}/tivp/apigw/api/baocao/congtac`;
    // }

    // static timkiemDKCT() {
    //     return `${this.getOrigin()}/tivp/apigw/api/timkiem/congtac`;
    // }

    // static baocaoDKNP() {
    //     return `${this.getOrigin()}/tivp/apigw/api/baocao/nghiphep`;
    // }

    // static timkiemDKNP() {
    //     return `${this.getOrigin()}/tivp/apigw/api/timkiem/nghiphep`;
    // }

    // static timkiemHDLD() {
    //     return `${this.getOrigin()}/tivp/apigw/api/timkiem/hdld`;
    // }

    // static timkiemHDLDLo(loId: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/listbylo/${loId}`;
    // }

    // static fileGayddDkct(phieuId: number) {
    //     return `${this.getOrigin()}/tivp/apigw/api/baocao/chitietphieu/${phieuId}`;
    // }

    // // chi tiet HDLD

    // static inforcapsoHdld(phieuId: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/inforcapso/${phieuId}`;
    // }

    // static inforcapsoHdld2(phieuId: number, year: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/inforcapso2/${phieuId}/${year}`;
    // }

    // static listHdLaodong(trangthai: string) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/list/${trangthai}`;
    // }
    // static counterHdLaodong() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/counter`;
    // }
    // static qlXulyHopdong(phieuid: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/qtxulygroup/${phieuid}`;
    // }
    // static removedauHD(phieuid: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/download/removedau/${phieuid}`;
    // }

    // static chitietHDLD(phieuid: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/chitiet/${phieuid}`;
    // }

    // static xemFileHDLD(phieuid: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/xemhdld/${phieuid}`;
    // }

    // static duyetphieuHDLD() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/duyetphieu`;
    // }
    // static tralaiHDLD() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/tralai`;
    // }

    // static createHashHDLD() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/hash`;
    // }

    // static insertHashHDLD() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/insertHash`;
    // }

    // static capdauHDLD() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/capdau`;
    // }

    // static hashHDLDTheolo() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/hashlo`;
    // }

    // static insertHDLDTheolo() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/insertHashlo`;
    // }

    // static thuhoiHDLD(phieuid: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/thuhoi/${phieuid}`;
    // }
    // static previewFileHDLD(phieuid: number) {
    //     return `${this.getOrigin()}/rpc/utils/file/download${phieuid}`;
    // }
    // static baocaoHDLD() {
    //     return `${this.getOrigin()}/tivp/apigw/api/baocao/hdld`;
    // }

    // static allLohdLd(donviId: number) {
    //     return `${this.getOrigin()}/tivp/apigw/v1/hdld/lohdld/${donviId}`;
    // }

    // // Quản trị
    // static alByOrgParent() {
    //     return `${this.getOrigin()}/tivp/apigw/v1/nhansu/donvibyparent`;
    // }

    // static listAllUser() {
    //     return `${this.getOrigin()}/tivp/apigw/api/user/list`;
    // }

    // static listUserByDonvi(donviId: number) {
    //     return `${this.getOrigin()}/tivp/apigw/api/user/listByDonvi/${donviId}`;
    // }

    // static listAllRole() {
    //     return `${this.getOrigin()}/tivp/apigw/api/user/listRole`;
    // }
    // static saveRoleUser() {
    //     return `${this.getOrigin()}/tivp/apigw/api/user/addRoleUser`;
    // }

    //Tao moi khoa dt
    static createOrUpdateKhoaDT() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/createOrUpdateKhoaDT`
    }
    //xoa khoadt
    static xoaKhoadt(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/xoaKhoadt/${khoadtId}`
    }

    //Thongtin chung
    static getListHthucTochuc() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListHthucTochuc`
    }

    static getListNganhnghe() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListNganhnghe`
    }

    static getListChuyengiaLinhvuc() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListChuyengiaLinhvuc`
    }

    static getListTrinhdo() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListTrinhdo`
    }

    static getListNhomnganhTduong(idNN) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListNhomnganhTduong/${idNN}`
    }

    static getListChuyengiaPhannhom(idCG) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListChuyengiaPhannhom/${idCG}`
    }

    static getListDanhmucdt(iddonvi) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListDanhmucdt/${iddonvi}`
    }

    // static getListKehoachDvi(iddonvi,nam) {
    //     return `${this.getOrigin()}/hrms/training/v1/daotao/getListKehoachDvi/${iddonvi}/${nam}`
    // }

    static getDMDTFromKHDvi(idDMDT) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDMDTFromKHDvi/${idDMDT}`
    }

    static getListKehoachDviFromKHTT(idTT) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListKehoachDviFromKHTT/${idTT}`
    }

    static getDtKehoachThongtin(iddonvi,nam,khPhanloai,isCquan) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDtKehoachThongtin/${iddonvi}/${nam}/${khPhanloai}/${isCquan}`
    }

    static getDtKehoachThongtinMultiPhanloai(iddonvi,nam,khPhanloai,isCquan) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDtKehoachThongtinMultiPhanloai/${iddonvi}/${nam}/${khPhanloai}/${isCquan}`
    }

    static getDonviCha(orgCode) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDonviCha/${orgCode}`
    }

    //Doitac,Kinhphidaotao
    static getListNguonKinhPhi() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListNguonKinhPhi`
    }

    static getListTruongdt() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListTruongdt`
    }

    //Phan bo chi tieu dao tao
    static getListSOrganization(iddonvi) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListSOrganization/${iddonvi}`
    }

    static getListSDepartment(iddonvi) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListSDepartment/${iddonvi}`
    }

    static getListKhoadtChitieu(iddonvi,idkhoadt) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListKhoadtChitieu/${iddonvi}/${idkhoadt}`
    }

    static insertKhoadtChitieu(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/insertKhoadtChitieu/${khoadtId}`
    }

    static insertKhoadtChitieu_CG(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/insertKhoadtChitieu_CG/${khoadtId}`
    }

    static deleteKhoadtChitieu_CG(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/deleteKhoadtChitieu_CG/${khoadtId}`
    }

    static getChitieuByKhoadtIdAndNsId(khoadtId:number,nsId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getChitieuByKhoadtIdAndNsId/${khoadtId}/${nsId}`
    }

    static updateDeletedKhoadtChitieu() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/updateDeletedKhoadtChitieu`
    }

    static updateDeletedKhoadtChitieuByKhoadtId() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/updateDeletedKhoadtChitieuByKhoadtId`
    }

    // static getListDtChuyengiaByDonviIdAndPNCGId(donviId,phannhomCgiaId) {
    //     return `${this.getOrigin()}/hrms/training/v1/daotao/getListDtChuyengiaByDonviIdAndPNCGId/${donviId}/${phannhomCgiaId}`
    // }

    static getListDtChuyengiaByPNCGId(phannhomCgiaId) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListDtChuyengiaByPNCGId/${phannhomCgiaId}`
    }

    static getNhansuByDonviIdAndNsId(donviId,nsId) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getNhansuByDonviIdAndNsId/${donviId}/${nsId}`
    }

    static insertHocvienchuyengia() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/insertHocvienchuyengia`
    }

    //cap nhat khoadt
    static getDtKhoadtByid(donviId,id) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDtKhoadtByid/${donviId}/${id}`
    }

    static getDanhmucdt(id) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDanhmucdt/${id}`
    }

    static getDanhmucdtFromDvi(id) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDanhmucdtFromDvi/${id}`
    }

    static getTruongdt(id) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getTruongdt/${id}`
    }

    static getDtHocvienByKhoadtIdAndNsId(donviId,nsId,khoadtId) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDtHocvienByKhoadtIdAndNsId/${donviId}/${nsId}/${khoadtId}`
    }

    static getKhoadtChitieu(iddonvi,idkhoadt) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getKhoadtChitieu/${iddonvi}/${idkhoadt}`
    }

    static updateKhoadtChitieu() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/updateKhoadtChitieu`
    }

    static updateDeleteHocviendt(khoadtId,hocviendtId) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/updateDeleteHocviendt/${khoadtId}/${hocviendtId}`
    }

    static getKehoachDviFromKHDviId(idKHDvi) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getKehoachDviFromKHDviId/${idKHDvi}`
    }

    static insertKhoadtDuyetChitiet(khoadtId) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/insertKhoadtDuyetChitiet/${khoadtId}`
    }
    //thuchiendaotao
    static getDonviChidinh(iddonvi) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDonviChidinh/${iddonvi}`
    }
    static getDonviTructhuoc(iddonvi) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDonviTructhuoc/${iddonvi}`
    }
    static findAllNhansuByPhongban(departmentc1Id) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/findAllNhansuByPhongban/${departmentc1Id}`
    }
    static findAllNhansuByDonvi() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/findAllNhansuByDonvi`
    }
    static insertHocvienNew(userType) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/insertHocvienNew/${userType}`
    }

    static updateLuuXnhanHocvien(userType) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/updateLuuXnhanHocvien/${userType}`
    }

    static getKhoadtUICaptren() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getKhoadtUICaptren`;
    }

    static getDSDonviCanduyet(khoadtId) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDSDonviCanduyet/${khoadtId}`;
    }

    static duyetDSHvDonviTructhuoc(idkhoadt) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/duyetDSHvDonviTructhuoc/${idkhoadt}`;
    }

    static insertThongbaoCaptren(khoadtId:number,ngayDK:Date) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/insertThongbaoCaptren/${khoadtId}/${ngayDK}`;
    }

    static getDtKhoadtByTTrangCapTrenPB(donviId: number, trangthai: string, page: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDtKhoadtByTTrangCapTrenPB/${donviId}/${trangthai}/${page}`;
    }

    static getDtKhoadtByTTrangCapTrenNLD(donviId: number, trangthai: string, page: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDtKhoadtByTTrangCapTrenNLD/${donviId}/${trangthai}/${page}`;
    }

    static findCounterPB() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/findCounterPB`;
    }

    static findCounterNLD() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/findCounterNLD`;
    }

    static getDtThongbaoFromKhoadtIdVaDonviId(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDtThongbaoFromKhoadtIdVaDonviId/${khoadtId}`;
    }

    //Khoa dang to chuc
    static insertMonhoc() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/insertMonhoc`
    }

    static getListMonhoc() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListMonhoc`
    }

    static insertGiangvien() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/insertGiangvien`
    }

    static getListGiangvien() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListGiangvien`
    }

    static insertThoiKhoaBieu() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/insertThoiKhoaBieu`
    }

    static getListThoikhoabieu(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListThoikhoabieu/${khoadtId}`;
    }

    static updateThoikhoabieu(trangthai:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/updateThoikhoabieu/${trangthai}`;
    }

    static getListBangdiemByMonhoc(khoadtId:number,monhocId:number,giangvienId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListBangdiemByMonhoc/${khoadtId}/${monhocId}/${giangvienId}`
    }

    static getListBangdiemByHocvien(khoadtId:number,nsId:any) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListBangdiemByHocvien/${khoadtId}/${nsId}`
    }

    static updateBangdiemByMonhoc(trangthai:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/updateBangdiemByMonhoc/${trangthai}`;
    }

    static getListdanhgiakhoaByHocvien(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListdanhgiakhoaByHocvien/${khoadtId}`
    }

    static getDgiaKhoaTonghopByHocvien(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDgiaKhoaTonghopByHocvien/${khoadtId}`
    }

    static updateListdanhgiakhoaByHocvien() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/updateListdanhgiakhoaByHocvien`;
    }

    static updateDanhgiaTonghopByHocvien() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/updateDanhgiaTonghopByHocvien`;
    }

    static getListDanhgiaGiangvienByHocvien(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListDanhgiaGiangvienByHocvien/${khoadtId}`
    }

    static updateListdanhgiaGVbyHocvien() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/updateListdanhgiaGVbyHocvien`;
    }

    static getAllListdanhgiakhoaByKhoadt(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getAllListdanhgiakhoaByKhoadt/${khoadtId}`
    }

    static getListKhoaDanhgiaTonghopByKhoadtId(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListKhoaDanhgiaTonghopByKhoadtId/${khoadtId}`
    }

    static getListDgiaGVByKhoadtId(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListDgiaGVByKhoadtId/${khoadtId}`
    }

    static getListHVDanhgiaSauDT(khoadtId:number,trangthai:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListHVDanhgiaSauDT/${khoadtId}/${trangthai}`
    }

    static getTTDanhgiaKhoaByHv(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getTTDanhgiaKhoaByHv/${khoadtId}`
    }

    static updateChiphidt(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/updateChiphidt/${khoadtId}`
    }

    static getListCapnhatKetthucKhoanganhan(khoadtId:number,type:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListCapnhatKetthucKhoanganhan/${khoadtId}/${type}`
    }

    static getListCapnhatKetthucKhoadaihan(khoadtId:number,type:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListCapnhatKetthucKhoadaihan/${khoadtId}/${type}`
    }

    static getListNgoaingu() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListNgoaingu`
    }

    static getListTrinhdoNNByNnId(nnId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getListTrinhdoNNByNnId/${nnId}`
    }

    static updateKQKhoaNganhan(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/updateKQKhoaNganhan/${khoadtId}`
    }

    static updateKQKhoaDaihan(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/updateKQKhoaDaihan/${khoadtId}`
    }

    static xoaKQKhoaNganhan(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/xoaKQKhoaNganhan/${khoadtId}`
    }

    static xoaKQKhoaDaihan(khoadtId:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/xoaKQKhoaDaihan/${khoadtId}`
    }

    static getDSAdminKhoaAll(khoadtid: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDSAdminKhoaAll/${khoadtid}`;
    }

    static getDSAdminAll(adminId: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getDSAdminAll/${adminId}`;
    }

    static insertAdminKhoa(trangthai:number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/insertAdminKhoa/${trangthai}`
    }

    static updateAdminKhoa() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/updateAdminKhoa`
    }

    static xuatExcel_DSHVThamgia_PB(khoadtid: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/xuatExcel_DSHVThamgia_PB/${khoadtid}`;
    }

    static xuatExcel_Lichhoc_HV(khoadtid: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/xuatExcel_Lichhoc_HV/${khoadtid}`;
    }

    static xuatExcel_Bangdiem_HV(khoadtid: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/xuatExcel_Bangdiem_HV/${khoadtid}`;
    }

    static xuatExcel_DanhgiaKH_HV(khoadtid: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/xuatExcel_DanhgiaKH_HV/${khoadtid}`;
    }

    static xuatExcel_DanhgiaGV_HV(khoadtid: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/xuatExcel_DanhgiaGV_HV/${khoadtid}`;
    }
    
    static xuatExcel_DSHocvienThamgia_TCNS(khoadtid: number,trangthai: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/xuatExcel_DSHocvienThamgia_TCNS/${khoadtid}/${trangthai}`;
    }

    static xuatExcel_Lichhoc_TCNS(khoadtid: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/xuatExcel_Lichhoc_TCNS/${khoadtid}`;
    }

    static xuatExcel_BangdiemMonhoc_TCNS(khoadtid: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/xuatExcel_BangdiemMonhoc_TCNS/${khoadtid}`;
    }

    static xuatExcel_DanhgiaKH_TCNS(khoadtid: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/xuatExcel_DanhgiaKH_TCNS/${khoadtid}`;
    }

    static xuatExcel_DanhgiaGV_TCNS(khoadtid: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/xuatExcel_DanhgiaGV_TCNS/${khoadtid}`;
    }

    static xuatExcel_KQKhoa_TCNS(khoadtid: number,trangthai: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/xuatExcel_KQKhoa_TCNS/${khoadtid}/${trangthai}`;
    }

    static xuatExcel_DSHVThamgia_Captren(khoadtid: number) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/xuatExcel_DSHVThamgia_Captren/${khoadtid}`;
    }

    static getFileCamKet(khoadtId) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getFileCamKet/${khoadtId}`;
    }

    static getFilePhuLuc(khoadtId) {
        return `${this.getOrigin()}/hrms/training/v1/daotao/getFilePhuLuc/${khoadtId}`;
    }

    static timkiemNangcao() {
        return `${this.getOrigin()}/hrms/training/v1/daotao/timkiemNangcao`;
    }

}
