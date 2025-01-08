export class LoaiLaoDong {
  id: number;
  tenLoailaodong: string;

  constructor(id: number = null, tenLoailaodong: string = '') {
    this.id = id;
    this.tenLoailaodong = tenLoailaodong;
  }
}
