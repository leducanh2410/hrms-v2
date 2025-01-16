import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { NhanVien } from '../../../employee/hosonhansu/model/nhanvien';
import { ShareData } from '../../../../shared/shareservice.service';
import { NHAN_SU } from '../../../../shared/appkeymessages';
interface Employee {
  id: number;
  name: string;
  code: string;
}

@Component({
  selector: 'app-list-employee',
  imports: [
    MatFormFieldModule,
    TableModule,
    CommonModule,
    MatTableModule,
    MatInputModule,
    InputTextModule,
    MatIconModule
  ],
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.css',
})
export class ListEmployeeComponent implements OnInit {
  @Output() empSelected = new EventEmitter<number>();
  @Input('listNhanVien') listNhanSu: NhanVien[];
  itemActive: number = 1;
  displayedColumns: string[] = ['employeeName', 'employeeCode'];
  dataSource: NhanVien[] = [];
  private _shareData: ShareData = new ShareData()

  
  // Employee[] = [
  //   { id: 1, name: 'Chu Diệu Linh', code: '1809225' },
  //   { id: 2, name: 'Đỗ Khương Duy', code: '2411302' },
  //   { id: 3, name: 'Lê Văn Hiếu', code: '2010324' },
  //   { id: 4, name: 'Đặng Đình Hiếu', code: '1711022' },
  //   { id: 5, name: 'Đinh Đức Giang', code: '2304267' },
  //   { id: 6, name: 'Nguyễn Thế Hòa', code: '1611036' },
  //   { id: 7, name: 'Nguyễn Bá Hùng', code: '1405140' },
  //   { id: 8, name: 'Nguyễn Tuấn Hùng', code: '1810141' },
  //   { id: 9, name: 'Lê Thị Quỳnh Trang', code: '1904602' },
  //   { id: 10, name: 'Đỗ Duy Thái', code: '1904622' },
  //   { id: 11, name: 'Nguyễn Thị Phương Hạnh', code: '1904623' },
  //   { id: 12, name: 'Nguyễn Ngọc Đãi', code: '1904624' },
  //   { id: 13, name: 'Nguyễn Văn Mạnh', code: '1904625' },
  //   // Thêm dữ liệu tại đây
  // ];

  onSelectItem(id: number){
    this.itemActive = id;
    this._shareData.sendMessage(NHAN_SU.NSID, id);
    this.empSelected.emit(id)
  }

  ngOnInit(): void {
    this.dataSource = this.listNhanSu
  }  

}
