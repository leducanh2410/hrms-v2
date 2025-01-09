import { BaseURL } from "../baseURL";

export class XacNhanBoSungURL extends BaseURL {

    static getDotBoSungLlNs(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getDotBoSungLlNs/${nsId}`;
    }

    static getThongtinchung(nsId, dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getThongtinchung/${nsId}/${dotBs}`;
    }

    static createColumnTtChung(nsId, dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/createColumnTtChung/${nsId}/${dotBs}`;
    }

    static getDsDaoTaoFormBSLLNS(nsId, dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getDsDaoTaoFormBSLLNS/${nsId}/${dotBs}`;
    }
    static getDsBoiDuongFromBSLL(nsId, dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getDsBoiDuongFromBSLL/${nsId}/${dotBs}`;
    }

    static getWebKthuongFromBSLL(nsId, dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getWebKthuongFromBSLL/${nsId}/${dotBs}`;
    }

    static getDsKyluatFromBSLL(nsId, dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getDsKyluatFromBSLL/${nsId}/${dotBs}`;
    }

    static getDsWebNuocngoaiBSLL(nsId, dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getDsWebNuocngoaiBSLL/${nsId}/${dotBs}`;
    }

    static getDsWebGiadinhBSLL(nsId, dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getDsWebGiadinhBSLL/${nsId}/${dotBs}`;
    }

    static getWebLlbsHosonanglucBSLL(nsId, dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getWebLlbsHosonanglucBSLL/${nsId}/${dotBs}`;
    }

    static getAnhmoi(nsId, dotBs) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getAnhmoi/${nsId}/${dotBs}`;
    }


    static getDsDaotaoHoso(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getDsDaotaoHoso/${nsId}`;
    }


    static getDsKqboiduongNs(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getDsKqboiduongNs/${nsId}`;
    }

    static getAllQuatrinhKT(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getAllQuatrinhKT/${nsId}`;
    }

    static getQtKyluatHoso(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getQtKyluatHoso/${nsId}`;
    }

    static getAllNsNngoaiHoso(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getAllNsNngoaiHoso/${nsId}`;
    }

    static getDsNsLlnsGiadinhHoso(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getDsNsLlnsGiadinhHoso/${nsId}`;
    }

    static getAnhHoso(nsId) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getAnhHoso/${nsId}`;
    }

    static save() {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/save`;
    }

    static searchHoso() {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/searchHoso`;
    }

    static khoadotbosung(webDoituongtbId, flag) {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/khoadotbosung/${webDoituongtbId}/${flag}`;
    }

    static tralai() {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/tralai`;
    }


    static getDsNhanSuDaGuiLLNSBS() {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getDsNhanSuDaGuiLLNSBS`;
    }

    static getDsNsBSLLDaDuyet() {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getDsNsBSLLDaDuyet`;
    }

    static getDsDonviVaSoHosoBSLL() {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getDsDonviVaSoHosoBSLL`;
    }

    static getDsNhansu() {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getDsNhansu`;
    }

    static getDsNsBSLLTralai() {
        return `${this.getOrigin()}/hrms/employe/v1/xacnhanlylich/getDsNsBSLLTralai`;
    }




}