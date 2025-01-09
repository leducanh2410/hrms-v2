// Class for TrinhDoChuyenMon
export class TrinhDoChuyenMon {
  id: number;
  bangCap: string;
  xepLoai: string;
  heDaoTao: string;
  chuyenNghanh: string;
  donViDaoTao: string;
  laChuyenMonChinh: boolean;
  dayStarted: string;
  dayEnded: string;
  ngayTotNghiep: string;
  note: string;

  constructor(
    id: number = null,
    bangCap: string = '',
    xepLoai: string = '',
    heDaoTao: string = '',
    chuyenNghanh: string = '',
    donViDaoTao: string = '',
    laChuyenMonChinh: boolean = false,
    dayStarted: string = '',
    dayEnded: string = '',
    ngayTotNghiep: string = '',
    note: string = ''
  ) {
    this.id = id;
    this.bangCap = bangCap;
    this.xepLoai = xepLoai;
    this.heDaoTao = heDaoTao;
    this.chuyenNghanh = chuyenNghanh;
    this.donViDaoTao = donViDaoTao;
    this.laChuyenMonChinh = laChuyenMonChinh;
    this.dayStarted = dayStarted;
    this.dayEnded = dayEnded;
    this.ngayTotNghiep = ngayTotNghiep;
    this.note = note;
  }
}
