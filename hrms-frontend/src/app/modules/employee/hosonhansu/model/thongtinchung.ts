export class THONG_TIN_CHUNG {
  employee_id: number; // int, không null
  employee_name: string; // varchar(255)
  employee_code: string; // varchar(255)
  birthday: string; // string
  gender: number; // int
  cccd_number: string; // varchar(255)
  cccd_ngaycap: string; // string
  cccd_noicap: string; // varchar(255)
  phone: string; //
  marriage_status: number; // int
  noi_sinh: string; // varchar(255)
  que_quan: string; // varchar(255)
  dia_chi: string;
  nationality: string; // varchar(255)
  ethnic: string; // varchar(255)
  ma_so_thue: string; // varchar(45)
  ngay_vao_lam: string; // string
  tongiao: string; // varchar(45)
  phongban: string;
  ngayvaodonvi: string;
  vitrichucdanh: string;
  ngayKiHdld: string;

  constructor(
    employee_id: number = 0,
    employee_name: string = '',
    employee_code: string = '',
    birthday: string = '',
    gender: number = 0,
    cccd_number: string = '',
    cccd_ngaycap: string = '',
    cccd_noicap: string = '',
    phone: string = '',
    marriage_status: number = 0,
    noi_sinh: string = '',
    que_quan: string = '',
    dia_chi: string = '',
    nationality: string = '',
    ethnic: string = '',
    ma_so_thue: string = '',
    ngay_vao_lam: string = '',
    tongiao: string = '',
    phongban: string = '',
    ngayvaodonvi: string = '',
    vitrichucdanh: string = '',
    ngayKiHdld: string = ''
  ) {
    this.employee_id = employee_id;
    this.employee_name = employee_name;
    this.employee_code = employee_code;
    this.birthday = birthday;
    this.gender = gender;
    this.cccd_number = cccd_number;
    this.cccd_ngaycap = cccd_ngaycap;
    this.cccd_noicap = cccd_noicap;
    this.phone = phone;
    this.marriage_status = marriage_status;
    this.noi_sinh = noi_sinh;
    this.que_quan = que_quan;
    this.dia_chi = dia_chi;
    this.nationality = nationality;
    this.ethnic = ethnic;
    this.ma_so_thue = ma_so_thue;
    this.ngay_vao_lam = ngay_vao_lam;
    this.tongiao = tongiao;
    this.phongban = phongban;
    this.ngayvaodonvi = ngayvaodonvi;
    this.vitrichucdanh = vitrichucdanh;
    this.ngayKiHdld = ngayKiHdld;
  }
}
