
import { BaseURL } from "../baseURL";

export class TochucURL extends BaseURL {

    static getDsPhongbanDoiten(id: any) {
        return `${this.getOrigin()}/hrms/employe/v1/organization/getDsPhongbanDoiten/${id}`;
    }


    // hosodonvi
    static getAllListDonvi(){
        return `${this.getOrigin()}/hrms/employe/v1/cocaudonvi/listDonvi`;
    }

    static getListDonviTructhuoc(donviId: any){
        return `${this.getOrigin()}/hrms/employe/v1/cocaudonvi/listDonviTructhuoc/${donviId}`;
    }


    static getListOrgType(){
        return `${this.getOrigin()}/hrms/employe/v1/cocaudonvi/listOrgType`;
    }

    static getListOrgSubgroup(){
        return `${this.getOrigin()}/hrms/employe/v1/cocaudonvi/listOrgSubgroup`;
    }

    static getListTtpho(){
        return `${this.getOrigin()}/hrms/employe/v1/cocaudonvi/listTtpho`;
    }

    static getOrgConfig(org: any){
        return `${this.getOrigin()}/hrms/employe/v1/cocaudonvi/orgConfig/${org}`;
    }

    static updateOrgConfig() {
        return `${this.getOrigin()}/hrms/employe/v1/cocaudonvi/updateOrgConfig`;
    }


    //  hosophongbantonhom
    static getDepartmentById(id: any) {
        return `${this.getOrigin()}/hrms/employe/v1/organization/getDepartmentById/${id}`;
    }

    static validateDepartment() {
        return `${this.getOrigin()}/hrms/employe/v1/organization/validateDepartment`;
    }

    static renameDepartment() {
        return `${this.getOrigin()}/hrms/employe/v1/organization/renameDepartment`;
    }

    static updateDepartment() {
        return `${this.getOrigin()}/hrms/employe/v1/organization/updateDepartment`;
    }

    static insertDepartment() {
        return `${this.getOrigin()}/hrms/employe/v1/organization/insertDepartment`;
    }

    static deleteDepartment(id: any) {
        return `${this.getOrigin()}/hrms/employe/v1/organization/deleteDepartment/${id}`;
    }

    static checkPhuchoidoiten(pbid: any,donviId: any) {
        return `${this.getOrigin()}/hrms/employe/v1/organization/checkPhuchoidoiten/${pbid}/${donviId}`;
    }

    static phuchoiDoiten() {
        return `${this.getOrigin()}/hrms/employe/v1/organization/phuchoiDoiten`;
    }


}
