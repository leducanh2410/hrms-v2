export class PhapNhan {
  id: number;
  tenPhapNhan: string;
  maSoThue: string;
  diaChi: string;
  nguoiDaiDien: string;
  soDienThoai: string;
  email: string;
  ngayThanhLap: Date;
  trangThai: boolean;
  ghiChu: string;

  constructor(
    id: number = null,
    tenPhapNhan: string = '',
    maSoThue: string = '',
    diaChi: string = '',
    nguoiDaiDien: string = '',
    soDienThoai: string = '',
    email: string = '',
    ngayThanhLap: Date = new Date(),
    trangThai: boolean = true,
    ghiChu: string = ''
  ) {
    this.id = id;
    this.tenPhapNhan = tenPhapNhan;
    this.maSoThue = maSoThue;
    this.diaChi = diaChi;
    this.nguoiDaiDien = nguoiDaiDien;
    this.soDienThoai = soDienThoai;
    this.email = email;
    this.ngayThanhLap = ngayThanhLap;
    this.trangThai = trangThai;
    this.diaChi = ghiChu;
  }
}
