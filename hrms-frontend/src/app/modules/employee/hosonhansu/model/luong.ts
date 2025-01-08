import { BacLuong } from './bacluong';
import { NgachLuong } from './nghachluong';

export class Luong {
  id: number;
  ngachLuong: NgachLuong;
  bacluong: BacLuong;
  ngayHieuLuc: string; // string (ngày hiệu lực)
  luongThuNhap: number; // number (lương thu nhập)
  mucTamUngChung: number; // number (mức tạm ứng chung)
  thamNien: number; // number (thâm niên)
  kiemNhiem: number; // number (kiểm nhiệm)
  thuHut: number; // number (thu hút)
  bietPhai: number; // number (biệt phái)
  trachNhiem: number; // number (trách nhiệm)
  vungMien: number; // number (vùng miền)
  datDo: number; // number (đạt do)
  phuCap: number; // number (phụ cấp)
  trangThai: boolean; // boolean (trạng thái)

  constructor(
    id: number = null,
    ngachLuong: NgachLuong = new NgachLuong(),
    bacluong: BacLuong = new BacLuong(),
    ngayHieuLuc: string = '',
    luongThuNhap: number = 0,
    mucTamUngChung: number = 0,
    thamNien: number = 0,
    kiemNhiem: number = 0,
    thuHut: number = 0,
    bietPhai: number = 0,
    trachNhiem: number = 0,
    vungMien: number = 0,
    datDo: number = 0,
    phuCap: number = 0,
    trangThai: boolean = false
  ) {
    this.id = id;
    this.ngachLuong = ngachLuong;
    this.bacluong = bacluong;
    this.ngayHieuLuc = ngayHieuLuc;
    this.luongThuNhap = luongThuNhap;
    this.mucTamUngChung = mucTamUngChung;
    this.thamNien = thamNien;
    this.kiemNhiem = kiemNhiem;
    this.thuHut = thuHut;
    this.bietPhai = bietPhai;
    this.trachNhiem = trachNhiem;
    this.vungMien = vungMien;
    this.datDo = datDo;
    this.phuCap = phuCap;
    this.trangThai = trangThai;
  }
}
