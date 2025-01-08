export class LoaiQTCT {
  id: number;
  tenLoaiQtct: string;

  constructor(id: number = null, tenLoaiQtct: string = '') {
    this.id = id;
    this.tenLoaiQtct = tenLoaiQtct;
  }
}
