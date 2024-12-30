import { API, Environment } from "../../../app/core/config/app.config";
import { BaseURL } from "../baseURL";

export class ChamcongURL extends BaseURL{
    // URL nhân sự : nhansu
    static getListNhanSu() {
        return `${this.getOrigin()}/hrms/timekeeping/v1/nhansu/list`;
    }

    static getListNhansuByDept(deptId) {
        return `${this.getOrigin()}/hrms/timekeeping/v1/nhansu/listByDept/${deptId}`;
    }

    // URL cấu hình chấm công : config
    static getListDeptConfigDmcc() {
        return `${this.getOrigin()}/hrms/timekeeping/v1/config/getListDeptConfigDmcc`;
    }

    static createOrUpdateDmcc(){
        return `${this.getOrigin()}/hrms/timekeeping/v1/config/createOrUpdateDmcc`
    }

    static updateListDmcc(){
        return `${this.getOrigin()}/hrms/timekeeping/v1/config/updateListDmcc`
    }
    
    static getTypeUpdateNgaycong(configCode: string){
        return `${this.getOrigin()}/hrms/timekeeping/v1/config/getTypeUpdateNgaycong/${configCode}`;
    }

    // URL nhân sự chấm công T7CN : nhansuchamCongT7CN
    static getListNhanSuT7CN() {
        return `${this.getOrigin()}/hrms/timekeeping/v1/nhansuchamCongT7CN/list`;
    }

    static addList() {
        return `${this.getOrigin()}/hrms/timekeeping/v1/nhansuchamCongT7CN/addList`;
    }

    static editNhanSuT7CN() {
        return `${this.getOrigin()}/hrms/timekeeping/v1/nhansuchamCongT7CN/edit`;
    }

    static deleteNhanSuT7CN() {
        return `${this.getOrigin()}/hrms/timekeeping/v1/nhansuchamCongT7CN/delete`;
    }

    // URL bảng chấm công : bangchamcong
    static getAllPbanChamCongByNsId(){
        return `${this.getOrigin()}/hrms/timekeeping/v1/bangchamcong/listDeptChamCong`;
    }

    static chiTietBangCong(){
        return `${this.getOrigin()}/hrms/timekeeping/v1/bangchamcong/chitiet`;
    }
    static updateListBangcongCTiet(){
        return `${this.getOrigin()}/hrms/timekeeping/v1/bangchamcong/updateListBangcongCTiet`;
    }

    static updateListBangcongCTietMulti(){
        return `${this.getOrigin()}/hrms/timekeeping/v1/bangchamcong/updateListBangcongCTietMulti`;
    }

    //  doiTuong = true : lãnh đạo ký, false : chuyên viên ký
    static kysoBangcong(deptId, nam, thang, doiTuong: boolean){
        return `${this.getOrigin()}/hrms/timekeeping/v1/bangchamcong/kysoBangcong/${deptId}/${nam}/${thang}/${doiTuong}`;
    }
    //  doiTuong = 1 : lãnh đạo trả, 2: Tổ chức nhân sự trả
    static tralaiBangcong(bangcongId, doiTuong: number){
        return `${this.getOrigin()}/hrms/timekeeping/v1/bangchamcong/tralaiBangcong/${bangcongId}/${doiTuong}`;
    }

    static getFileBangCong(bangcongId, doiTuong){
        return `${this.getOrigin()}/hrms/timekeeping/v1/bangchamcong/getFileBangcong/${bangcongId}/${doiTuong}`;
    }
    
    // URL danh mục loại công : loaicong
    static getListLoaicong(){
        return `${this.getOrigin()}/hrms/timekeeping/v1/loaicong/list`;
    }
    static createOrUpdateLoaiCong(){
        return `${this.getOrigin()}/hrms/timekeeping/v1/loaicong/createOrUpdate`;
    }
    static deleteLoaiCong(loaiCongID){
        return `${this.getOrigin()}/hrms/timekeeping/v1/loaicong/delete/${loaiCongID}`;
    }

    static getTheodoiBangcong(nam, thang){
        return `${this.getOrigin()}/hrms/timekeeping/v1/bangchamcong/getTheodoiBangcong/${nam}/${thang}`;
    }

    static getFileBangcong(bangcongId, doiTuong){
        return `${this.getOrigin()}/hrms/timekeeping/v1/bangchamcong/getFileBangcong/${bangcongId}/${doiTuong}`;
    }

    static tralaiBangcong2(bangcongId: number, doiTuong: number, ghiChu: String){
        return `${this.getOrigin()}/hrms/timekeeping/v1/bangchamcong/tralaiBangcong2/${bangcongId}/${doiTuong}/${ghiChu}`;
    }

    static deleteNgaycong(){
        return `${this.getOrigin()}/hrms/timekeeping/v1/bangchamcong/deleteNgaycong`;
    }

    static KhoitaoNgaycongNs(bangCongId: number, nsId: number){
        return `${this.getOrigin()}/hrms/timekeeping/v1/bangchamcong/KhoitaoNgaycongNs/${bangCongId}/${nsId}`;
    }

    // URL đi muộn về sớm : dimuonVesom
    static getListDisomVemuon(){
        return `${this.getOrigin()}/hrms/timekeeping/v1/dimuonVesom/list`;
    }

    static getPbanDisomVemuon(){
        return `${this.getOrigin()}/hrms/timekeeping/v1/config/getListDeptConfigDmcc`;
    }

    static exportExcelDisomVemuon(){
        return `${this.getOrigin()}/hrms/timekeeping/v1/dimuonVesom/exportExcel`;
    }

    static getListDisomVemuonByNhanSu(nam, thang){
        return `${this.getOrigin()}/hrms/timekeeping/v1/dimuonVesom/bangcong/${nam}/${thang}`;
    }

    static updateGhichuDimuonVesom(bcongCtietId){
        return `${this.getOrigin()}/hrms/timekeeping/v1/dimuonVesom/giaitrinh/${bcongCtietId}`;
    }


}