import { Buttons } from '../../../fuse/components/message-box/common';
import { MessageBox } from '../../../fuse/components/message-box/message-box.provider';
import { MessageService } from '../../../shared/message.services';
import { Utils } from '../../../core/utilities/Utils';
import { CommonApiService } from '../../../services/commonHttp';
import { DanhMucURL} from "../../../services/employe/danhmucURL"
import moment from "moment";
import { Subject, takeUntil } from "rxjs";
import { Injectable } from "@angular/core";


export class ValidateQD {

    static http: CommonApiService;
    static _unsubscribeAll: Subject<any> = new Subject<any>();
    static mb: MessageBox;


    public static async getStatusOfNsQdndung(http: CommonApiService, mb: MessageBox, nsQdndungMoi: any, messageService: MessageService,insertFile : any) {
        try {
            var nsQdndungCu = null;
            var strSoQDCu = "";

            if(nsQdndungMoi.ngayKy != null && nsQdndungMoi.ngayKy != undefined){
                if (nsQdndungMoi.soQd === null || nsQdndungMoi.soQd === '' || nsQdndungMoi.soQd === undefined) {
                    messageService.showWarningMessage(
                        'Cảnh báo',
                        'Bạn phải nhập số Quyết định'
                    );
                    return null;
                }
            }

            if(nsQdndungMoi.soQd !== null && nsQdndungMoi.soQd !== '' && nsQdndungMoi.soQd !== undefined){
                if(nsQdndungMoi.ngayKy == null){
                    messageService.showWarningMessage(
                        'Cảnh báo',
                        'Bạn phải nhập ngày ký Quyết định'
                    );
                    return null;
                }
            }

            if((nsQdndungMoi.noiDung !== null && nsQdndungMoi.noiDung !== '' && nsQdndungMoi.noiDung !== undefined) || 
               (nsQdndungMoi.nguoiky !== null && nsQdndungMoi.nguoiky !== '' && nsQdndungMoi.nguoiky !== undefined) || 
               (nsQdndungMoi.chucvuKy !== null && nsQdndungMoi.chucvuKy !== '' && nsQdndungMoi.chucvuKy !== undefined) ||
               (insertFile != null && insertFile.length > 0)){
                if (nsQdndungMoi.soQd === null || nsQdndungMoi.soQd === '' || nsQdndungMoi.soQd === undefined || nsQdndungMoi.ngayKy == null) {
                    messageService.showWarningMessage(
                        'Cảnh báo',
                        'Bạn phải nhập số Quyết định và ngày ký'
                    );
                    return null;
                }
            }
            


            if (nsQdndungMoi.qdinhId) {
                const res = await http.get(DanhMucURL.getNsQdnoidungById(nsQdndungMoi.qdinhId)).toPromise();
                if (res || res.state) {
                    nsQdndungCu = res.data;
                }
            }


            if (nsQdndungCu != null) {
                strSoQDCu = nsQdndungCu.soQd != null ? nsQdndungCu.soQd.trim() : "";

                if (this.checkSoQDNotChange(nsQdndungCu, nsQdndungMoi)) {
                    nsQdndungCu.isSave = false;
                    return nsQdndungCu; // Variable.QD_NO_CHANGE;
                } else {
                    if (this.checkQdNotChangeYear(nsQdndungCu, nsQdndungMoi)) {
                        // let label = "Bạn có muốn thay đổi thông tin của quyết định " + strSoQDCu + " ứng với năm ký " + namKy + " không?";
                        let label = "Đã tồn tại số " + strSoQDCu + ", ký ngày " + moment(nsQdndungCu.ngayKy).format('DD/MM/YYYY') + " trong hệ thống! Bạn có muốn cập nhật theo thông tin vừa nhập trên giao diện hay không ? Có/không "
                        let dialog = mb.show2(label, Buttons.YesNoClosed);
                        const result = await dialog.dialogResult2$.toPromise();
                        if (result === 1) {
                            // Variable.QD_UPDATE;
                            return nsQdndungMoi;
                        } else if (result === 2) {
                            // Variable.QD_NO_CHANGE;
                            nsQdndungCu.isSave = false;
                            return nsQdndungCu;
                        } else if (result === 4) {
                            // Dong canh bao
                            return null;
                        }

                    } else {
                        const res2 = await http.post(DanhMucURL.validateSoQd(), nsQdndungMoi).toPromise();
                        if (!res2 || !res2.state || res2.data == null || res2.data == undefined) {
                            return nsQdndungMoi;
                        }
                        nsQdndungCu = res2.data;
                        if (nsQdndungCu != null) {
                            if (this.checkSoQDNotChange(nsQdndungCu, nsQdndungMoi)) {
                                return nsQdndungCu; // Variable.QD_NO_CHANGE;
                            } else {
                                let label = "Đã tồn tại số " + strSoQDCu + ", ký ngày " + moment(nsQdndungCu.ngayKy).format('DD/MM/YYYY') + " trong hệ thống! Bạn có muốn cập nhật theo thông tin vừa nhập trên giao diện hay không ? Có/không "
                                let dialog = mb.show2(label, Buttons.YesNoClosed);
                                const result = await dialog.dialogResult2$.toPromise();
                                if (result === 1) {
                                    // Variable.QD_UPDATE;
                                    return nsQdndungMoi;
                                } else if (result === 2) {
                                    // Variable.QD_NO_CHANGE;
                                    nsQdndungCu.isSave = false;
                                    return nsQdndungCu;
                                } else if (result === 4) {
                                    // Dong canh bao
                                    return null;
                                }
                            }
                        }
                    }
                }
            } else {
                const res3 = await http.post(DanhMucURL.validateSoQd(), nsQdndungMoi).toPromise();
                nsQdndungCu = res3.data;
                if (nsQdndungCu != null) {
                    strSoQDCu = nsQdndungCu.soQd != null ? nsQdndungCu.soQd.trim() : "";
                    if (this.checkSoQDNotChange(nsQdndungCu, nsQdndungMoi)) {
                        nsQdndungCu.isSave = false;
                        return nsQdndungCu;
                    } else {
                        let label = "Đã tồn tại số " + strSoQDCu + ", ký ngày " + moment(nsQdndungCu.ngayKy).format('DD/MM/YYYY') + " trong hệ thống! Bạn có muốn cập nhật theo thông tin vừa nhập trên giao diện hay không ? Có/không "
                        let dialog = mb.show2(label, Buttons.YesNoClosed);
                        const result = await dialog.dialogResult2$.toPromise();
                        if (result === 1) {
                            // Variable.QD_UPDATE;
                            return nsQdndungMoi;
                        } else if (result === 2) {
                            // Variable.QD_NO_CHANGE;
                            nsQdndungCu.isSave = false;
                            return nsQdndungCu;
                        } else if (result === 4) {
                            // Dong canh bao
                            return null;
                        }
                    }
                } else {
                    return nsQdndungMoi;
                }
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }


    static checkSoQDNotChange(nsQdndungCu: any, nsQdndungMoi: any) {
        var date = new Date();

        var strNguoiKyCu = nsQdndungCu != null && nsQdndungCu.nguoiky != null ? nsQdndungCu.nguoiky.trim()
            : "";
        var strChucVuCu = nsQdndungCu != null && nsQdndungCu.chucvuKy != null ? nsQdndungCu.chucvuKy.trim()
            : "";
        var strNoiDungCu = nsQdndungCu != null && nsQdndungCu.noiDung != null ? nsQdndungCu.noiDung.trim()
            : "";
        var strSoQDCu = nsQdndungCu != null && nsQdndungCu.soQd != null ? nsQdndungCu.soQd.trim() : "";
        var ngayKyCu = nsQdndungCu != null && nsQdndungCu.ngayKy != null ? nsQdndungCu.ngayKy : date;

        var strNguoiKyMoi = nsQdndungMoi != null && nsQdndungMoi.nguoiky != null
            ? nsQdndungMoi.nguoiky.trim()
            : "";
        var strChucVuMoi = nsQdndungMoi != null && nsQdndungMoi.chucvuKy != null
            ? nsQdndungMoi.chucvuKy.trim()
            : "";
        var strNoiDungMoi = nsQdndungMoi != null && nsQdndungMoi.noiDung != null
            ? nsQdndungMoi.noiDung.trim()
            : "";
        var strSoQDMoi = nsQdndungMoi != null && nsQdndungMoi.soQd != null ? nsQdndungMoi.soQd.trim() : "";
        var ngayKyMoi = nsQdndungMoi != null && nsQdndungMoi.ngayKy != null ? nsQdndungMoi.ngayKy : date;
        if (strNguoiKyCu.toLowerCase() !== strNguoiKyMoi.toLowerCase()) {
            return false;
        }

        if (strChucVuCu.toLowerCase() !== strChucVuMoi.toLowerCase()) {
            return false;
        }
        if (strNoiDungCu.toLowerCase() !== strNoiDungMoi.toLowerCase()) {
            return false;
        }
        if (ngayKyCu && ngayKyMoi && ngayKyCu !== ngayKyMoi) {
            return false;
        }
        if (strSoQDCu.toLowerCase() != strSoQDMoi.toLowerCase()) {
            return false;
        }

        if (nsQdndungMoi.isChangeFileAttach) {
            return false;
        }


        return true;
    }

    static checkQdNotChangeYear(nsQdndungCu: any, nsQdndungMoi: any) {
        var date = new Date();
        var ngayKyCu = nsQdndungCu != null && nsQdndungCu.ngayKy != null ? nsQdndungCu.ngayKy : date;

        var ngayKyMoi = nsQdndungMoi != null && nsQdndungMoi.ngayKy != null ? nsQdndungMoi.ngayKy : date;
        if (ngayKyCu && ngayKyMoi && new Date(ngayKyCu).getFullYear() != new Date(ngayKyMoi).getFullYear()) {
            return false;
        }
        if (nsQdndungCu.soQd.toLowerCase() !== nsQdndungMoi.soQd.toLowerCase()) {
            return false;
        }
        return true;
    }

}


