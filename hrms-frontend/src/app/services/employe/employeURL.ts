import { BaseURL } from "../baseURL";
export class EmployeURL extends BaseURL{
    static login() {
        return `${this.getOrigin()}/evnid/api/auth/login`
    }

    static getDotBosung() {
        return `${this.getOrigin()}/hrms/employe/v1/llnsBoSung/getDotBoSungLlNs`;
    }

    static loadThongtin(dotbs) {
        return `${this.getOrigin()}/hrms/employe/v1/llnsBoSung/loadThongtinchung/${dotbs}`;
    }

    static saveThongtin() {
        return `${this.getOrigin()}/hrms/employe/v1/llnsBoSung/saveThongTinChung`;
    }

    static getDsDaotao(dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/getDsDaoTaoFormBSLLNS/${dotBs}`;
    }

    static getDsBoiDuong(dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/getDsBoiDuongFormBSLLNS/${dotBs}`;
    }

    static getDsKhenThuong(dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/getDsKhenThuongFormBSLLNS/${dotBs}`;
    }

    static getDsKyLuat(dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/getDsKyLuatFormBSLLNS/${dotBs}`;
    }

    static getDsNuocNgoai(dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/getDsNuocNgoaiFormBSLLNS/${dotBs}`;
    }

    static getDsPTGiaDinh(dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/getDsPTGiaDinhFormBSLLNS/${dotBs}`;
    }

    static getDsNguoiKy() {
        return `${this.getOrigin()}/hrms/employe/v1/llnsBoSung/getDsNguoikyQdinh`;
    }

    static getDsNguoiKyBean() {
        return `${this.getOrigin()}/hrms/employe/v1/llnsBoSung/getDsNguoikyQdinhBean`;
    }

    static getHosoNangluc(dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/getWebLlbsHosonangluc/${dotBs}`;
    }

    static saveDaoTao() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/saveDaoTao`;
    }

    static saveBoiDuong() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/saveBoiDuong`;
    }

    static saveKhenThuong() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/saveKhenThuong`;
    }

    static saveKyLuat() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/saveKyLuat`;
    }

    static saveNuocNgoai() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/saveNuocNgoai`;
    }

    static saveTPGiaDinh() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/saveTPGiaDinh`;
    }

    static saveHosoNangluc() {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/saveHosonanglucBS`;
    }

    static deleteDaoTao(id, dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/deleteDaotao/${id}/${dotBs}`;
    }

    static deleteWebBoiduong(id, dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/deleteWebBoiduong/${id}/${dotBs}`;
    }

    static deleteWebKhenthuong(id, dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/deleteWebKhenthuong/${id}/${dotBs}`;
    }

    static deleteWebKyluat(id, dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/deleteWebKyluat/${id}/${dotBs}`;
    }

    static deleteWebNuocngoai(id, dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/deleteWebLlbsNuocngoai/${id}/${dotBs}`;
    }

    static deleteWebTPGiadinh(id, dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/quaTrinh/deleteTPgiadinh/${id}/${dotBs}`;
    }

    static getFileURL(id) {
        return `${this.getOrigin()}/hrms/employe/v1/file/callDataFile/${id}`;
    }

    static getFile(file) {
        return `${this.getOrigin()}/hrms/employe/v1/file/callDataUtils/${file}`;
    }

    static convertToPdf() {
        return `${this.getOrigin()}/hrms/employe/v1/file/convertToPdf`;
    }

    static getAnhcu() {
        return `${this.getOrigin()}/hrms/employe/v1/llnsBoSung/getNsAnh`;
    }

    static getAnhmoi(dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/llnsBoSung/getWebLlbsAnh/${dotBs}`;
    }

    static saveWebLlbsAnh() {
        return `${this.getOrigin()}/hrms/employe/v1/llnsBoSung/saveWebLlbsAnh`;
    }

    static deleteLlnsBs(dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/llnsBoSung/deleteBsLLNS/${dotBs}`;
    }

    static ktraXacnhanDtao(dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/kiemtraXacNhanDaoTao/{webLlbsKqdaotao}/{dotbosung}`;
    }
}
