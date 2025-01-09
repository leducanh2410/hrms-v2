// Class for TrinhDoTinHoc
export class TrinhDoTinHoc {
  id: number;
  laKiNangChinh: boolean;
  donViDaoTao: string;
  diaChi: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  ngayCap: string;
  ngayHetHan: string;
  ghiChu: string;

  constructor(
    id: number = null,
    laKiNangChinh: boolean = false,
    donViDaoTao: string = '',
    diaChi: string = '',
    ngayBatDau: string = '',
    ngayKetThuc: string = '',
    ngayCap: string = '',
    ngayHetHan: string = '',
    ghiChu: string = ''
  ) {
    this.id = id;
    this.laKiNangChinh = laKiNangChinh;
    this.donViDaoTao = donViDaoTao;
    this.diaChi = diaChi;
    this.ngayBatDau = ngayBatDau;
    this.ngayKetThuc = ngayKetThuc;
    this.ngayCap = ngayCap;
    this.ngayHetHan = ngayHetHan;
    this.ghiChu = ghiChu;
  }
}
