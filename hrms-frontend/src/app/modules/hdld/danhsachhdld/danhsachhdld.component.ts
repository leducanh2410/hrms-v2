import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Inject,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MessageBox } from '../../../fuse/components/message-box/message-box.provider';
import { Store } from '@ngrx/store';
import { APP_ACTION } from '../../../ngxstore/actions/app.actions';
import { AppState } from '../../../ngxstore/state/app.state';
import { CommonApiService } from '../../../services/commonHttp';
import { hdldURL } from '../../../services/employe/hdldURL';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { NsdenhanDialogComponent } from './nsdenhan-dialog/nsdenhan-dialog.component';
import { NsDanhsachHdld } from '../model/NsDanhsachHdld';
import { ParamNsHdldBean } from '../model/NsHdldParam';
import { TaoHdldDialogComponent } from './taohdld-dialog/taohdld-dialog.component';
import { MatSelectChange } from '@angular/material/select';
import { DanhMucURL } from '../../../services/employe/danhmucURL';
import { ThamsoluongformComponent } from '../../employee/hosonhansu/pages/qtrluong/luongdialog/thamsoluongform/thamsoluongform.component';
import { QtrinhLuongBean } from '../../employee/hosonhansu/model/qtrinhluongbean';
import { HesophucapDialogComponent } from './hesophucap-dialog/hesophucap-dialog.component';
import { Buttons } from '../../../fuse/components/message-box/common';
import { MessageService } from '../../../shared/message.services';
import FileSaver, { saveAs } from 'file-saver';
import { AppUltil } from '../../../shared/AppUltil';
import { FileviewComponent } from '../../components/fileview/fileview.component';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-danhsachhdld',
  templateUrl: './danhsachhdld.component.html',
  styleUrls: ['./danhsachhdld.component.scss'],
  imports: [
    DropdownModule,
    AutoCompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule,
    TableModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    TooltipModule,
    CheckboxModule,
    MatDialogModule,
    ListEmployeeComponent,
    MatDrawerContainer,
    MatDrawerContent,
    MatDrawer,
    MatTabsModule,
    MatIconModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    InputTextareaModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DanhsachhdldComponent {
  @ViewChild('fileInput', { static: false })
  fileInput: ElementRef<HTMLInputElement>;
  fileInputs: { [key: string]: ElementRef<HTMLInputElement> } = {};

  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;

  selectedTabIndex: number = 0; // Tab mặc định là 0 (Hợp đồng)

  insuranceForm: FormGroup;

  titleForm: String;
  placeHolderTenDanhsach: String;
  currentEntity: any = {};

  user_info: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  years: number[] = [];
  selectedYear: number;

  dsList: any[] = [];
  dsSelected: any = {};
  filteredDs: any[] = [];

  loaiHdldList: any[] = [];
  loaiHdldSelected: any = {};

  nsHopdongList: any[] = [
    {
      index: 1,
      contractType: 'Hợp đồng chính thức',
      contractSignDate: new Date('2023-01-01'),
      startDate: new Date('2023-01-01'),
      endDate: new Date('2024-01-01'),
      terminationDate: null,
      contractNumber: 'HD001',
      creationDate: new Date('2023-01-01'),
      updateDate: new Date('2023-01-15'),
    },
    {
      index: 2,
      contractType: 'Hợp đồng thử việc',
      contractSignDate: new Date('2023-02-01'),
      startDate: new Date('2023-02-01'),
      endDate: new Date('2023-04-01'),
      terminationDate: null,
      contractNumber: 'HD002',
      creationDate: new Date('2023-02-01'),
      updateDate: new Date('2023-02-10'),
    },
    {
      index: 3,
      contractType: 'Hợp đồng hợp tác',
      contractSignDate: new Date('2023-03-01'),
      startDate: new Date('2023-03-01'),
      endDate: new Date('2024-03-01'),
      terminationDate: new Date('2023-12-31'),
      contractNumber: 'HD003',
      creationDate: new Date('2023-03-01'),
      updateDate: new Date('2023-03-05'),
    },
  ];
  nsInfo: any;
  donviId: any;

  copyLoaiHdCu: Boolean;
  ngayHdld: Date;

  isNew: Boolean; // false: sua danh sach: true: tao moi danh sach
  isUpdating: Boolean = false; // true: đang sửa (trong trường hợp isNew = false)
  dataLuong: QtrinhLuongBean = {};
  isVisibleLapDS: Boolean = false;
  isXoaDanhsachDisable = true;
  isDropdownEnabled: Boolean = true; // true: nhập tên ds mới; false: Chỉ chọn từ ds
  disabledInput = false;

  lblCapnhatDs = '';
  selectedNsId: number;
  highlightedRow: number = -1; // Khởi tạo giá trị mặc định
  // Khai báo ViewChildren để truy cập các dòng trong bảng
  @ViewChildren('tableRow') tableRows: QueryList<ElementRef>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // dkTimkiemId, disableUpdate
    public matDialogRef: MatDialogRef<DanhsachhdldComponent>,

    private messageService: MessageService,
    //@Inject(MAT_DIALOG_DATA) public data: QtrinhLuongBean,
    private http: CommonApiService,
    private mb: MessageBox,
    private _matDialog: MatDialog,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    const appUser = this.store.select((state) => state.appUser);
    appUser.subscribe((res: any) => {
      const data = res;
      if (data && data.type === APP_ACTION.USER_INFO) {
        this.user_info = { ...data.payload };
        this.donviId = this.user_info.iddonvi;
      }
    });

    this.insuranceForm = this.fb.group({
      insuranceNumber: [''],
      insuranceCode: [''],
      insuranceName: [''],
      insuranceStartDate: [''],
      insuranceEndDate: [''],
      insuranceNote: [''],
      isActive: [false],
      isInInsurance: [false],
    });
  }

  handleButtonClick(action: string): void {
    console.log(`Action performed: ${action}`);
  }

  onTabChange(index: number): void {
    this.selectedTabIndex = index;
  }

  ngOnInit(): void {
    this.isNew = false;
    this.isDropdownEnabled = true;
    this.isUpdating = false;
    this.lblCapnhatDs = 'Cập nhật danh sách';
    const currentYear = new Date().getFullYear();
    // Khởi tạo giá trị cho mảng years từ năm hiện tại + 1 đến năm hiện tại - 10
    for (let year = currentYear + 1; year >= currentYear - 10; year--) {
      this.years.push(year);
    }
    this.selectedYear = currentYear;

    // this.http
    //   .get(DanhMucURL.getAllTTrangHopdong())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res) => {
    //     if (res.state) {
    //       this.loaiHdldList = res.data;
    //     }
    //   });

    // this.onChonNam();

    if (this.data.dkTimkiemId != null) {
      this.disabledInput = true;
      this.placeHolderTenDanhsach = '';
      this.titleForm = 'Cập nhật danh sách hợp đồng lao động';
      // this.http
      //   .get(hdldURL.getNsDsachHDLDByTkiemid(this.data.dkTimkiemId.dsTimkiemId))
      //   .pipe(takeUntil(this._unsubscribeAll))
      //   .subscribe((res) => {
      //     if (res.state) {
      //       this.nsHopdongList = res.data;
      //       this.lblCapnhatDs = 'Cập nhật danh sách';
      //       this.isNew = false;
      //       this.isUpdating = false;
      //       this.isXoaDanhsachDisable = false;
      //       this.isDropdownEnabled = true;

      //       for (let i = 0; i < this.dsList.length; i++) {
      //         let ds = this.dsList[i];
      //         if (ds.id == this.data.dkTimkiemId.dsTimkiemId) {
      //           this.dsSelected = ds;
      //         }
      //       }

      //       this.focusOnRowWithPropertyValue(this.data.dkTimkiemId.nsId);
      //     }
      //   });
    } else {
      this.titleForm = 'Lập danh sách hợp đồng lao động';
      this.placeHolderTenDanhsach = 'Nhập tên danh sách';
      // this.onLapDanhsach();
    }
  }

  focusOnRowWithPropertyValue(nsId: number) {
    const row = this.nsHopdongList.find((ns) => ns.nsId === nsId);
    if (row) {
      const rowIndex = this.nsHopdongList.indexOf(row);
      this.focusOnRow(nsId);
    } else {
      console.log(`Không tìm thấy dòng với thuộc tính ns.nsId = ${nsId}`);
    }
  }

  focusOnRow(nsId: number) {
    this.selectedNsId = nsId;
  }

  selectOption(text) {}

  search(event) {
    let filtered: any[] = [];
    let query = event.query;
    console.log(query);

    if (query && query != '') {
      this.dsSelected = {
        id: null,
        name: query,
      };
    }

    for (let i = 0; i < this.dsList.length; i++) {
      let ds = this.dsList[i];
      if (ds.name.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(ds);
      }
    }

    this.filteredDs = filtered;
    console.log(this.filteredDs);
  }

  handleSelection(event) {
    // Xử lý khi người dùng chọn từ danh sách
    if (event) {
      console.log('1');
      this.dsSelected = event;
      this.onChonDanhsach();
    } else {
      // Xử lý khi người dùng nhập text
      this.dsSelected = {
        id: null,
        name: event.query,
      };
    }
  }

  onChangeCopyHdldCu(event: any) {
    // Lấy giá trị mới của checkbox
    this.copyLoaiHdCu = event.checked;

    if (this.copyLoaiHdCu) {
      let dialog = this.mb.showDefault(
        'Bạn muốn Copy Loại HĐLĐ cũ sang Loại HĐLĐ mới cho nhân sự hiển thị trên danh sách?',
        Buttons.YesNo
      );

      dialog.dialogResult$.subscribe(async (result) => {
        if (result) {
          let param: ParamNsHdldBean = new ParamNsHdldBean();
          param.nsDanhsachHdldList = this.nsHopdongList;
          this.http
            .post(hdldURL.copyLoaiHdldCu(), param)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (res.state) {
                this.nsHopdongList = res.data;
                console.log(this.nsHopdongList);
              }
            });
        }
      });
    }
  }

  onEnterCopyNgayHD() {
    for (let i = 0; i < this.nsHopdongList.length; i++) {
      const nsDanhsachHdld = this.nsHopdongList[i];
      nsDanhsachHdld.ngayHieuluc = this.ngayHdld;
    }
  }

  getTooltipValue(ttrangId): string {
    const selectedItem = this.loaiHdldList.find((item) => item.id === ttrangId);
    return selectedItem ? selectedItem.name : '';
  }

  onChonNam() {
    this.http
      .get(
        hdldURL.getDanhSachNghiepVuByOrg(this.donviId, 11, this.selectedYear)
      )
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res) => {
        if (res.state) {
          //console.log(res.data);
          this.dsList = res.data;
        }
      });
  }

  onChonDanhsach() {
    if (
      this.isNew &&
      this.nsHopdongList != null &&
      this.nsHopdongList.length > 0
    ) {
      let dialog = this.mb.showDefault(
        'Bạn đang lập mới danh sách, danh sách bên dưới chưa được lưu. Bạn có muốn tiếp tục xem danh sách khác?',
        Buttons.YesNo
      );
      dialog.dialogResult$.subscribe(async (result) => {
        if (result) {
          this.http
            .get(hdldURL.getNsDsachHDLDByTkiemid(this.dsSelected.id))
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
              if (res.state) {
                this.nsHopdongList = res.data;
                this.lblCapnhatDs = 'Cập nhật danh sách';
                this.isNew = false;
                this.isUpdating = false;
                this.isXoaDanhsachDisable = false;
                this.isDropdownEnabled = true;
              }
            });
        } else {
          this.dsSelected = null;
        }
      });
    } else if (!this.isNew && this.isUpdating) {
      // nếu đang ở trạng thái mở form sửa danh sách và đang thực hiện sửa 1 danh sách
      let dialog = this.mb.showDefault(
        'Danh sách bên dưới chưa được lưu. Bạn có muốn tiếp tục xem danh sách khác?',
        Buttons.YesNo
      );

      dialog.dialogResult$.subscribe(async (result) => {
        if (result) {
          //this.lblCapnhatDs = "Cập nhật danh sách";
          //this.isUpdating = false;
          //this.isXoaDanhsachDisable = false;

          this.http
            .get(hdldURL.getNsDsachHDLDByTkiemid(this.dsSelected.id))
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
              if (res.state) {
                this.nsHopdongList = res.data;
                this.lblCapnhatDs = 'Cập nhật danh sách';
                this.isNew = false;
                this.isUpdating = false;
                this.isXoaDanhsachDisable = false;
                this.isDropdownEnabled = true;
              }
            });
        }
      });
    } else {
      this.http
        .get(hdldURL.getNsDsachHDLDByTkiemid(this.dsSelected.id))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res) => {
          if (res.state) {
            this.nsHopdongList = res.data;
            this.lblCapnhatDs = 'Cập nhật danh sách';
            this.isNew = false;
            this.isUpdating = false;
            this.isXoaDanhsachDisable = false;
            this.isDropdownEnabled = true;
          }
        });
    }
  }

  onLapDanhsach() {
    // kiem tra xem ds hien tai có đang tạo không?
    if (
      !this.nsHopdongList ||
      this.nsHopdongList.length === 0 ||
      (this.nsHopdongList && this.nsHopdongList.length > 0 && !this.isUpdating)
    ) {
      this.isNew = true;
      this.isUpdating = false;
      this.selectedYear = new Date().getFullYear();
      this.dsSelected = null;
      this.nsHopdongList = [];
      this.isVisibleLapDS = true;
      this.lblCapnhatDs = 'Lưu danh sách';
      this.isXoaDanhsachDisable = true;
      this.isDropdownEnabled = false;
      this.disabledInput = false;
    } else if (this.isUpdating) {
      let dialog = this.mb.showDefault(
        'Danh sách bên dưới chưa được lưu. Bạn có muốn tiếp tục Lập danh sách mới?',
        Buttons.YesNo
      );

      dialog.dialogResult$.subscribe(async (result) => {
        if (result) {
          this.isNew = true;
          this.isUpdating = false;
          this.selectedYear = new Date().getFullYear();
          this.dsSelected = null;
          this.nsHopdongList = [];
          this.isVisibleLapDS = true;
          this.lblCapnhatDs = 'Lưu danh sách';
          this.isXoaDanhsachDisable = true;
          this.isDropdownEnabled = false;
          this.disabledInput = false;
        }
      });
    }
  }

  onLuuDanhsach() {
    // nếu đang ở trạng thái mở form để sửa và đang xem danh sách
    if (!this.isNew && !this.isUpdating) {
      this.lblCapnhatDs = 'Lưu danh sách';
      this.isUpdating = true;
      this.disabledInput = false;
      return;
    }

    //console.log(this.dsSelected);
    if (
      this.isNew &&
      (this.dsSelected == null || this.dsSelected.name == null)
    ) {
      this.messageService.showErrorMessage(
        'Thông báo: ',
        'Bạn chưa nhập tên danh sách!'
      );
      return;
    }

    // kiem tra ten danh sach co trung khong?
    if (this.isNew && this.dsSelected.name != null) {
      this.http
        .get(
          hdldURL.checkTenDanhsachHdld(
            this.donviId,
            this.selectedYear,
            this.dsSelected.name
          )
        )
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res.state) {
            let checkTenDs = res.data;
            if (checkTenDs) {
              this.messageService.showErrorMessage(
                'Thông báo: ',
                'Tên danh sách đã tồn tại!'
              );
              return;
            }
          }
        });
    }

    if (this.validateInfoWhenLuuDs(this.nsHopdongList)) {
      let param: ParamNsHdldBean = new ParamNsHdldBean();
      param.nsDanhsachHdldList = this.nsHopdongList;

      if (this.isNew) {
        // nếu là thêm mới danh sách
        param.tenDanhsach = this.dsSelected.name;
        this.http
          .post(hdldURL.insertDsNsHDLD(), param)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (res.state) {
              this.dsSelected = res.data;
              if (this.dsSelected != null && this.dsSelected.id != null) {
                this.http
                  .get(hdldURL.getNsDsachHDLDByTkiemid(this.dsSelected.id))
                  .pipe(takeUntil(this._unsubscribeAll))
                  .subscribe((res) => {
                    if (res.state) {
                      this.nsHopdongList = res.data;
                    }
                  });
              }

              this.messageService.showInfoMessage(
                'Thông báo: ',
                `Cập nhật thành công`
              );
            }

            this.resetAfterSave();
          });
      } else if (!this.isNew && this.isUpdating) {
        // nếu là sửa danh sách và đã thay đổi dữ liệu trên lưới rồi
        param.nsTimkiemDstk = this.dsSelected;
        this.http
          .post(hdldURL.updateDsNsHDLD(), param)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (res.state) {
              this.nsHopdongList = null;
              this.messageService.showInfoMessage(
                'Thông báo: ',
                `Cập nhật thành công`
              );
            }

            this.resetAfterSave();

            // load lai danh sach
            if (this.data.dkTimkiemId != null) {
              this.disabledInput = true;
              this.placeHolderTenDanhsach = '';
              this.titleForm = 'Cập nhật danh sách hợp đồng lao động';

              for (let i = 0; i < this.dsList.length; i++) {
                let ds = this.dsList[i];
                console.log(ds);
                if (ds.id == this.dsSelected.id) {
                  this.dsSelected = ds;
                }
              }

              if (this.dsSelected != null && this.dsSelected.id != null) {
                this.http
                  .get(hdldURL.getNsDsachHDLDByTkiemid(this.dsSelected.id))
                  .pipe(takeUntil(this._unsubscribeAll))
                  .subscribe((res) => {
                    if (res.state) {
                      debugger;
                      this.nsHopdongList = res.data;
                      this.lblCapnhatDs = 'Cập nhật danh sách';
                      this.isNew = false;
                      this.isUpdating = false;
                      this.isXoaDanhsachDisable = false;
                      this.isDropdownEnabled = true;

                      if (
                        this.dsSelected.id == this.data.dkTimkiemId.dsTimkiemId
                      ) {
                        this.focusOnRowWithPropertyValue(
                          this.data.dkTimkiemId.nsId
                        );
                      }
                    }
                  });
              }
            }
          });
      }
    }
  }

  //async onFileChange(event: any, ns: NsDanhsachHdld): Promise<void> {
  async onFileChange(event: any) {
    //const file = event.target.files[0];
    const fileInput = event.target;
    const file =
      fileInput.files && fileInput.files.length > 0 ? fileInput.files[0] : null;

    let insertFile: any[] = [];

    if (file && this.currentEntity) {
      await this.blobToBase64(file).then((base64data) => {
        insertFile.push({
          fileName: file.name,
          mimeType: file.type,
          fileSize: file.size,
          fileContent: base64data,
        });

        //this.currentEntity.fileAttach = insertFile[0];

        for (const obj of this.nsHopdongList) {
          if (obj.nsId == this.currentEntity.nsId) {
            obj.fileAttach = insertFile[0];
            obj.fileName = insertFile[0].fileName;
            this.messageService.showInfoMessage(
              'Thông báo: ',
              'Đã tải file cho nhân sự: ' + obj.tenkhaisinh
            );
          }
        }

        //fileInput.value = null;
      });
    }
  }

  triggerFileInput($event, ns, i): void {
    // Kích hoạt input file ẩn
    //console.log('ns selected:', ns);
    //this.fileInput.nativeElement.click();
    this.currentEntity = ns;
    const fileInput = this.fileInputs[i] || this.fileInput.nativeElement;
    if (fileInput instanceof HTMLInputElement) {
      fileInput.click();
    }
  }

  blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  onXoaDanhsach() {
    let dachuyenKy: Boolean;

    if (this.nsHopdongList && this.nsHopdongList.length > 0) {
      for (let i = 0; i < this.nsHopdongList.length; i++) {
        console.log(this.nsHopdongList[i].trangthaiky);
        if (
          this.nsHopdongList[i].trangthaiky == 'KETTHUC' ||
          this.nsHopdongList[i].trangthaiky == 'CHODUYET' ||
          this.nsHopdongList[i].trangthaiky == 'DABANHANHQD'
        ) {
          dachuyenKy = true;
          break;
        }
      }
    }

    if (dachuyenKy) {
      this.messageService.showWarningMessage(
        'Hệ thống',
        'HĐLĐ đã chuyển ký số trên SmartEVN. Bạn không được xóa danh sách HĐLĐ!'
      );
      return;
    } else {
      this.http
        .get(hdldURL.xoaDsHdld(this.dsSelected.id))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res.state) {
            let isDelete = res.data;
            if (isDelete) {
              this.messageService.showSuccessMessage(
                'Thông báo: ',
                'Đã xóa danh sách HĐLĐ'
              );

              // set trang thai ve xem HDLD
              this.isNew = false;
              this.isUpdating = false;
              this.nsHopdongList = [];
              this.dsList = [];
              this.dsSelected = {};

              this.onChonNam();
            }
          }
        });
    }
  }

  viewFileDuthao(ns) {
    this.http
      .get(hdldURL.getFileDuthao(ns.id))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }

        var fileDuthao = res.data;
        if (fileDuthao) {
          const dialogRef = this._matDialog.open(FileviewComponent, {
            width: '1000px',
            disableClose: true,
            data: {
              fileId: fileDuthao.fileId,
              fileContent: fileDuthao.fileContent,
              fileExten: fileDuthao.fileExten,
              fileName: fileDuthao.fileName,
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
            }
          });
        } else {
          this.messageService.showWarningMessage(
            'Hệ thống',
            'Không có File đính kèm!'
          );
          return;
        }
      });
    return;
  }

  downFileDuthao(ns) {
    this.http
      .get(hdldURL.getFileDuthao(ns.id))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }
        var fileDuthao = res.data;
        if (fileDuthao) {
          const blob = AppUltil.base64ToBlob(fileDuthao.fileContent);
          FileSaver.saveAs(blob, fileDuthao.fileName);
        } else {
          this.messageService.showWarningMessage(
            'Hệ thống',
            'Không có File đính kèm!'
          );
        }
      });
    return;
  }

  resetAfterSave() {
    // sau khi lưu thành công, thiết lập trạng thái chờ
    this.isNew = null;
    this.disabledInput = true;
    this.isUpdating = false;
    this.selectedYear = new Date().getFullYear();
    //this.dsSelected = null;
    this.nsHopdongList = [];
    this.isVisibleLapDS = true;
    this.lblCapnhatDs = 'Cập nhật danh sách';
    this.isXoaDanhsachDisable = true;
    this.isDropdownEnabled = false;
  }

  validateInfoWhenLuuDs(nsDanhsachHdldList: NsDanhsachHdld[]): boolean {
    if (!nsDanhsachHdldList || nsDanhsachHdldList.length === 0) {
      this.messageService.showErrorMessage(
        'Thông báo: ',
        'Xin mời chọn nhân sự vào danh sách!'
      );
      return false;
    }

    for (const temp of nsDanhsachHdldList) {
      if (!temp.ttrangId || !temp.ngayHieuluc) {
        this.messageService.showErrorMessage(
          'Thông báo: ',
          'Xin mời nhập đầy đủ thông tin loại HĐLĐ/Ngày HĐLĐ cho các nhân sự trong danh sách!'
        );
        return false;
      }
    }

    for (let i = 0; i < nsDanhsachHdldList.length; i++) {
      const nsDanhsachHdld = nsDanhsachHdldList[i];
      if (
        nsDanhsachHdld.luongId !== null &&
        nsDanhsachHdld.luongkhoan !== null
      ) {
        this.messageService.showErrorMessage(
          'Thông báo: ',
          'Tồn tại nhân sự trong danh sách hưởng cả 2 loại lương khoán và lương theo hệ số. Xin mời kiểm tra lại!'
        );
        return false;
      }
    }

    return true;
  }

  onTaoduthao(ns) {
    this.http
      .post(hdldURL.taoDuthao(), ns)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.http
            .get(hdldURL.getNsDsachHDLDByTkiemid(this.dsSelected.id))
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
              if (res.state) {
                this.nsHopdongList = res.data;
              }
            });
        }
      });
  }

  onChuyenky(ns) {
    console.log('here');
    this.http
      .post(hdldURL.chuyenKyHdld(), ns)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.http
            .get(hdldURL.getNsDsachHDLDByTkiemid(this.dsSelected.id))
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
              if (res.state) {
                this.nsHopdongList = res.data;
              }
            });
        }
      });
  }

  onXoa(ns) {
    //HĐLĐ ở tình trạng (5,6):
    if (!ns || ns.trangthaiky != null) {
      if (
        ns.trangthaiky == 'DACHUYENDO' ||
        ns.trangthaiky == 'DABANHANHQD' ||
        ns.trangthaiky == 'KETTHUC'
      ) {
        this.messageService.showErrorMessage(
          'Thông báo: ',
          'Dự thảo HĐLĐ đã được trình ký và phát hành! Bạn không thực hiện được thao tác này!'
        );
        return;
      }
    }

    // HĐLĐ ở tình trạng (3,4,7): Hệ thống hiển thị msg yêu cầu NSD xác nhận lại
    if (
      ns.trangthaiky == 'DACHUYENNLD' ||
      ns.trangthaiky == 'CHOCHUYENDO' ||
      ns.trangthaiky == 'TRALAI'
    ) {
      let dialog = this.mb.showDefault(
        'Dự thảo đã được tạo và chuyển ký! Bạn có muốn xóa khỏi danh sách?',
        Buttons.YesNo
      );

      dialog.dialogResult$.subscribe(async (result) => {
        if (result) {
          let param: ParamNsHdldBean = new ParamNsHdldBean();
          let dsNsHdldDeleteList: any[] = [];
          dsNsHdldDeleteList.push(ns);
          param.nsDanhsachHdldList = dsNsHdldDeleteList;

          // xóa trong DB
          this.http
            .post(hdldURL.deleteDsNsHDLD(), param)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (res.state) {
                // remove ns khỏi nsHopdongList trên lưới
                const index = this.nsHopdongList.indexOf(ns);
                if (index !== -1) {
                  this.nsHopdongList.splice(index, 1);
                }
              }
            });
        }
      });

      return;
    }

    //HĐLĐ ở trạng thái (1,2): Hệ thống thực hiện Xóa dòng khỏi danh sách.
    if (
      ns.trangthaiky == 'CHOTAODUTHAO' ||
      ns.trangthaiky == 'DATAODUTHAO' ||
      ns.trangthaiky == null
    ) {
      let param: ParamNsHdldBean = new ParamNsHdldBean();
      let dsNsHdldDeleteList: any[] = [];
      dsNsHdldDeleteList.push(ns);
      param.nsDanhsachHdldList = dsNsHdldDeleteList;

      // xóa trong DB
      this.http
        .post(hdldURL.deleteDsNsHDLD(), param)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res.state) {
            // remove ns khỏi nsHopdongList trên lưới
            const index = this.nsHopdongList.indexOf(ns);
            if (index !== -1) {
              this.nsHopdongList.splice(index, 1);
            }
          }
        });
    }
  }

  setNgayKt(ns: any) {
    if (ns.ttrangId == 1) {
      ns.ngaykt = new Date(ns.ngayHieuluc);
      ns.ngaykt.setMonth(ns.ngaykt.getMonth() + 3);
    } else if (ns.ttrangId == 2) {
      ns.ngaykt = new Date(ns.ngayHieuluc);
      ns.ngaykt.setMonth(ns.ngaykt.getMonth() + 6);
    } else if (ns.ttrangId == 3) {
      ns.ngaykt = new Date(ns.ngayHieuluc);
      ns.ngaykt.setMonth(ns.ngaykt.getMonth() + 9);
    } else if (ns.ttrangId == 4) {
      ns.ngaykt = new Date(ns.ngayHieuluc);
      ns.ngaykt.setMonth(ns.ngaykt.getMonth() + 12);
    } else if (ns.ttrangId == 5) {
      ns.ngaykt = new Date(ns.ngayHieuluc);
      ns.ngaykt.setMonth(ns.ngaykt.getMonth() + 36);
    } else if (ns.ttrangId == 9) {
      ns.ngaykt = new Date(ns.ngayHieuluc);
      ns.ngaykt.setMonth(ns.ngaykt.getMonth() + 24);
    } else if (ns.ttrangId == 26) {
      ns.ngaykt = new Date(ns.ngayHieuluc);
      ns.ngaykt.setMonth(ns.ngaykt.getMonth() + 1);
    } else if (ns.ttrangId == 27) {
      ns.ngaykt = new Date(ns.ngayHieuluc);
      ns.ngaykt.setMonth(ns.ngaykt.getMonth() + 2);
    } else if (ns.ttrangId == 32) {
      ns.ngaykt = new Date(ns.ngayHieuluc);
      ns.ngaykt.setMonth(ns.ngaykt.getMonth() + 11);
    } else if (ns.ttrangId == 37) {
      ns.ngaykt = new Date(ns.ngayHieuluc);
      ns.ngaykt.setMonth(ns.ngaykt.getMonth() + 18);
    } else {
      ns.ngaykt = null;
    }
  }

  onNgayHieulucChange(event: any, ns: any) {
    this.setNgayKt(ns);
  }

  onNgayKetThucChange(event: any, ns: any) {
    // Xử lý khi giá trị ngày kết thúc thay đổi
    if (
      ns.ttrangId == 1 ||
      ns.ttrangId == 2 ||
      ns.ttrangId == 3 ||
      ns.ttrangId == 4 ||
      ns.ttrangId == 5 ||
      ns.ttrangId == 9 ||
      ns.ttrangId == 26 ||
      ns.ttrangId == 27 ||
      ns.ttrangId == 32 ||
      ns.ttrangId == 37
    ) {
      if (ns.ngaykt < ns.ngayHieuluc) {
        this.messageService.showErrorMessage(
          'Thông báo: ',
          'Ngày kết thúc phải sau ngày HĐLĐ!'
        );
        this.setNgayKt(ns);
      }
    } else {
      ns.ngaykt = null;
    }

    if (ns.ngaykt < ns.ngayHieuluc) {
      this.messageService.showErrorMessage(
        'Thông báo: ',
        'Ngày kết thúc phải sau ngày HĐLĐ!'
      );
    }
    console.log(event, ns);
  }

  onLoaiHDLDChange(event: MatSelectChange, ns: any) {
    // Xử lý khi giá trị loại HĐLĐ thay đổi
    //console.log(event.value, ns);
    this.setNgayKt(ns);
  }

  onChonNs1() {
    const dialogRef = this._matDialog.open(NsdenhanDialogComponent, {
      width: '1300px',
      disableClose: true,
      data: {
        donviId: this.donviId,
      },
    });

    // Lắng nghe sự kiện khi form con đóng
    dialogRef.afterClosed().subscribe((dataFromChild) => {
      // Xử lý dữ liệu từ form con được truyền về
      //console.log('Dữ liệu từ form con:', dataFromChild);
      let param: ParamNsHdldBean = new ParamNsHdldBean();

      param.nsDanhsachHdldList = this.nsHopdongList;
      if (dataFromChild.param2 == false) {
        param.dsNhansuUIList = dataFromChild.param1;
        param.thongtinCanhbaoList = null;
      } else if (dataFromChild.param2 == true) {
        param.dsNhansuUIList = null;
        param.thongtinCanhbaoList = dataFromChild.param1;
      }

      // Thực hiện các bước xử lý tiep theo
      this.http
        .post(hdldURL.getNsDsachHdldListFromCanhbaoDenhan(), param)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res.state) {
            this.nsHopdongList = res.data;
          }
        });
    });
  }

  onChonNs2() {
    const dialogRef = this._matDialog.open(TaoHdldDialogComponent, {
      width: '1300px',
      disableClose: true,
      data: {
        donviId: this.donviId,
      },
    });

    // Lắng nghe sự kiện khi form con đóng
    dialogRef.afterClosed().subscribe((dataFromChild: any[]) => {
      // Xử lý dữ liệu từ form con được truyền về
      //console.log('Dữ liệu từ form con:', dataFromChild);
      let param: ParamNsHdldBean = new ParamNsHdldBean();

      param.nsDanhsachHdldList = this.nsHopdongList;
      param.dsNhansuUIList = dataFromChild;
      param.thongtinCanhbaoList = null;

      console.log('Dữ liệu Param:', param);

      // Thực hiện các bước xử lý tiep theo
      this.http
        .post(hdldURL.getNsDsachHdldListFromCanhbaoDenhan(), param)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res.state) {
            this.nsHopdongList = res.data;
          }
        });
    });
  }

  onXuatExcel() {}

  onChonThangBangluong(event: any, ns: any): void {
    const dialogRef = this._matDialog.open(ThamsoluongformComponent, {
      disableClose: true,
      data: {
        id: this.dataLuong?.mabangluong,
        bacluongId: this.dataLuong?.bacluongId,
        mangachluong: this.dataLuong?.mangachluong,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataLuong.bacluongId = result.id;
        ns.luongId = result.id;
        this.http
          .get(DanhMucURL.getLuongInfo(result.id))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (res.state) {
              ns.strMangachluong =
                res.data.mangachluong +
                ', ' +
                res.data.bacluong +
                ', ' +
                res.data.heSo;
            }
          });
      }
    });
  }

  onChonHesoPhucap(event: any, ns: any): void {
    const dialogRef = this._matDialog.open(HesophucapDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        ns.strPhucap = result.heso + ' - ' + result.ghichu;
        ns.phucapId = result.id;
      }
    });
  }

  onClose() {
    this.matDialogRef.close();
  }

  onTaoHopDong() {
    const dialogRef = this._matDialog.open(TaoHdldDialogComponent, {
      width: '1300px',
      disableClose: true,
      data: {
        donviId: this.donviId,
      },
    });
  }

  onXoaHopDong() {
    let dialog = this.mb.showDefault(
      'Bạn có chắc muốn xóa hợp đồng này?',
      Buttons.YesNo
    );
  }
}
