import { Component, OnInit } from '@angular/core';
import { TitleHead } from '../../../core/navigation/navigation.types';
import { MessageKey } from '../../../shared/AppUltil';
import { ShareData } from '../../../shared/shareservice.service';
import { ThongtinchungComponent } from './thongtinchung/thongtinchung.component';
import { ListmenuComponent } from './listmenu/listmenu.component';
import { MenuModule } from 'primeng/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { PagesComponent } from './pages/pages.component';
import { ThongtincanhanComponent } from './pages/thongtincanhan/thongtincanhan.component';
import { ThongtinthannhanComponent } from './pages/thongtinthannhan/thongtinthannhan.component';
import { TableModule } from 'primeng/table';
import { GiadinhformComponent } from './pages/thongtinthannhan/giadinhform/giadinhform.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatRippleModule,
} from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NguoiphuthuocformComponent } from './pages/thongtinthannhan/nguoiphuthuocform/nguoiphuthuocform.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ImageviewModule } from '../../components/imageview/imageview.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DividerModule } from 'primeng/divider';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormnhansuModule } from '../../../../assets/lib/formnhansu/src/public-api';
import { FormnhansuDonviModule } from '../../../../assets/lib/formnhansu-donvi/src/public-api';
import { QuillModule } from 'ngx-quill';
import { MatButtonModule } from '@angular/material/button';
import { KhenthuongKyluatComponent } from './pages/khenthuongkyluat/khenthuongkyluat.component';
import { KhenthuongformComponent } from './pages/khenthuongkyluat/khenthuongform/khenthuongform.component';
import { KyluatformComponent } from './pages/khenthuongkyluat/kyluatform/kyluatform.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { KhoitaohosonsComponent } from './thongtinchung/khoitaohoso/khoitaohosons/khoitaohosons.component';
import { FileUploadModule } from 'primeng/fileupload';
import { FormphongbanModule } from '../../../../assets/lib/formphongban/src/public-api';
import { FormdanhmucchungModule } from '../../../../assets/lib/formdanhmucchung/src/public-api';
import { FormquyetdinhModule } from '../../../../assets/lib/formquyetdinh/src/public-api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormnnghecnktModule } from '../../../../assets/lib/formnnghecnkt/src/public-api';
import { QtrinhlamviecComponent } from './pages/thongtincanhan/qtrinhlamviec/qtrinhlamviec.component';
import { QtrlamviecComponent } from './pages/qtrlamviec/qtrlamviec.component';
import { FileviewModule } from '../../components/fileview/fileview.module';
import { LamviecComponent } from './pages/qtrlamviec/lamviec/lamviec.component';
import { ChucvuComponent } from './pages/qtrlamviec/chucvu/chucvu.component';
import { DieudongComponent } from './pages/qtrlamviec/dieudong/dieudong.component';
import { DoantheComponent } from './pages/qtrlamviec/doanthe/doanthe.component';
import { KyhdldComponent } from './pages/qtrlamviec/kyhdld/kyhdld.component';
import { VN_DATE_FORMATS_EDIT } from '../../../core/config/vn-date-formats';
import {
  MAT_MOMENT_DATE_FORMATS,
  MatMomentDateModule,
} from '@angular/material-moment-adapter';
import { LamviecdialogComponent } from './pages/qtrlamviec/lamviec/lamviecDialog/lamviecdialog/lamviecdialog.component';
import { XacnhanpopupComponent } from './pages/xacnhanpopup/xacnhanpopup.component';
import { ChucvuformComponent } from './pages/qtrlamviec/chucvu/chucvuform/chucvuform.component';
import { KyHdldDialogComponent } from './pages/qtrlamviec/kyhdld/ky-hdld-dialog/ky-hdld-dialog.component';
import { DieudongdialogComponent } from './pages/qtrlamviec/dieudong/dieudongdialog/dieudongdialog/dieudongdialog.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  MatAutocomplete,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';

import { InputTextModule } from 'primeng/inputtext';
import { DtaodhformModule } from '../components/dtaodhform/dtaodhform.module';
import { DtaonhformModule } from '../components/dtaonhform/dtaonhform.module';
import { GiadinhformModule } from '../components/giadinhform/giadinhform.module';
import { KhenthuongformModule } from '../components/khenthuongform/khenthuongform.module';
import { KyluatformModule } from '../components/kyluatform/kyluatform.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChonquyetdinhModule } from '../../components/chonquyetdinh/chonquyetdinh.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hosonhansu',
  templateUrl: './hosonhansu.component.html',
  styleUrls: ['./hosonhansu.component.scss'],
  imports: [
    CommonModule,
    MenuModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    TableModule,
    MatDatepickerModule,
    DropdownModule,
    FormsModule,
    CheckboxModule,
    MatExpansionModule,
    ReactiveFormsModule,
    SplitButtonModule,
    ImageviewModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    DropdownModule,
    DividerModule,
    MatInputModule,
    CheckboxModule,
    MatCheckboxModule,
    FormnhansuModule,
    MatButtonModule,
    MatButtonToggleModule,
    FileUploadModule,
    FormphongbanModule,
    RadioButtonModule,
    FormnnghecnktModule,
    FileviewModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatMenuModule,
    MatRadioModule,
    AutoCompleteModule,
    FormquyetdinhModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    FormdanhmucchungModule,
    InputTextModule,
    MatAutocompleteModule,
    ScrollingModule,
    DtaodhformModule,
    DtaonhformModule,
    GiadinhformModule,
    KhenthuongformModule,
    InputTextareaModule,
    InputNumberModule,
    MultiSelectModule,
    ChonquyetdinhModule,
  ],
})
export class HosonhansuComponent implements OnInit {
  constructor(private shareData: ShareData) {
    const title: TitleHead = {
      title: 'Nhân sự',
      subTitle: 'Hồ sơ nhân sự',
      search: false,
    };
    this.shareData.sendMessage(MessageKey.FN_HEADER_NAME, title);
  }

  ngOnInit(): void {}
}
