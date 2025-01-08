export class NgachLuong {
    id: number; // int
    tenNgachluong: string; // varchar(255)
  
    constructor(
      id: number = 0,
      tenNgachluong: string = ''
    ) {
      this.id = id;
      this.tenNgachluong = tenNgachluong;
    }
  }
  