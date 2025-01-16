export class DotDanhGia {
    id: number;
    tenDotDanhGia: string;
    moTa: string;
  
    constructor(id: number = 1, tenDotDanhGia: string = '', mota: string = '') {
      this.id = id;
      this.tenDotDanhGia = tenDotDanhGia;
      this.moTa = mota;
    }
  }
  