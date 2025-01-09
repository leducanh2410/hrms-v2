import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonApiService } from '../../../services/commonHttp';
import { TienichVPURL } from '../../../services/tienichvp/tienichVPURL';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
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
import { SharedModule } from '../../../shared/shared.module';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-nhansu',
  templateUrl: './nhansu.component.html',
  styleUrls: ['./nhansu.component.scss'],
  imports: [
    CommonModule,
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
    SharedModule,
    TableModule,
  ],
})
export class NhansuComponent implements OnInit {
  allNhansu: any;
  selected: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private http: CommonApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<NhansuComponent>
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.allNhansu = this.data;
    } else {
      this.http
        .get(TienichVPURL.allNhansu())
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          this.allNhansu = res.data;
        });
    }
  }

  onRowSelect(event, selected) {
    this.selected = selected;
    this.matDialogRef.close(selected);
  }
  /**
   * Save and close
   */
  saveAndClose(): void {
    // Close the dialog
    this.matDialogRef.close();
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
