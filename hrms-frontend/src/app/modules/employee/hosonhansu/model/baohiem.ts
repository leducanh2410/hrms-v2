export class BaoHiem {
  id: number; // int, không null
  soSoBhxh: string; // varchar(255)
  soSoBhxhCu: string; // varchar(255)
  maSoBhxh: string; // varchar(255)
  ngayCapBhxh: string; // string
  ngayThamGiaBhxh: string; // string
  noiCapBhxh: string; // varchar(255)
  nopSoBhxh: boolean; // boolean
  ngayNopSoBhxh: string; // string
  noiDongBh: string; // varchar(255)
  daNhanSoBhxhBaoLuu: boolean; // boolean
  ngayNhanSoBhxhBaoLuu: string | null; // string | null
  ngayBaoLuuSo: string | null; // string | null
  ngayTraSoBaoHiem: string; // string
  ngayHenNhanSo: string; // string
  ghiChuBhxh: string; // varchar(255)
  soBhyt: string; // varchar(255)
  noiDkKhamBenh: string; // varchar(255)
  ngayCapBhyt: string; // string
  ngayHetHanBhyt: string; // string
  khamSucKhoeDinhKy: boolean; // boolean
  maTinhBenhVienKcb: string; // varchar(255)
  maBenhVienDangKyKham: string; // varchar(255)
  ngayThamGiaBhtn: string; // string
  tgDongBhtnTruocKhiVaoCongTy: number; // int
  ghiChuBhyt: string; // varchar(255)
  laDoanVienCongDoan: boolean; // boolean
  chucVuDoanVienCongDoan: string; // varchar(255)
  ngayKetNap: string; // string
  ngayKetThuc: string | null; // string | null

  constructor(
    id: number = 0,
    soSoBhxh: string = '',
    soSoBhxhCu: string = '',
    maSoBhxh: string = '',
    ngayCapBhxh: string = '',
    ngayThamGiaBhxh: string = '',
    noiCapBhxh: string = '',
    nopSoBhxh: boolean = false,
    ngayNopSoBhxh: string = '',
    noiDongBh: string = '',
    daNhanSoBhxhBaoLuu: boolean = false,
    ngayNhanSoBhxhBaoLuu: string | null = null,
    ngayBaoLuuSo: string | null = null,
    ngayTraSoBaoHiem: string = '',
    ngayHenNhanSo: string = '',
    ghiChuBhxh: string = '',
    soBhyt: string = '',
    noiDkKhamBenh: string = '',
    ngayCapBhyt: string = '',
    ngayHetHanBhyt: string = '',
    khamSucKhoeDinhKy: boolean = false,
    maTinhBenhVienKcb: string = '',
    maBenhVienDangKyKham: string = '',
    ngayThamGiaBhtn: string = '',
    tgDongBhtnTruocKhiVaoCongTy: number = 0,
    ghiChuBhyt: string = '',
    laDoanVienCongDoan: boolean = false,
    chucVuDoanVienCongDoan: string = '',
    ngayKetNap: string = '',
    ngayKetThuc: string | null = null
  ) {
    this.id = id;
    this.soSoBhxh = soSoBhxh;
    this.soSoBhxhCu = soSoBhxhCu;
    this.maSoBhxh = maSoBhxh;
    this.ngayCapBhxh = ngayCapBhxh;
    this.ngayThamGiaBhxh = ngayThamGiaBhxh;
    this.noiCapBhxh = noiCapBhxh;
    this.nopSoBhxh = nopSoBhxh;
    this.ngayNopSoBhxh = ngayNopSoBhxh;
    this.noiDongBh = noiDongBh;
    this.daNhanSoBhxhBaoLuu = daNhanSoBhxhBaoLuu;
    this.ngayNhanSoBhxhBaoLuu = ngayNhanSoBhxhBaoLuu;
    this.ngayBaoLuuSo = ngayBaoLuuSo;
    this.ngayTraSoBaoHiem = ngayTraSoBaoHiem;
    this.ngayHenNhanSo = ngayHenNhanSo;
    this.ghiChuBhxh = ghiChuBhxh;
    this.soBhyt = soBhyt;
    this.noiDkKhamBenh = noiDkKhamBenh;
    this.ngayCapBhyt = ngayCapBhyt;
    this.ngayHetHanBhyt = ngayHetHanBhyt;
    this.khamSucKhoeDinhKy = khamSucKhoeDinhKy;
    this.maTinhBenhVienKcb = maTinhBenhVienKcb;
    this.maBenhVienDangKyKham = maBenhVienDangKyKham;
    this.ngayThamGiaBhtn = ngayThamGiaBhtn;
    this.tgDongBhtnTruocKhiVaoCongTy = tgDongBhtnTruocKhiVaoCongTy;
    this.ghiChuBhyt = ghiChuBhyt;
    this.laDoanVienCongDoan = laDoanVienCongDoan;
    this.chucVuDoanVienCongDoan = chucVuDoanVienCongDoan;
    this.ngayKetNap = ngayKetNap;
    this.ngayKetThuc = ngayKetThuc;
  }
}
