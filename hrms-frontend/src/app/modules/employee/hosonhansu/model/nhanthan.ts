// Class for Family
export class NhanThan {
  id: number;
  laNguoiPhuThuoc: boolean;
  lamCungDonVi: boolean;
  tenNguoiThan: string;
  moiQuanHe: string;
  gioiTinh: number;
  ngaySinh: string;
  ngheNghiep: string;
  diaChi: string;

  constructor(
    id: number = null,
    laNguoiPhuThuoc: boolean = false,
    lamCungDonVi: boolean = false,
    tenNguoiThan: string = '',
    moiQuanHe: string = '',
    gioiTinh: number = 0,
    ngaySinh: string = '',
    ngheNghiep: string = '',
    diaChi: string = ''
  ) {
    this.id = id;
    this.laNguoiPhuThuoc = laNguoiPhuThuoc;
    this.lamCungDonVi = lamCungDonVi;
    this.tenNguoiThan = tenNguoiThan;
    this.moiQuanHe = moiQuanHe;
    this.gioiTinh = gioiTinh;
    this.ngaySinh = ngaySinh;
    this.ngheNghiep = ngheNghiep;
    this.diaChi = diaChi;
  }
}