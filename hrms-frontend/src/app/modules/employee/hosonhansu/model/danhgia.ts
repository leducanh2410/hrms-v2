import { DotDanhGia } from './dotdanhgia';

// Class for DanhGia
export class DanhGia {
  id: number;
  dotDanhGia: DotDanhGia;
  thoiGianTuNgay: Date;
  thoiGianDenNgay: Date;
  thoiHan: Date;
  nhanXet: string;
  caNhanDanhGia: string;
  caNhanXepLoai: string;
  diem: number;
  xepLoai: number;
  diemManh: string;
  hanChe: string;
  canCaiThien: string;
  ketQuaTangLuong: number;
  ketQuaThuong: number;

  constructor(
    id: number = null,
    dotDanhGia: DotDanhGia = new DotDanhGia(),
    thoiGianTuNgay: Date = new Date(),
    thoiGianDenNgay: Date = new Date(),
    thoiHan: Date = new Date(),
    nhanXet: string = '',
    caNhanDanhGia: string = '',
    caNhanXepLoai: string = '',
    diem: number = 0,
    xepLoai: number = 0,
    diemManh: string = '',
    hanChe: string = '',
    canCaiThien: string = '',
    ketQuaTangLuong: number = 0,
    ketQuaThuong: number = 0
  ) {
    this.id = id;
    this.dotDanhGia = dotDanhGia;
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
