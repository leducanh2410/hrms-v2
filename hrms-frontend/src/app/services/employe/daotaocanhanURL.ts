import { BaseURL } from "../baseURL";
export class DaotaoCanhanURL extends BaseURL {

    static getDsKetquakhoaDt(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/daotaocanhan/getDsKetquakhoaDt/${nsId}`;
    }

    static getDsKetquakhoaBd(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/daotaocanhan/getDsKetquakhoaBd/${nsId}`;
    }

    static insertDaotao_Boiduong() {
        return `${this.getOrigin()}/hrms/employe/v1/daotaocanhan/insertDaotaoBoiduong`;
    }

    static updateDaotao_Boiduong() {
        return `${this.getOrigin()}/hrms/employe/v1/daotaocanhan/updateDaotaoBoiduong`;
    }

    static getDaotaoBoiduongChitiet(id,flag) {
        return `${this.getOrigin()}/hrms/employe/v1/daotaocanhan/getDaotao_Boiduong_Chitiet/${id}/${flag}`;
    }

    static deleteDaotaoBoiduong() {
        return `${this.getOrigin()}/hrms/employe/v1/daotaocanhan/deleteDaotaoBoiduong`;
    }

    static getAllNsNuocNgoai(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/daotaocanhan/getAllNsNuocNgoai/${nsId}`;
    }

    static getQuyetDinhBySoQdAndDonviId() {
        return `${this.getOrigin()}/hrms/employe/v1/daotaocanhan/getQuyetDinhBySoQdAndDonviId`;
    }

    static getDsCanBoQuanLyCuadonvi(donviId) {
        return `${this.getOrigin()}/hrms/employe/v1/daotaocanhan/getDsCanBoQuanLyCuadonvi/${donviId}`;
    }

    static createNsNuocNgoai() {
        return `${this.getOrigin()}/hrms/employe/v1/daotaocanhan/createNsNuocNgoai`;
    }

    static editNsNuocNgoai(nsId, nuocngoaiIdList) {
        return `${this.getOrigin()}/hrms/employe/v1/daotaocanhan/editNsNuocNgoai/${nsId}/${nuocngoaiIdList}`;
    }

    static deleteNsNuocNgoai() {
        return `${this.getOrigin()}/hrms/employe/v1/daotaocanhan/deleteNsNuocNgoai`;
    }
}