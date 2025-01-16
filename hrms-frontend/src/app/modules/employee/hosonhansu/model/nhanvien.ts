export class NhanVien {
    id: number; // int, không null
  employeeName: string; // varchar(255)
  employeeCode: string; // varchar(255)

  constructor(
    id: number = 0,
    employeeName: string = '',
    employeeCode: string = '',
){
    this.id = id;
    this.employeeName = employeeName;
    this.employeeCode = employeeCode;
}
}
