export class DsNhansuColumnModel {
  field!: string;
  columnName!: string;
  columnWidth!: string;
  width?: string;
}

export const COLUMN_INIT_DS_NHANSU: DsNhansuColumnModel[] = [
  // {
  //     field: 'id',
  //     columnName: 'ID',
  //     columnWidth: 'w-[35px]',
  // },
  {
    field: 'employeeCode',
    columnName: 'Mã NV',
    columnWidth: 'w-24 ',
    width: '60',
  },
  {
    field: 'employeeName',
    columnName: 'Họ và tên',
    // columnWidth: 'w-[150px]',
    // columnWidth: 'w-1/5',
    columnWidth: 'w-[16vh]',
    width: '200',
  },
  {
    field: 'birthday',
    columnName: 'Ngày sinh',
    columnWidth: 'w-24',
    width: '60',
  },
  {
    field: 'gender',
    columnName: 'Giới tính',
    columnWidth: 'w-26',
    width: '60',
  },
  {
    field: 'cccdNumber',
    columnName: 'CCCD',
    columnWidth: 'w-24',
    width: '60',
  },
  {
    field: 'queQuan',
    columnName: 'Quê quán',
    columnWidth: 'w-[30vh]',
    width: '200',
  },
  {
    field: 'quaTrinhCongTac.chucdanh.tenchucanh',
    columnName: 'Chức danh',
    columnWidth: 'w-[30vh]',
    width: '200',
  },
  {
    field: 'quaTrinhCongTac.department.departmentName',
    columnName: 'Phòng ban',
    columnWidth: 'w-[48vh] grow',
    width: '320',
  },
];

export const COLUMN_SELECT_DS_NHANSU: DsNhansuColumnModel[] = [
  {
    columnName: 'Ngày sinh',
    columnWidth: 'w-[120px]',
    field: 'strNgaysinh',
  },
  {
    columnName: 'Tình trạng hợp đồng',
    columnWidth: 'w-[200px]',
    field: 'tinhtrangHD',
  },
  {
    columnName: 'Số HĐLĐ',
    columnWidth: 'w-[200px]',
    field: 'soHDLD',
  },
  {
    columnName: 'Ngày hiệu lực hợp đồng',
    columnWidth: 'w-[180px]',
    field: 'strngayKyHopDong',
  },
  {
    columnName: 'Tổ nhóm',
    columnWidth: 'w-[150px]',
    field: 'tento',
  },
  {
    columnName: 'Mã ngạch lương',
    columnWidth: 'w-[130px]',
    field: 'thangBL',
  },
  {
    columnName: 'Bậc lương',
    columnWidth: 'w-[80px]',
    field: 'bacluong_totbac',
  },
  {
    columnName: 'Hệ số lương',
    columnWidth: 'w-[100px]',
    field: 'hesoluong',
  },
  {
    columnName: 'Ngày hiệu lực lương',
    columnWidth: 'w-[150px]',
    field: 'strNgayHlucluong',
  },
  {
    columnName: 'Mốc căn cứ nâng lương',
    columnWidth: 'w-[150px]',
    field: 'strMoctinhluong',
  },
  {
    columnName: 'Mức lương',
    columnWidth: 'w-[100px]',
    field: 'strMucluong',
  },
  {
    columnName: 'Lương khoán',
    columnWidth: 'w-[100px]',
    field: 'luongkhoan',
  },
  {
    columnName: 'Hệ số bảo lưu',
    columnWidth: 'w-[120px]',
    field: 'baoluu',
  },
  {
    columnName: 'Số sổ BHXH',
    columnWidth: 'w-[140px]',
    field: 'soBHXH',
  },
  {
    columnName: 'Số thẻ BHYT',
    columnWidth: 'w-[140px]',
    field: 'soBHYT',
  },
  {
    columnName: 'Nơi khám chữa bệnh',
    columnWidth: 'w-[160px]',
    field: 'noiKhambenh',
  },
  {
    columnName: 'Số tài khoản',
    columnWidth: 'w-[120px]',
    field: 'sotk',
  },
  {
    columnName: 'Tên ngân hàng',
    columnWidth: 'w-[200px]',
    field: 'tennganhang',
  },
  {
    columnName: 'Chi nhánh ngân hàng',
    columnWidth: 'w-[200px]',
    field: 'chinhanhNH',
  },
  {
    columnName: 'Chủ tài khoản',
    columnWidth: 'w-[150px]',
    field: 'chutk',
  },
  {
    // columnName: 'Số CMND',
    columnName: 'Mã Định danh cá nhân (Số CCCD)',
    columnWidth: 'w-[120px]',
    field: 'soCMND',
  },
  {
    columnName: 'Ngày cấp CCCD',
    // columnName: 'Ngày cấp CMND',
    columnWidth: 'w-[120px]',
    field: 'strNgaycapCMND',
  },
  {
    columnName: 'Nơi cấp CCCD',
    // columnName: 'Nơi cấp CMND',
    columnWidth: 'w-[200px]',
    field: 'noicapCMND',
  },
  {
    columnName: 'Số điện thoại',
    columnWidth: 'w-[150px]',
    field: 'dienthoai',
    width: '120',
  },
  {
    columnName: 'Email',
    columnWidth: 'w-[240px]',
    field: 'email',
    width: '160',
  },
  {
    columnName: 'Trình độ văn hóa',
    columnWidth: 'w-[120px]',
    field: 'trinhdovh',
  },
  {
    columnName: 'Học hàm',
    columnWidth: 'w-[150px]',
    field: 'hocham',
  },
  {
    columnName: 'Trình độ (cao nhất)',
    columnWidth: 'w-[150px]',
    field: 'trinhdo_caonhat',
  },
  {
    columnName: 'Học vị (cao nhất)',
    columnWidth: 'w-[150px]',
    field: 'hocvi_caonhat',
  },
  {
    columnName: 'Ngành nghề đào tạo (cao nhất)',
    columnWidth: 'w-[200px]',
    field: 'nganhnghe_caonhat',
  },
  {
    columnName: 'Hình thức đào tạo (cao nhất)',
    columnWidth: 'w-[150px]',
    field: 'hthucdtao_caonhat',
  },
  {
    columnName: 'Trình độ (CMC)',
    columnWidth: 'w-[150px]',
    field: 'trinhdo',
  },
  {
    columnName: 'Học vị (CMC)',
    columnWidth: 'w-[150px]',
    field: 'hocvi',
  },
  {
    columnName: 'Ngành nghề đào tạo (CMC)',
    columnWidth: 'w-[200px]',
    field: 'nganhnghe',
  },
  {
    columnName: 'Hình thức đào tạo (CMC)',
    columnWidth: 'w-[150px]',
    field: 'hinhthucdtao',
  },
  {
    columnName: 'Trường đào tạo',
    columnWidth: 'w-[150px]',
    field: 'truongdt',
  },
  {
    columnName: 'Trình dộ QLKT',
    columnWidth: 'w-[150px]',
    field: 'quanlykt',
  },
  {
    columnName: 'Trình độ LLCT',
    columnWidth: 'w-[150px]',
    field: 'lyluanct',
  },
  {
    columnName: 'Trình độ Ngoại ngữ',
    columnWidth: 'w-[150px]',
    field: 'trinhdoNgoaiNgu',
  },
  {
    columnName: 'Ngày vào ngành',
    columnWidth: 'w-[150px]',
    field: 'strNgayvaonganh',
  },
  {
    columnName: 'Ngày vào cơ quan',
    columnWidth: 'w-[150px]',
    field: 'strNgayvaocoquan',
  },
  {
    columnName: 'Ngày tuyển dụng',
    columnWidth: 'w-[150px]',
    field: 'strNgaytuyendung',
  },
  {
    columnName: 'Nơi sinh',
    columnWidth: 'w-[300px]',
    field: 'noisinhdaydu',
    width: '320',
  },
  {
    columnName: 'Hộ khẩu thường trú',
    columnWidth: 'w-[300px]',
    field: 'hokhaudaydu',
    width: '320',
  },
  {
    columnName: 'Quê quán',
    columnWidth: 'w-[300px]',
    field: 'quequan',
    width: '320',
  },
  {
    columnName: 'Chỗ ở hiện nay',
    columnWidth: 'w-[300px]',
    field: 'choohn',
    width: '320',
  },
  {
    columnName: 'Ảnh',
    columnWidth: 'w-[60px]',
    field: 'strAnh',
    width: '40',
  },
  {
    columnName: 'Hiệu chỉnh thân nhân',
    columnWidth: 'w-[150px]',
    field: 'strHieuchinhGiadinh',
  },
  {
    columnName: 'Đảng viên',
    columnWidth: 'w-[80px]',
    field: 'strDangvien',
  },
  {
    columnName: 'Ngày vào Đảng',
    columnWidth: 'w-[120px]',
    field: 'strNgayvaodang',
  },
  {
    columnName: 'Ngày chính thức',
    columnWidth: 'w-[140px]',
    field: 'strNgaychinhthucdang',
  },
  {
    columnName: 'Ngày nghỉ việc',
    columnWidth: 'w-[120px]',
    field: 'strNgaynghihuu',
  },
  {
    columnName: 'Bí danh',
    columnWidth: 'w-[100px]',
    field: 'tendanggoi',
  },
  {
    columnName: 'Dân tộc',
    columnWidth: 'w-[60px]',
    field: 'dantoc',
  },
  {
    columnName: 'Phân loại chức danh',
    columnWidth: 'w-[150px]',
    field: 'phanloaichucdanh',
  },
  {
    columnName: 'Ghi chú',
    columnWidth: 'w-[200px]',
    field: 'ghichu',
  },
  {
    columnName: 'Thời gian bổ nhiệm',
    columnWidth: 'w-[180px]',
    field: 'strNgaybonhiem',
  },
  {
    columnName: 'Trình độ Quản lý',
    columnWidth: 'w-[180px]',
    field: 'trinhdoqly',
  },
  {
    columnName: 'Mã số thuế',
    columnWidth: 'w-[140px]',
    field: 'masothue',
  },
  {
    columnName: 'Tôn giáo',
    columnWidth: 'w-[100px]',
    field: 'tongiao',
  },
];
