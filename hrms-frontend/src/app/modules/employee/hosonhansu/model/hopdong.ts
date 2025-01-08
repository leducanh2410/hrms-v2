import { ChucDanh } from './chucdanh';
import { LoaiHopDong } from './loaihopdong';
import { PhapNhan } from './phapnhan';

export class HopDong {
  id: number;
  loaiHopDong: LoaiHopDong;
  soHopDong: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  thoiHanHd: number;
  chucDanh: ChucDanh;
  ngayKyHopDong: string;
  ngayChamDutHopDong: string;
  dinhKemScanHopDong: string;
  luongBhxh: string;
  phapNhan: PhapNhan;
  trangThai: boolean;

  constructor(
    id: number = null,
    loaiHopDong: LoaiHopDong = new LoaiHopDong(),
    soHopDong: string = '',
    ngayBatDau: string = '',
    ngayKetThuc: string = '',
    thoiHanHd: number = 0,
    chucDanh: ChucDanh = new ChucDanh(),
    ngayKyHopDong: string = '',
    ngayChamDutHopDong: string = '',
    dinhKemScanHopDong: string = '',
    luongBhxh: string = '',
    phapNhan: PhapNhan = new PhapNhan(),
    trangThai: boolean = false
  ) {
    this.id = id;
    this.loaiHopDong = loaiHopDong;
    this.soHopDong = soHopDong;
    this.ngayBatDau = ngayBatDau;
    this.ngayKetThuc = ngayKetThuc;
    this.thoiHanHd = thoiHanHd;
    this.chucDanh = chucDanh;
    this.ngayKyHopDong = ngayKyHopDong;
    this.ngayChamDutHopDong = ngayChamDutHopDong;
    this.dinhKemScanHopDong = dinhKemScanHopDong;
    this.luongBhxh = luongBhxh;
    this.phapNhan = phapNhan;
    this.trangThai = trangThai;
  }
}
