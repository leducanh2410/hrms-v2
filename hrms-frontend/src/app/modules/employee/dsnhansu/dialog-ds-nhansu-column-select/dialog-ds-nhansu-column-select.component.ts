import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MessageBox } from '../../../../fuse/components/message-box/message-box.provider';
import { CommonApiService } from '../../../../services/commonHttp';
import { MessageService } from '../../../../shared/message.services';
import { Subject, takeUntil } from 'rxjs';
import {
  COLUMN_SELECT_DS_NHANSU,
  DsNhansuColumnModel,
} from '../dsnhansucolumn.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../ngxstore/state/app.state';
import { APP_ACTION } from '../../../../ngxstore/actions/app.actions';
import { TableModule } from 'primeng/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StoreModule } from '@ngrx/store';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-ds-nhansu-column-select',
  templateUrl: './dialog-ds-nhansu-column-select.component.html',
  styleUrls: ['./dialog-ds-nhansu-column-select.component.scss'],
  imports: [TableModule, MatFormFieldModule, StoreModule, MatInputModule],
})
export class DialogDsNhansuColumnSelectComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  public columns: DsNhansuColumnModel[] = COLUMN_SELECT_DS_NHANSU;
  public columnsSelected: any[] = [];
  private user: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _matDialogRef: MatDialogRef<DialogDsNhansuColumnSelectComponent>,
    private _matDialog: MatDialog,
    public messageBox: MessageBox,
    private messageService: MessageService,
    private http: CommonApiService,
    private store: Store<AppState>
  ) {}

  closeDialog(): void {
    this._matDialogRef.close();
  }

  ngOnInit(): void {
    const appUser = this.store.select((state) => state.appUser);
    appUser.pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      // console.log(res);
      const data = res;
      if (data && data.type === APP_ACTION.USER_INFO) {
        this.user = { ...data.payload };
        console.log(this.user);

        if (this.user && this.user.hsDsNhansuColumnSelected) {
          this.columnsSelected = this.user.hsDsNhansuColumnSelected;
        }
      }
    });
  }

  onSave() {
    this.user.hsDsNhansuColumnSelected = this.columnsSelected;
    // save to store
    this.store.dispatch({
      type: APP_ACTION.USER_INFO,
      payload: {
        ...this.user,
      },
    });

    this._matDialogRef.close(this.columnsSelected);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
