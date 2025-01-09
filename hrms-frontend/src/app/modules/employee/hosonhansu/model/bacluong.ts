export class BacLuong {
    id: number; // int
    tenBacluong: string; // varchar(255)
  
    constructor(
      id: number = 0,
      tenBacluong: string = ''
    ) {
      this.id = id;
      this.tenBacluong = tenBacluong;
    }
  }
  