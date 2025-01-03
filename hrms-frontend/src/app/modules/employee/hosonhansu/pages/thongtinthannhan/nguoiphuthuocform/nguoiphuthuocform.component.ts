import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { DanhMucURL } from '../../../../../../services/employe/danhmucURL';
import { llnsURL } from '../../../../../../services/employe/llnsURL';
import { MessageService } from '../../../../../../shared/message.services';
import { Subject, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';


@Component({
    selector: 'app-nguoiphuthuocform',
    templateUrl: './nguoiphuthuocform.component.html',
    imports:[
        MatFormFieldModule,
        FormsModule,
        MatDatepickerModule,
        MatOptionModule,
        DropdownModule,
        CheckboxModule,
        CommonModule,
        MatInputModule
    ]
})
export class NguoiphuthuocformComponent implements OnInit {
    @ViewChild('registerForm', { static: false }) registerForm: any;
    listQhegd: any[] = [];
    listQuoctich: any[] = [];
    listThanhpho: any[] = [];
    listQuanhuyen: any[] = [];
    isCoCMT: boolean = false;
    isDangapdung: boolean = true;
    minDate: Date = null;
    maxDate: Date = null;
    birthDate : Date = null;
    isLockform = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<NguoiphuthuocformComponent>,
        private messageService: MessageService,
        private http: CommonApiService,
    ) {

        
    }

    ngOnInit(): void {
        this.http
            .get(DanhMucURL.getListQhephuthuoc())
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
                if (!res || !res.state) return;
                this.listQhegd = res.data;
            });

        this.http
            .get(DanhMucURL.getListQuocgia())
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
                if (!res || !res.state) return;
                this.listQuoctich = res.data;
            });

        this.http
            .get(DanhMucURL.getListThanhPho())
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
                if (!res || !res.state) return;
                this.listThanhpho = res.data;
            });

        if (!this.data.addNew) {
            if(this.data.giadinh.ttphoId){
                this.getDsQuanhuyen(this.data.giadinh.ttphoId);
            }
            this.data.giadinh.ks_quocgiaId = 1;
            let cmt = this.data.giadinh.cmndorcccd;
            let mst = this.data.giadinh.mstcanhan;
            if ((cmt != null && cmt != '' && cmt != undefined) || (mst != null && mst != '' && mst != undefined) ) {
                this.isCoCMT = false;
            } else {
                this.isCoCMT = true;
            }
        } else {
            this.data.giadinh = {
                hientai: true,
                quocgiaId: 1,
                ks_quocgiaId: 1,
                lQhenguoiphuthuoc: { id: null}
            };
        }
    }

    getDsQuanhuyen(idtp) {
        this.http
            .get(DanhMucURL.getListQHuyen(idtp))
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
                if (!res || !res.state) return;
                this.listQuanhuyen = res.data;
            });
    }

    startDate(event: MatDatepickerInputEvent<Date>): void {
        this.minDate = event.value;
    }

    endDate(event: MatDatepickerInputEvent<Date>): void {
        this.maxDate = event.value;
    }



    birthday(event: MatDatepickerInputEvent<Date>): void {
        this.birthDate = event.value;
    }


    nhapTiep(): void {
        this.data.giadinh = {
            hientai: true,
            quocgiaId: 1,
            qhuyenId: null,
            ttphoId: null,
            ks_quocgiaId: 1,
            lQhenguoiphuthuoc: {
                id: null
            }
        };
        this.listQuanhuyen = null;
        this.data.addNew = true;
        this.isLockform = false;
    }

    onCheckCMT(event) : void {
        if(event.checked){
            this.data.giadinh.cmndorcccd = null;
            this.data.giadinh.mstcanhan = null;
        } else {
            this.data.giadinh.so = null;
            this.data.giadinh.quyenso = null;
            this.data.giadinh.ks_quocgiaId = null;
            this.data.giadinh.ttphoId = null;
            this.data.giadinh.qhuyenId = 1;
            this.data.giadinh.phuongxa = null;
        }
    }


    saveAndClose(): void {
        if(this.minDate && this.maxDate && this.minDate > this.maxDate){
            this.messageService.showWarningMessage(
                'Hệ thống',
                'Thời điểm bắt đầu phải nhỏ hơn thời điểm kết thúc!'
            );
            return;
        }

        if(this.minDate && this.birthDate && this.birthDate > this.minDate){
            this.messageService.showWarningMessage(
                'Hệ thống',
                'Ngày sinh phải nhỏ hơn Thời điểm bắt đầu giảm trừ!'
            );
            return;
        }

        if (this.registerForm.invalid) return



        this.data.giadinh.donviId = this.data.nhansu.donviId;
        this.data.giadinh.nsId = this.data.nhansu.nsID;
        if (!this.isCoCMT) {
            this.data.giadinh.so = '';
            this.data.giadinh.quyenso = '';
            this.data.giadinh.ks_quocgiaId = null;
            this.data.giadinh.ttphoId = null;
            this.data.giadinh.qhuyenId = null;
            this.data.giadinh.phuongxa = '';
        } else {
            this.data.giadinh.cmndorcccd = '';
            this.data.giadinh.mstcanhan = '';
        }
        if (this.data.addNew) {
            if (this.data.giadinh) {
                this.http
                    .post(llnsURL.insertNguoiPT(), this.data.giadinh)
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
                        this.isLockform = true;
                    });
            }
        } else {
            this.matDialogRef.close(this.data.giadinh);
        }
    }

    close(): void {
        this.matDialogRef.close();
    }
}
