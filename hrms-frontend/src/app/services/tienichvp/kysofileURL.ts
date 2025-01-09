import { API, Environment } from "../../../app/core/config/app.config";
import { BaseURL } from "../baseURL";

export class KysofileURL extends BaseURL{

    /** CÁC API ngày làm việc  */
    static save() {
        return `${this.getOrigin()}/tivp/apigw/api/v1/kysoFile/save`;
    }

    static savePhanChia() {
        return `${this.getOrigin()}/tivp/apigw/api/v1/kysoFile/phanchia`;
    }

    static getListFileKy(trangthai: string, page: number) {
        return `${this.getOrigin()}/tivp/apigw/api/v1/kysoFile/list/${trangthai}/${page}`;
    }

    static getCountPhieu() {
        return `${this.getOrigin()}/tivp/apigw/api/v1/kysoFile/counter`;
    }

    static chitietKySoFile(
        phieuid: number,
        trangthai: string
    ) {
        return `${this.getOrigin()}/tivp/apigw/api/v1/kysoFile/chitietphieu/${phieuid}/${trangthai}`;
    }

    static kysoFile() {
        return `${this.getOrigin()}/tivp/apigw/api/v1/kysoFile/kyso`;
    }

    static chuyenGiaoFile(
        phieuid: number,
    ) {
        return `${this.getOrigin()}/tivp/apigw/api/v1/kysoFile/chuyengiao/${phieuid}`;
    }

    static previewFile(id: string) {
        return `${this.getOrigin()}/rpc/rpc/utils/file/download${id}`;
    }

    static editKysoFile(phieuid: number) {
        return `${this.getOrigin()}/tivp/apigw/api/v1/kysoFile/editphieu/${phieuid}`;
    }

    static traLaiPhieu() {
        return `${this.getOrigin()}/tivp/apigw/api/v1/kysoFile/tralai`;
    }

    static deleteKysoFile(idPhieu: number) {
        return `${this.getOrigin()}/tivp/apigw/api/v1/kysoFile/delete/${idPhieu}`;
    }

    static thuHoi(idPhieu: number) {
        return `${this.getOrigin()}/tivp/apigw/api/v1/kysoFile/thuhoi/${idPhieu}`;
    }

    static uploadMultiFilesCT() {
        return `${this.getOrigin()}/tivp/apigw/api/v1/kysoFile/upload.multifile`;
    }

    static hash() {
        return `${this.getOrigin()}/tivp/apigw/api/v1/kysoFile/hash`;
    }

    static insertHash() {
        return `${this.getOrigin()}/tivp/apigw/api/v1/kysoFile/insertHash`;
    }

    static getListNsByDonvi(donviId: number) {
        return `${this.getOrigin()}/tivp/apigw/api/v1/nhansu/listbydonvi/${donviId}`;
    }

    static allDonvi() {
        return `${this.getOrigin()}/tivp/apigw/api/v1/nhansu/donvis`;
    }
}
