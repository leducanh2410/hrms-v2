import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { EmployeURL } from '../../../../../../services/employe/employeURL';
import { MessageService } from '../../../../../../shared/message.services';
import { Buttons } from '../../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { llnsURL } from '../../../../../../services/employe/llnsURL';
import { DanhMucURL } from '../../../../../../services/employe/danhmucURL';
import { forEach } from 'lodash';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-hosoform',
  templateUrl: './hosoform.component.html',
  imports: [
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatOptionModule,
    MatDatepickerModule,
    FileUploadModule,
    MatSelectModule,
    DividerModule,
    TableModule,
    DropdownModule,
    CheckboxModule,
    MatInputModule
  ],
})
export class HosoformComponent implements OnInit {
  listHsGiayto: any[] = [];
  listKieuGiayto: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageService,
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private mb: MessageBox
  ) {}

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.http
      .get(DanhMucURL.getAllLHsnsGiayto())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.listHsGiayto = res.data;
          if (this.data.listNsGiayto && this.listHsGiayto) {
            for (
              let index = 0;
              index < this.data.listNsGiayto.length;
              index++
            ) {
              const nsGiayto = this.data.listNsGiayto[index];
              for (let index = 0; index < this.listHsGiayto.length; index++) {
                const HsGiayto = this.listHsGiayto[index];
                if (nsGiayto.loaiGiayto.id == HsGiayto.id) {
                  HsGiayto.selected = true;
                  HsGiayto.fileName = nsGiayto.fileName;
                  HsGiayto.NsGiaytoHsnsId = nsGiayto.id;
                  HsGiayto.kieu = nsGiayto.kieu;
                  HsGiayto.ghichu = nsGiayto.ghichu;
                  HsGiayto.loaiGiayto = nsGiayto.loaiGiayto;
                }
              }
            }
            console.log(this.listHsGiayto);
          }
        }
      });
    this.http
      .get(DanhMucURL.getAllKieugiayto())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.listKieuGiayto = res.data;
        }
      });
  }

  save() {
    var listSave = [];
    for (let index = 0; index < this.listHsGiayto.length; index++) {
      const element = this.listHsGiayto[index];
      if (element.selected) {
        var obj = {
          id: element.NsGiaytoHsnsId,
          nsId: this.data.nhansu.nsID,
          donviId: this.data.nhansu.donviId,
          name: element.name,
          chitiet: null,
          ghichu: element.ghichu,
          kieu: element.kieu,
          fileName: element.fileName,
          fileExtend: element.fileExtend,
          loaiGiayto: element,
          fileAttach: element.fileAttach,
        };
        listSave.push(obj);
      }
    }
    this.http
      .post(llnsURL.saveNsGiayto(this.data.nhansu.nsID), listSave)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          this.messageService.showErrorMessage(
            'Hệ thống',
            'Cập nhật thông tin không thành công'
          );
          return;
        }
        this.messageService.showSuccessMessage(
          'Hệ thống',
          'Cập nhật thành công'
        );
      });
  }

  async onUpload(event, item) {
    const file = event.currentFiles[0];
    let insertFile = [];
    let fileContent: any;
    await this.blobToBase64(file).then((base64data) => {
      fileContent = base64data;
    });
    insertFile.push({
      fileName: file.name,
      mimeType: file.type,
      fileSize: file.size,
      fileContent: fileContent,
    });

    let arrStr = file.name.split('.');
    let extend = arrStr[arrStr - 1];
    item.fileAttach = insertFile[0];
    item.fileName = file.name;
    item.fileExtend = extend;
    //this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
}
