import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { formatDate } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'lib-formquyetdinh',
  templateUrl: './formquyetdinh.component.html',
  styleUrls: [
    './formquyetdinh.component.css'
  ],
  imports: [
    MatCheckboxModule,
    MatTooltipModule,
    MatBadgeModule,
    MatDialogModule,
    MatDividerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    TableModule,
    DropdownModule,
    FormsModule
  ]
})
export class FormquyetdinhComponent implements OnInit {
  listYear: any[] = [];
  namQd = new Date().getFullYear();
  apiGetDsQdByNam = "";
  idField = "qdinhId";

  selected: any;
  listQd: any[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<FormquyetdinhComponent>,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.listYear = this.generateYearsList();
    if (this.data.apiGetDsQdByNam) {
      this.apiGetDsQdByNam = this.data.apiGetDsQdByNam;
      this.http.get(this.apiGetDsQdByNam + '/' + this.data.donviId + '/' + this.namQd).pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listQd = res.data;

        this.listQd.forEach(qd => {
          qd.ngayKyView = formatDate(qd.ngayKy, 'dd/MM/yyyy', 'en-US');
        })
        console.log(this.listQd);

      });
    }

    if (this.data.idField) {
      this.idField = this.data.idField;
    }
  }

  onRowSelect(event: any, selected: any) {
    this.selected = selected;
    this.matDialogRef.close(this.selected);
  }

  unSelectAndClose(): void {
    this.matDialogRef.close({
      data: {
        noiDung: null,
        qdinhId: null
      }
    });
  }
  /**
  * Save and close
  */
  saveAndClose(): void {
    if (this.selected == undefined || this.selected == null) {
      return;
    }
    this.matDialogRef.close(this.selected);
  }

  onClose(): void {
    // Close the dialog
    this.matDialogRef.close();
  }

  generateYearsList(): number[] {
    const currentYear = new Date().getFullYear();
    const yearsCount = 10;
    const yearsList = [];

    for (let i = 0; i <= yearsCount; i++) {
      yearsList.push(currentYear - i);
    }

    return yearsList;
  }

  changeNamqd(event: { value: number; }) {
    this.http.get(this.apiGetDsQdByNam + '/' + this.data.donviId + '/' + event.value).pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res: any) => {
      if (!res || !res.state) return;
      this.listQd = res.data;
      this.listQd.forEach(qd => {
        qd.ngayKyView = formatDate(qd.ngayKy, 'dd/MM/yyyy', 'en-US');
      })
    });
  }
}
