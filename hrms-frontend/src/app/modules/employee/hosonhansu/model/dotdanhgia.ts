export class DotDanhGia {
    id: number;
    tenDotDanhGia: string;
    moTa: string;
  
    constructor(id: number = null, tenDotDanhGia: string = '', mota: string = '') {
      this.id = id;
      this.tenDotDanhGia = tenDotDanhGia;
      this.moTa = mota;
    }
  }
  