import { BaseURL } from '../baseURL';

export class HSNhansuURL extends BaseURL {
  static getDsLuong(nsID: any) {
    return `${this.getOrigin()}/salary/getByEmployeeId/${nsID}`;
  }
}
