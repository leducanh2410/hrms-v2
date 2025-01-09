import { API, Environment } from "../../../app/core/config/app.config";
import { BaseURL } from "../baseURL";

export class HubURL extends BaseURL{

    static getListGiayDDHub() {
        return `${this.getOrigin()}/hub/apigw/api/v1/giaydiduong/list`;
    }

    static userNotifiXNGDD(donvixn: number, phieuid: number) {
        return `${this.getOrigin()}/hub/apigw/api/v1/giaydiduong/danhguikyso/${donvixn}/${phieuid}`;
    }
    static HUB_getGiayDDDaXuLy() {
        return `${this.getOrigin()}/hub/apigw/api/v1/giaydiduong/listdaxuly`;
    }

    //hub/apigw
    static chitietPhieuCoGiayHub(phieuid) {
        return `${this.getOrigin()}/hub/apigw/api/v1/giaydiduong/phieuct/${phieuid}`;
    }

    static xacNhanGiayDiDuong() {
        return `${this.getOrigin()}/hub/apigw/api/v1/giaydiduong/kygiadiduong`;
    }

    static sendGiaydiduong() {
        return `${this.getOrigin()}/hub/apigw/api/v1/giaydiduong/saves`;
    }

    static doithoigian() {
        return `${this.getOrigin()}/hub/apigw/api/v1/giaydiduong/doithoigian`;
    }

    static xacnhancongtacHub() {
        return `${this.getOrigin()}/hub/apigw/api/v1/xacnhan/kysogiaydd`;
    }

    static getCountXacnhanGdd() {
        return `${this.getOrigin()}/hub/apigw/api/v1/giaydiduong/counter`;
    }

    static counterGiayDiDuongHub() {
        return `${this.getOrigin()}/hub/apigw/api/v1/giaydiduong/counter`;
    }

    static thuHoiPhieuCT(phieuid: number) {
        return `${this.getOrigin()}/hub/apigw/api/v1/xacnhan/thuhoi/${phieuid}`;
    }

    static huyPhieuCTHub(phieuid: number) {
        return `${this.getOrigin()}/hub/apigw//api/v1/xacnhan/huyphieu/${phieuid}`;
    }

    static phanXeGiaydiduong() {
        return `${this.getOrigin()}/hub/apigw/api/v1/giaydiduong/laixe.save`;
    }

    static getGiayDDHub() {
        return `${this.getOrigin()}/hub/apigw/api/v1/giaydiduong/list`;
    }

    static listXacnhanDiemdenTP(phieuId: number, donviId: number,) {
        return `${this.getOrigin()}/hub/apigw/api/v1/giaydiduong/thanhphan.diemden/${phieuId}/${donviId}`;
    }

    static thanhphanCancelHub(phieuId: number, nsId: number, active: boolean) {
        return `${this.getOrigin()}/hub/apigw/api/v1/giaydiduong/thanhphan.cancel/${phieuId}/${nsId}/${active}`;
    }

    static thanhphanCancelDiemHub() {
        return `${this.getOrigin()}/hub/apigw/api/v1/giaydiduong/thanhphan.cancel`;
    }
}