import { CapDoNS } from './capdonhansu';
import { ChucDanh } from './chucdanh';
import { DongXe } from './dongxe';
import { LoaiLaoDong } from './loailaodong';
import { LoaiQTCT } from './loaiQtct';
import { NghiepVu } from './nghiepvu';
import { PhapNhan } from './phapnhan';
import { PhongBan } from './phongban';
import { ThanhPhanNS } from './thanhphannhansu';
import { VanPhongLamViec } from './vanphonglamviec';

export class QtrinhlamviecBean {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  ngayHieuLuc: Date;
  ngayQuyetDinh: string;
  trangthai: boolean;
  ghiChu: string;
  loaiQtct: LoaiQTCT;
  department: PhongBan;
  chucdanh: ChucDanh;
  thanhphannhansu: ThanhPhanNS;
  capdonhansu: CapDoNS;
  dongxe: DongXe;
  loailaodong: LoaiLaoDong;
  nghiepvu: NghiepVu;
  phapnhan: PhapNhan;
  vanphonglamviec: VanPhongLamViec;

  constructor(
    id: number = null,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    ngayHieuLuc: Date = new Date(),
    ngayQuyetDinh: string = '',
    trangthai: boolean = true,
    ghiChu: string = '',
    loaiQtct: LoaiQTCT = new LoaiQTCT(),
    department: PhongBan = new PhongBan(),
    chucdanh: ChucDanh = new ChucDanh(),
    thanhphannhansu: ThanhPhanNS = new ThanhPhanNS(),
    capdonhansu: CapDoNS = new CapDoNS(),
    dongxe: DongXe = new DongXe(),
    loailaodong: LoaiLaoDong = new LoaiLaoDong(),
    nghiepvu: NghiepVu = new NghiepVu(),
    phapnhan: PhapNhan = new PhapNhan(),
    vanphonglamviec: VanPhongLamViec = new VanPhongLamViec()
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.ngayHieuLuc = ngayHieuLuc;
    this.ngayQuyetDinh = ngayQuyetDinh;
    this.trangthai = trangthai;
    this.ghiChu = ghiChu;
    this.loaiQtct = loaiQtct;
    this.department = department;
    this.chucdanh = chucdanh;
    this.thanhphannhansu = thanhphannhansu;
    this.capdonhansu = capdonhansu;
    this.dongxe = dongxe;
    this.loailaodong = loailaodong;
    this.nghiepvu = nghiepvu;
    this.phapnhan = phapnhan;
    this.vanphonglamviec = vanphonglamviec;
  }
}
