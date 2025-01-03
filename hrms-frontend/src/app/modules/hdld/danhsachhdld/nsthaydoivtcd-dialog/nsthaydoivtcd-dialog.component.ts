import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MessageBox } from '../../../../fuse/components/message-box/message-box.provider';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../ngxstore/state/app.state';
import { CommonApiService } from '../../../../services/commonHttp';
import { hdldURL } from '../../../../services/employe/hdldURL';
import { HSNhansuURL } from '../../../../services/employe/hosonhansuURL';
import { MessageService } from '../../../../shared/message.services';
import moment from 'moment';
import { Moment } from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { FormdonviTreeComponent } from '../../../../../assets/lib/formdonvi-tree/src/public-api';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-nsthaydoivtcd-dialog',
  templateUrl: './nsthaydoivtcd-dialog.component.html',
  styleUrls: ['./nsthaydoivtcd-dialog.component.scss'],
  imports: [FormsModule, MatFormFieldModule, MatDatepickerModule, TableModule],
})
export class NsthaydoivtcdDialogComponent {
  donviId: any;
  tenDonvi: string;
  donviList: any[];
  nsList: [] = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  selectedValue: any;
  fDate: Moment = moment();
  tDate: Moment = moment();
  _selectedRowData: any[] = [];
  @Output() selectedDataChange = new EventEmitter<any[]>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<NsthaydoivtcdDialogComponent>,
    private messageService: MessageService,
    private http: CommonApiService,
    private _matDialog: MatDialog,
    private store: Store<AppState>,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    if (this.data != null && this.data.donviId != null) {
      this.donviId = this.data.donviId;
    }

    // this.http
    //   .get(HSNhansuURL.getAllListDonvi())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.donviList = res.data;
    //   });
  }

  close(): void {
    this.matDialogRef.close();
  }

  onChonDonvi() {
    const dialogRef = this._matDialog.open(FormdonviTreeComponent, {
      disableClose: false,
      data: {
        donvis: this.donviList,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.donviId = result.data.organizationId;
      this.tenDonvi = result.data.orgName;
      this.loadData();
    });
  }

  onChonNS() {
    this.matDialogRef.close(this._selectedRowData);
  }

  onChangeTuNgay(event: any): void {
    this.loadData();
  }

  onChangeDenNgay(event: any): void {
    this.loadData();
  }

  onChangeDate() {
    this.loadData();
  }

  loadData() {
    if (this.fDate && this.tDate) {
      // Lấy năm
      const year = this.fDate.year();
      // Lấy tháng (đánh số từ 0 đến 11)
      const month = this.fDate.month() + 1;

      this.http
        .get(hdldURL.getDsNhansuThaydoiVtri(this.donviId, year, month))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res) => {
          if (res.state) {
            this.nsList = res.data;
          }
        });
    }
  }

  onRowSelect(event: any) {
    this._selectedRowData.push(event.data);
    this.selectedDataChange.emit(this._selectedRowData);
  }

  onRowUnselect(event: any) {
    const index = this._selectedRowData.findIndex(
      (item) => item === event.data
    );
    if (index !== -1) {
      this._selectedRowData.splice(index, 1);
      this.selectedDataChange.emit(this._selectedRowData);
    }
  }
}
