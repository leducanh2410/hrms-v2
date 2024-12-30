import { BaseURL } from "../baseURL";

export class TtcbURL extends BaseURL {
    static getThongtinSinhnhatList(donviId, donvittId, gomtt, fdatestr, tdatestr) {
        return `${this.getOrigin()}/hrms/employe/v1/ttcb/sinhnhat/${donviId}/${donvittId}/${gomtt}/${fdatestr}/${tdatestr}`;
    }

    static getThongtinDenhanNghihuu(donviId, donvittId, gomtt, fdatestr, tdatestr) {
        return `${this.getOrigin()}/hrms/employe/v1/ttcb/nghihuu/${donviId}/${donvittId}/${gomtt}/${fdatestr}/${tdatestr}`;
    }

    static getThongtinNangluong(donviId, donvittId, gomtt, iscongnhan, fdatestr, tdatestr) {
        return `${this.getOrigin()}/hrms/employe/v1/ttcb/nangluong/${donviId}/${donvittId}/${gomtt}/${iscongnhan}/${fdatestr}/${tdatestr}`;
    }

    static getThongtinHuongluongTotbac(donviId, donvittId, gomtt, fdatestr, tdatestr) {
        return `${this.getOrigin()}/hrms/employe/v1/ttcb/huongluongtotbac/${donviId}/${donvittId}/${gomtt}/${fdatestr}/${tdatestr}`;
    }

    static getThongtinDenhanBonhiemlai(donviId, donvittId, gomtt, fdatestr, tdatestr) {
        return `${this.getOrigin()}/hrms/employe/v1/ttcb/bonhiemlai/${donviId}/${donvittId}/${gomtt}/${fdatestr}/${tdatestr}`;
    }

    static getThongtinHethanHopdong(donviId, donvittId, gomtt, fdatestr, tdatestr) {
        return `${this.getOrigin()}/hrms/employe/v1/ttcb/hethanhopdong/${donviId}/${donvittId}/${gomtt}/${fdatestr}/${tdatestr}`;
    }

    static getThongtinHethanThuviec(donviId, donvittId, gomtt, fdatestr, tdatestr) {
        return `${this.getOrigin()}/hrms/employe/v1/ttcb/hethanthuviec/${donviId}/${donvittId}/${gomtt}/${fdatestr}/${tdatestr}`;
    }

    static getThongtinHethanBietphaitamthoi(donviId, donvittId, gomtt, fdatestr, tdatestr) {
        return `${this.getOrigin()}/hrms/employe/v1/ttcb/hethanbietphaitamthoi/${donviId}/${donvittId}/${gomtt}/${fdatestr}/${tdatestr}`;
    }

    static getThongtinChungchiHethan(donviId, donvittId, gomtt, fdatestr, tdatestr) {
        return `${this.getOrigin()}/hrms/employe/v1/ttcb/chungchihethan/${donviId}/${donvittId}/${gomtt}/${fdatestr}/${tdatestr}`;
    }

    static checkDonviTructhuoc(donviId) {
        return `${this.getOrigin()}/hrms/employe/v1/ttcb/checkdonvitructhuoc/${donviId}`;
    }
}