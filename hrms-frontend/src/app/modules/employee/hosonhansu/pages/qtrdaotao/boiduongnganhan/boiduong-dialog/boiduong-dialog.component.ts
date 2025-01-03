import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageBox } from '../../../../../../../fuse/components/message-box/message-box.provider';
import { NhansuComponent } from '../../../../../../components/nhansu/nhansu.component';
import { ValidateQD } from '../../../../../../components/qdnoidung/validateQD';
import { KetquadaotaocanhanUI } from '../../../../model/ketQuaDaotaoCanhanUI';
import { CommonApiService } from '../../../../../../../services/commonHttp';
import { DanhMucURL } from '../../../../../../../services/employe/danhmucURL';
import { DaotaoCanhanURL } from '../../../../../../../services/employe/daotaocanhanURL';
import { FormdanhmucchungComponent } from '../../../../../../../../assets/lib/formdanhmucchung/src/public-api';
import { FormquyetdinhComponent } from '../../../../../../../../assets/lib/formquyetdinh/src/public-api';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { Subject, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-boiduong-dialog',
  templateUrl: './boiduong-dialog.component.html',
  styleUrls: ['./boiduong-dialog.component.scss'],
  imports:[
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatOptionModule,
    MatDatepickerModule,
    FileUploadModule,
    MatSelectModule,
    MatInputModule

  ]
})
export class BoiduongDialogComponent {

  boiDuongSelected: KetquadaotaocanhanUI = {};

  truongDtList: any[] = [];
  ngoaiNguList: any[] = [];
  trinhdoNNList: any[] = [];
  truongDtSelected: any = {};
  trinhDoList: any[] = [];
  hocviList: any[] = [];
  nganhDtList: any[] = [];
  nganhDtSelected: any = {};
  nhomNganhTduongList: any[] = [];
  xepLoaiList: any[] = [];

  hthucDtaoList: any[] = [];
  quocGiaList: any[] = [];
  dmDaotaoList: any[] = [];
  dmDaotaoSelected: any = {};

  listBangCap: any[] = [];
  
  chucVuList: any[] = [];  
  listNgKy: any[] = [];
  listQdDv: any[] = [];

  vanbangFile = {
    fileAttach: {},
    fileName: '',
    fileExtend: '',
    fileSize: ''
  };


  quyetdinh = {
    qdinhId: null,
    soQd: '',
    ngayKy: null,
    nguoiky: '',
    chucvuKy: '',
    noiDung: '',
    namqd: '',
    fileAttach: {},
    fileName: '',
    fileExtend: '',
    fileSize: ''
  }

  insertFileVB: any[];
  uploadedFilesVB: any[] = [];

  insertFileQD: any[];
  uploadedFilesQD: any[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _fileForm: any;
  fileContent: any;
  messageService: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<BoiduongDialogComponent>,
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private formBuilder: FormBuilder,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {    
    this.onLoadData();

    // neu la update, hiển thị thông tin đào tạo được chọn
    if (this.data.boiDuongSelected && this.data.boiDuongSelected.kequaDtId) {      
      this.http
      .get(DaotaoCanhanURL.getDaotaoBoiduongChitiet(this.data.boiDuongSelected.kequaDtId, true))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
          if (res.state) {                                              
              this.boiDuongSelected = res.data;
              if (this.boiDuongSelected.fileAttach) {
                this.vanbangFile.fileAttach = this.boiDuongSelected.fileAttach;
                this.vanbangFile.fileName = this.boiDuongSelected.fileNameVB_CC;                
                this.vanbangFile.fileExtend = this.boiDuongSelected.fileExtendVB_CC;
              }
              
          }
      });
    }

    // hiển thị quyết định liên quan    
    if (this.data.boiDuongSelected && this.data.boiDuongSelected.nsQdnoidungId) {
      this.quyetdinh = this.data.boiDuongSelected.nsQdndung;      
      //  get file quyet dinh
      if(this.quyetdinh && this.quyetdinh.qdinhId)
      this.http
      .get(DanhMucURL.getFileQuyetDinh(this.quyetdinh.qdinhId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
          if (res.state) {
              var file = res.data
              if(file){
                  this.quyetdinh.fileAttach = file;
                  this.quyetdinh.fileName = file.fileName;
                  //this.quyetdinh.fileExtend = file.fileExtend;
              }                        
          }    
      })
    }


  }

  onLoadData(): void {
    this.http
      .get(DanhMucURL.getListTruongdt())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.truongDtList = res.data;
    });

    this.http
      .get(DanhMucURL.getListNgoaingu())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.ngoaiNguList = res.data;
    });

    this.http
      .get(DanhMucURL.getListCCNNgu())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.trinhdoNNList = res.data;
    });

    

    this.http
      .get(DanhMucURL.getListTrinhdo())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.trinhDoList = res.data;
      });

    this.http
      .get(DanhMucURL.getListHocvi())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.hocviList = res.data;
      });

    this.http
    .get(DanhMucURL.getListNganhnghe())
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res: any) => {
      if (!res || !res.state) return;
      this.nganhDtList = res.data;
    });

    this.http
    .get(DanhMucURL.getListXeploai())
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res: any) => {
      if (!res || !res.state) return;
      this.xepLoaiList = res.data;
    });

    this.http
    .get(DanhMucURL.getAllLNhomnganhTduong())
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res: any) => {
      if (!res || !res.state) return;
      this.nhomNganhTduongList = res.data;
    });
    
    this.http
    .get(DanhMucURL.getListHthucdtao())
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res: any) => {
      if (!res || !res.state) return;
      this.hthucDtaoList = res.data;
    });

    this.http
    .get(DanhMucURL.getListQuocgia())
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res: any) => {
      if (!res || !res.state) return;
      this.quocGiaList = res.data;
    });

    this.http
    .get(DanhMucURL.getAllLDanhmucdt())
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res: any) => {
      if (!res || !res.state) return;
      this.dmDaotaoList = res.data;
    });

  }

  onTruongDT(): void {   
    let dataDanhmuc = {
      data: this.truongDtList,
      title: 'Trường đào tạo',
      //selectionMode: 'multiple',
      selectionMode: 'single',
      idField: 'id',
      width: '1000px',
      columns: [
          {
              header: 'Tên trường',
              field: 'name',
              styles: { 'width': '60%'},
          }, 
          {
              header: 'Mã trường',
              field: 'id',
              styles: {'width': '40%'},
          }
      ]
    }

    const dialogRef = this._matDialog.open(FormdanhmucchungComponent, {
      disableClose: true,
      data: dataDanhmuc,
    });

    dialogRef.afterClosed()
      .subscribe((result) => {        
        this.boiDuongSelected.truongDtId = result.id;
        this.boiDuongSelected.tentruongDt = result.name;
        //console.log(this.truongDtSelected.id + ', ' + this.truongDtSelected.name);        
      });
  }

  onThuocDmDaotao(): void {
    debugger
    let dataDanhmuc = {
      data: this.dmDaotaoList,
      title: 'Danh mục đào tạo',
      //selectionMode: 'multiple',
      selectionMode: 'single',
      idField: 'id',
      width: '1000px',
      columns: [
          {
              header: 'Tên danh mục',
              field: 'name',
              styles: { 'width': '60%'},
          }, 
          {
              header: 'Mã danh mục',
              field: 'id',
              styles: {'width': '40%'},
          }
      ]
    }

    const dialogRef = this._matDialog.open(FormdanhmucchungComponent, {
      disableClose: true,
      data: dataDanhmuc,
    });

    dialogRef.afterClosed()
      .subscribe((result) => {        
        this.dmDaotaoSelected.id = result.id;
        this.dmDaotaoSelected.name = result.name;
      });

  }

  onChonQuyetDinh(): void {
    const dialogRef = this._matDialog.open(FormquyetdinhComponent, {
        disableClose: true,
        data: this.listQdDv
    });

    dialogRef.afterClosed().subscribe((result) => {
        if (result) {
            this.quyetdinh = result;
        }

        });   
  }

  openSoQDbyTxt(event: any): void {
    this.http
        .post(DanhMucURL.postNsQdndungBySoQd(), { soQd: event.target.value, donviId: this.data.nhansu.donviId })
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
            if (res.state) {
                this.quyetdinh = res.data;
            }
        });
  
  }


  onDeleteNgKy(): void {
    this.quyetdinh.nguoiky = null;
  }

  onChonNgKy(): void {
    const dialogRef = this._matDialog.open(NhansuComponent, {
        disableClose: true,
        data: this.listNgKy
    }); 
    dialogRef.afterClosed().subscribe((result) => {
        this.quyetdinh.nguoiky = result.tenkhaisinh
    });    
  }

  // File Van bang
  async myUploaderVB(event, fileForm) {
    this.uploadedFilesVB.push(event);
    this._fileForm = fileForm;
    const files = this.uploadedFilesVB[this.uploadedFilesVB.length - 1].currentFiles;
    if (this.insertFileVB == null)
        this.insertFileVB = []
    files.forEach(async (file) => {
        await this.blobToBase64(file)
            .then((base64data) => {
                this.fileContent = base64data;
            });
        this.insertFileVB.push(
            {
                fileName: file.name,
                mimeType: file.type,
                fileSize: file.size,
                fileContent: this.fileContent,
            }
        )
    })
  }

  // File quyet dinh
  async myUploaderQD(event, fileForm) {
    this.uploadedFilesQD.push(event);
    this._fileForm = fileForm;
    const files = this.uploadedFilesQD[this.uploadedFilesQD.length - 1].currentFiles;
    if (this.insertFileQD == null)
        this.insertFileQD = []
    files.forEach(async (file) => {
        await this.blobToBase64(file)
            .then((base64data) => {
                this.fileContent = base64data;
            });
        this.insertFileQD.push(
            {
                fileName: file.name,
                mimeType: file.type,
                fileSize: file.size,
                fileContent: this.fileContent,
            }
        )
    })
  }

  blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
  }

  removeFileVB(item: any, uploader: FileUpload, event: Event) {    
    const index = uploader.files.indexOf(item);
    this.insertFileVB = this.insertFileVB.filter((element) => { return element.fileName != item.name });
    uploader.remove(event, index);
    this.insertFileVB.push(event);    
  }

  removeFileQD(item: any, uploader: FileUpload, event: Event) {    
    const index = uploader.files.indexOf(item);
    this.insertFileQD = this.insertFileQD.filter((element) => { return element.fileName != item.name });
    uploader.remove(event, index);
    this.insertFileQD.push(event);    
  }

  

  
  async saveAndClose(): Promise<void> {
    this.boiDuongSelected.nsId = this.data.nhansu.nsID;
    this.boiDuongSelected.donviId = this.data.nhansu.donviId;        
    this.boiDuongSelected.dtDanhmucDtId = this.dmDaotaoSelected.id;
    this.boiDuongSelected.isdaihan = false;
    // file van bang
    if (this.insertFileVB && this.insertFileVB.length > 0) {      
      let arrStr = this.insertFileVB[0].fileName.split('.');
      let extend = arrStr[arrStr-1];        
      this.boiDuongSelected.fileAttach = this.insertFileVB[0];
      this.boiDuongSelected.fileNameVB_CC = this.insertFileVB[0].fileName;
      this.boiDuongSelected.fileExtendVB_CC = extend
    }
    this.data.daotaoSelected = this.boiDuongSelected;

    // file quyet dinh
    const qdnoidung = await ValidateQD.getStatusOfNsQdndung(this.http, this.mb, this.quyetdinh, this.messageService,this.insertFileQD);
    this.data.daotaoSelected.nsQdndung = qdnoidung;

    try {
      if (this.insertFileQD && this.insertFileQD.length > 0) {
        let arrStr = this.insertFileQD[0].fileName.split('.');
        let extend = arrStr[arrStr-1];        
        this.data.daotaoSelected.nsQdndung.fileAttach = this.insertFileQD[0];
        this.data.daotaoSelected.nsQdndung.fileName = this.insertFileQD[0].fileName;
        this.data.daotaoSelected.nsQdndung.fileExtend = extend
      }
  
      this.matDialogRef.close(this.data);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Đã xảy ra lỗi: ", error);
    }
    
    if (this.data.addNew) {       
      this.http
            .post(DaotaoCanhanURL.insertDaotao_Boiduong(), this.data.daotaoSelected)
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
    } else {
      this.http
            .post(DaotaoCanhanURL.updateDaotao_Boiduong(), this.data.daotaoSelected)
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
  } 

  close(): void {  
    this.matDialogRef.close();  
  }

}
