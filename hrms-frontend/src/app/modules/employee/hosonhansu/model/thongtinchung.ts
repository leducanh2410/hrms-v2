import { BaoHiem } from './baohiem';
import { DangDoan } from './dangDoan';
import { DanhGia } from './danhgia';
import { HopDong } from './hopdong';
import { LienHe } from './lienhe';
import { Luong } from './luong';
import { NhanThan } from './nhanthan';
import { QtrinhlamviecBean } from './qtrinhlamviec';
import { TrinhDoChuyenMon } from './trinhdochuyenmon';
import { TrinhDoTinHoc } from './trinhdotinhoc';

export class THONG_TIN_CHUNG {
  id: number; // int, không null
  employeeName: string; // varchar(255)
  employeeCode: string; // varchar(255)
  birthday: string; // string
  gender: number; // int
  cccdNumber: string; // varchar(255)
  cccdNgaycap: Date; // string
  cccdNoicap: string; // varchar(255)
  phone: string; // varchar(255)
  marriageStatus: number; // int
  noiSinh: string; // varchar(255)
  queQuan: string; // varchar(255)
  diaChi: string; // varchar(255)
  nationality: string; // varchar(255)
  ethnic: string; // varchar(255)
  maSoThue: string; // varchar(45)
  ngayVaoLam: string; // string
  tongiao: string; // varchar(45)
  contact: LienHe;
  quaTrinhCongTac: QtrinhlamviecBean[];
  baoHiem: BaoHiem;
  luong: Luong[];
  hopDong: HopDong[];
  danhGia: DanhGia[];
  trinhDoChuyenMon: TrinhDoChuyenMon[];
  trinhDoTinHoc: TrinhDoTinHoc[];
  families: NhanThan[];
  dangDoan: DangDoan;
  trangThai: boolean;

  constructor(
    id: number = 0,
    employeeName: string = '',
    employeeCode: string = '',
    birthday: string = '',
    gender: number = 0,
    cccdNumber: string = '',
    cccdNgaycap: Date = new Date(),
    cccdNoicap: string = '',
    phone: string = '',
    marriageStatus: number = 0,
    noiSinh: string = '',
    queQuan: string = '',
    diaChi: string = '',
    nationality: string = '',
    ethnic: string = '',
    maSoThue: string = '',
    ngayVaoLam: string = '',
    tongiao: string = '',
    contact: LienHe = new LienHe(),
    quaTrinhCongTac: QtrinhlamviecBean[] = [],
    baoHiem: BaoHiem = new BaoHiem(),
    luong: Luong[] = [],
    hopDong: HopDong[] = [],
    danhGia: DanhGia[] = [],
    trinhDoChuyenMon: TrinhDoChuyenMon[] = [],
    trinhDoTinHoc: TrinhDoTinHoc[] = [],
    families: NhanThan[] = [],
    dangDoan: DangDoan = new DangDoan(),
    trangThai: boolean = false
  ) {
    this.id = id;
    this.employeeName = employeeName;
    this.employeeCode = employeeCode;
    this.birthday = birthday;
    this.gender = gender;
    this.cccdNumber = cccdNumber;
    this.cccdNgaycap = cccdNgaycap;
    this.cccdNoicap = cccdNoicap;
    this.phone = phone;
    this.marriageStatus = marriageStatus;
    this.noiSinh = noiSinh;
    this.queQuan = queQuan;
    this.diaChi = diaChi;
    this.nationality = nationality;
    this.ethnic = ethnic;
    this.maSoThue = maSoThue;
    this.ngayVaoLam = ngayVaoLam;
    this.tongiao = tongiao;
    this.contact = contact;
    this.quaTrinhCongTac = quaTrinhCongTac;
    this.baoHiem = baoHiem;
    this.luong = luong;
    this.hopDong = hopDong;
    this.danhGia = danhGia;
    this.trinhDoChuyenMon = trinhDoChuyenMon;
    this.trinhDoTinHoc = trinhDoTinHoc;
    this.families = families;
    this.dangDoan = dangDoan;
    this.trangThai = trangThai;
  }
}
