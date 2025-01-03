import { CommonModule, formatDate } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
    FormsModule,
    NgForm,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageBox } from '../../../../../../../fuse/components/message-box/message-box.provider';
import { ValidateQD } from '../../../../../../components/qdnoidung/validateQD';
import { CommonApiService } from '../../../../../../../services/commonHttp';
import { DanhMucURL } from '../../../../../../../services/employe/danhmucURL';
import { DaotaoCanhanURL } from '../../../../../../../services/employe/daotaocanhanURL';
import { MessageService } from '../../../../../../../shared/message.services';
import { Subject, takeUntil } from 'rxjs';
import { ChonquyetdinhComponent } from '../../../../../../components/chonquyetdinh/chonquyetdinh.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-nuocngoai-dialog',
    templateUrl: './nuocngoai-dialog.component.html',
    styleUrls: ['./nuocngoai-dialog.component.scss'],
    imports:[
        ChonquyetdinhComponent,
        MultiSelectModule,
        CommonModule,
        FormsModule,
        DropdownModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatInputModule
    ]
})
export class NuocngoaiDialogComponent implements OnInit {
    @ViewChild('ngForm') formGroup!: NgForm;

    private nsID: number;

    public donviId: number;

    public listCanboQuanly: any[] = [];

    public listQuocgia: any[] = [];

    private selectedQuocGia: any[] = [];

    private countries: any[] = [];

    public selectedCountryNames: string;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    public quyetdinh = {
        qdinhId: null,
        soQd: '',
        ngayKy: null,
        nguoiky: '',
        chucvuKy: '',
        noiDung: '',
        namqd: '',
        fileAttach: null,
        fileName: '',
        fileExtend: '',
        isChangeFileAttach: false,
    };

    public nuocngoai = {
        selectedCountries: null,
        kinhphi: null,
        ngaybd: null, 
        ngaykt: null, 
        lydo: null,
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<NuocngoaiDialogComponent>,
        private messageService: MessageService,
        private http: CommonApiService,
        private mb: MessageBox
    ) {}

    ngOnInit(): void {
        this.nsID = this.data.nhansu.nsID;

        this.donviId = this.data.nhansu.donviId;

        this.loadQuocGiaList();

        if (
            this.data.nsNuocNgoai &&
            this.data.nsNuocNgoai.nuocngoaiIdList.length > 0
        ) {
            const nsNuocNgoai = this.data.nsNuocNgoai;
            this.quyetdinh.qdinhId = nsNuocNgoai.qdinhId;
            this.quyetdinh.soQd = nsNuocNgoai.soQD;
            this.quyetdinh.ngayKy = nsNuocNgoai.ngayKy;
            this.quyetdinh.chucvuKy = nsNuocNgoai.chucVu;
            this.quyetdinh.nguoiky = nsNuocNgoai.nguoiKy;
            this.quyetdinh.noiDung = nsNuocNgoai.noiDung;
            this.quyetdinh.fileAttach = nsNuocNgoai.fileAttach;
            this.quyetdinh.fileName = nsNuocNgoai.fileName;
            this.quyetdinh.fileExtend = nsNuocNgoai.fileExtend;
            this.nuocngoai.selectedCountries = nsNuocNgoai.selectedCountries;
            this.nuocngoai.kinhphi = nsNuocNgoai.kinhphi;
            this.nuocngoai.ngaybd = nsNuocNgoai.ngayBdau;
            this.nuocngoai.ngaykt = nsNuocNgoai.ngayKthuc;
            this.nuocngoai.lydo = nsNuocNgoai.lydo;
        }

        this.updateSelectedCountryNames();
    }

    loadQuocGiaList(): void {
        this.http
            .get(DanhMucURL.getListQuocgia())
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
                if (res.state) {
                    this.listQuocgia = res.data;
                }
            });
    }

    onChangeQuocGia(event) {
        const { originalEvent, value } = event;
        if (value) {
            this.selectedQuocGia.splice(0);
            this.selectedQuocGia.push(value);
        }

        this.updateSelectedCountryNames();
    }

    async saveAndClose(): Promise<void> {
        if (this.formGroup.invalid) {
            return;
        }

        // Xử lý bất đồng bộ ở đây
        const qdnoidung = await ValidateQD.getStatusOfNsQdndung(
            this.http,
            this.mb,
            this.quyetdinh,
            this.messageService,
            null
        );

        if (qdnoidung === null) return;

        const ngayBdau =  this.nuocngoai.ngaybd;
        if (ngayBdau === null) return;
        const ngayKthuc = this.nuocngoai.ngaykt;

        if (ngayKthuc != null) {
            if (
                formatDate(ngayBdau, 'yyyy-MM-dd hh:mm:ss', 'en_US') >
                formatDate(ngayKthuc, 'yyyy-MM-dd hh:mm:ss', 'en_US')
            ) {
                this.messageService.showErrorMessage(
                    'Hệ thống',
                    'Ngày bắt đầu và ngày kết thúc không hợp lệ!'
                );
                return;
            }
        }

        const commonParam = {
            nsId: this.nsID,
            donviId: this.donviId,
            qdinhId: this.quyetdinh.qdinhId,
            soQD: this.quyetdinh.soQd,
            ngayKy: this.quyetdinh.ngayKy,
            nguoiKy: this.quyetdinh.nguoiky,
            chucVu: this.quyetdinh.chucvuKy,
            noiDung: this.quyetdinh.noiDung,
            fileAttach: this.quyetdinh.fileAttach,
            fileName: this.quyetdinh.fileName,
            fileExtend: this.quyetdinh.fileExtend,
            kinhphi: this.nuocngoai.kinhphi,
            ngayBdau: this.nuocngoai.ngaybd,
            ngayKthuc: this.nuocngoai.ngaykt,
            lydo: this.nuocngoai.lydo,
        };

        if (this.data.addNew) {
            const nuocNgoaiParam = {
                ...commonParam,
                selectedCountries: this.selectedQuocGia[0],
            };

            if (nuocNgoaiParam.selectedCountries === null || nuocNgoaiParam.ngayBdau === null) return;

            this.http
                .post(DaotaoCanhanURL.createNsNuocNgoai(), nuocNgoaiParam)
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
                    this.matDialogRef.close();
                });
        } else {
            const nuocNgoaiParam = {
                nuocngoaiIdList: this.data.nsNuocNgoai.nuocngoaiIdList,
                ...commonParam,
                selectedCountries: this.nuocngoai.selectedCountries,
            };

            if (nuocNgoaiParam.selectedCountries === null || nuocNgoaiParam.ngayBdau === null) return;

            this.http
                .post(
                    DaotaoCanhanURL.editNsNuocNgoai(
                        nuocNgoaiParam.nsId,
                        nuocNgoaiParam.nuocngoaiIdList
                    ),
                    nuocNgoaiParam
                )
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
                    this.matDialogRef.close();
                });
        }
    }

    private updateSelectedCountryNames() {
        this.countries = this.nuocngoai.selectedCountries;
        const names: string[] = this.countries.map((obj) => obj.name);
        this.selectedCountryNames = names.join(', ');
    }

    close(): void {
        this.matDialogRef.close();
    }
}
