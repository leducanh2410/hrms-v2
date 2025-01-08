export class DangDoan {
  id: number;
  ngayNhapNgu: string;
  ngayXuatNgu: string;
  quanHam: string;
  chucVuBoDoi: string;
  donViCongTac: string;
  laDangVien: boolean;
  ngayChinhThuc: string;
  ngayVaoDang: string;
  soTheDang: string;
  trinhDoChinhTri: string;
  chucVuDang: string;
  ngayGiuChucVuDang: string;
  nguoiGioiThieu1: string;
  nguoiGioiThieu2: string;
  laDoanVien: boolean;
  ngayVaoDoan: string;
  noiKetNapDoan: string;
  chucVuDoan: string;
  ngayGiuChucVuDoan: string;
  ngayNhapNguCm: string;
  ngayXuatNguCm: string;
  chucVuCm: string;
  loaiThuongBinh: string;
  laThanhVienHccb: boolean;
  ngayKetNapHccb: string;
  soTheHccb: string;
  chucVuHccb: string;
  danQuanTuVe: boolean;
  ngayKetNapDqtv: string;
  chucVuDqtv: string;
  ngayXuatNguDqtv: string;
  giaDinhChinhSach: boolean;
  loaiChinhSach: string;

  // Constructor có tham số
  constructorWithParams(
    id: number = 0,
    ngayNhapNgu: string = '',
    ngayXuatNgu: string = '',
    quanHam: string = '',
    chucVuBoDoi: string = '',
    donViCongTac: string = '',
    laDangVien: boolean = false,
    ngayChinhThuc: string = '',
    ngayVaoDang: string = '',
    soTheDang: string = '',
    trinhDoChinhTri: string = '',
    chucVuDang: string = '',
    ngayGiuChucVuDang: string = '',
    nguoiGioiThieu1: string = '',
    nguoiGioiThieu2: string = '',
    laDoanVien: boolean = false,
    ngayVaoDoan: string = '',
    noiKetNapDoan: string = '',
    chucVuDoan: string = '',
    ngayGiuChucVuDoan: string = '',
    ngayNhapNguCm: string = '',
    ngayXuatNguCm: string = '',
    chucVuCm: string = '',
    loaiThuongBinh: string = '',
    laThanhVienHccb: boolean = false,
    ngayKetNapHccb: string = '',
    soTheHccb: string = '',
    chucVuHccb: string = '',
    danQuanTuVe: boolean = false,
    ngayKetNapDqtv: string = '',
    chucVuDqtv: string = '',
    ngayXuatNguDqtv: string = '',
    giaDinhChinhSach: boolean = false,
    loaiChinhSach: string = ''
  ) {
    this.id = id;
    this.ngayNhapNgu = ngayNhapNgu;
    this.ngayXuatNgu = ngayXuatNgu;
    this.quanHam = quanHam;
    this.chucVuBoDoi = chucVuBoDoi;
    this.donViCongTac = donViCongTac;
    this.laDangVien = laDangVien;
    this.ngayChinhThuc = ngayChinhThuc;
    this.ngayVaoDang = ngayVaoDang;
    this.soTheDang = soTheDang;
    this.trinhDoChinhTri = trinhDoChinhTri;
    this.chucVuDang = chucVuDang;
    this.ngayGiuChucVuDang = ngayGiuChucVuDang;
    this.nguoiGioiThieu1 = nguoiGioiThieu1;
    this.nguoiGioiThieu2 = nguoiGioiThieu2;
    this.laDoanVien = laDoanVien;
    this.ngayVaoDoan = ngayVaoDoan;
    this.noiKetNapDoan = noiKetNapDoan;
    this.chucVuDoan = chucVuDoan;
    this.ngayGiuChucVuDoan = ngayGiuChucVuDoan;
    this.ngayNhapNguCm = ngayNhapNguCm;
    this.ngayXuatNguCm = ngayXuatNguCm;
    this.chucVuCm = chucVuCm;
    this.loaiThuongBinh = loaiThuongBinh;
    this.laThanhVienHccb = laThanhVienHccb;
    this.ngayKetNapHccb = ngayKetNapHccb;
    this.soTheHccb = soTheHccb;
    this.chucVuHccb = chucVuHccb;
    this.danQuanTuVe = danQuanTuVe;
    this.ngayKetNapDqtv = ngayKetNapDqtv;
    this.chucVuDqtv = chucVuDqtv;
    this.ngayXuatNguDqtv = ngayXuatNguDqtv;
    this.giaDinhChinhSach = giaDinhChinhSach;
    this.loaiChinhSach = loaiChinhSach;
  }
}
