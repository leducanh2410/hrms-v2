import { BaseURL } from "../baseURL";

export class NhansuURL extends BaseURL {

    static getAllLanhdao() {
        return `${this.getOrigin()}/hrms/employe/v1/nhansu/lanhdaodonvi`;
    }

    static getLanhdaoTCHC() {
        return `${this.getOrigin()}/hrms/employe/v1/nhansu/lanhdaotchc`;
    }
}

