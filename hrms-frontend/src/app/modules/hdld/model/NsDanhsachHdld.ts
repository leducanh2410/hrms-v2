export interface NsDanhsachHdld {
    id: number;
    dsTimkiemId: number;
    donviId: number;
    nsId: number;
    tenkhaisinh: string;
    sohieu: string;
    gioitinh: boolean;
    ngaysinh: string;
    noisinh: string;
    quoctich: string;
    nghenghiep: string;
    diachithuongtru: string;
    socmt: string;
    ngaycapcmt: string;
    noicapcmt: string;
    ttrangIdCu: number;
    ngayHieulucCu: Date;
    ttrangId: number;
    ngayHieuluc: Date;
    ngaykt: Date;
    luongId: number;
    phucapId: number;
    luongkhoan: number;
    vtriId: number;
    departmentId: number;
    dayHoso: boolean;
    qdinhId: number;
    isdeleted: boolean;
    createTime: Date;
    updateTime: Date;
    createUser: string;
    updateUser: string;
    checkAct: boolean;
  
    soqd: string;
    nguoiky: string;
    chucvuky: string;
    ngaykyQd: Date;
    noidung: string;
    fileName: string;
    fileExtend: string;
    file: Uint8Array;
    isSelectFile: boolean;
  
    phongban: string;
    vtricdanh: string;
    trinhdocmon: string;
    donvi: string;
    diachidonvi: string;
    loaihdldcu: string;
    strNgayhieuluccu: string;
    loaihdldmoi: string;
    strNgayhieulucmoi: string;
    strMangachluong: string;
    tenngachluong: string;
    strBac: string;
    strHeso: string;
    strDayhoso: string;
  
    lTinhtrangns: any;
    lPhucapHeso: any;
    strPhucap: string;
  
    trangthaiky: string;
    strTrangthaiky: string;
    trangthaixuly: string;
    isPhathanh: boolean;
    hasFileDuthao: boolean;
    fileDuthaoName: string;
    fileDuthaoExtend: string;
    fileDuthaoContent: Uint8Array;
    fileAttach: any;
   
  }
  
  