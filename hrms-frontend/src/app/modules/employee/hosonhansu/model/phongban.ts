export class PhongBan {
  id: number;
  departmentName: string;
  departmentAbove: string;

  constructor(
    id: number = null,
    departmentName: string = '',
    departmentAbove: string = ''
  ) {
    this.id = id;
    this.departmentName = departmentName;
    this.departmentAbove = departmentAbove;
  }
}
