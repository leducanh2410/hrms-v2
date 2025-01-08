export class LoaiHopDong {
    id: number;
    tenLoaiHopDong: string;
  
    constructor(id: number = 0, tenLoaiHopDong: string = '') {
      this.id = id;
      this.tenLoaiHopDong = tenLoaiHopDong;
    }
  }