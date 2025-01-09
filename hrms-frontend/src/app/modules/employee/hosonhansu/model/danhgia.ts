// Class for DanhGia
export class DanhGia {
  id: number;
  thoiGianTuNgay: string;
  thoiGianDenNgay: string;
  thoiHan: string;
  nhanXet: string;
  caNhanDanhGia: string;
  caNhanXepLoai: string;
  diem: number;
  xepLoai: string;
  diemManh: string;
  hanChe: string;
  canCaiThien: string;
  ketQuaTangLuong: string;
  ketQuaThuong: string;

  constructor(
    id: number = null,
    thoiGianTuNgay: string = '',
    thoiGianDenNgay: string = '',
    thoiHan: string = '',
    nhanXet: string = '',
    caNhanDanhGia: string = '',
    caNhanXepLoai: string = '',
    diem: number = 0,
    xepLoai: string = '',
    diemManh: string = '',
    hanChe: string = '',
    canCaiThien: string = '',
    ketQuaTangLuong: string = '',
    ketQuaThuong: string = ''
  ) {
    this.id = id;
    this.thoiGianTuNgay = thoiGianTuNgay;
    this.thoiGianDenNgay = thoiGianDenNgay;
    this.thoiHan = thoiHan;
    this.nhanXet = nhanXet;
    this.caNhanDanhGia = caNhanDanhGia;
    this.caNhanXepLoai = caNhanXepLoai;
    this.diem = diem;
    this.xepLoai = xepLoai;
    this.diemManh = diemManh;
    this.hanChe = hanChe;
    this.canCaiThien = canCaiThien;
    this.ketQuaTangLuong = ketQuaTangLuong;
    this.ketQuaThuong = ketQuaThuong;
  }
}
