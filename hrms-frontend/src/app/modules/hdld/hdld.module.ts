import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { Route, RouterModule } from '@angular/router';
import { FileviewModule } from '../components/fileview/fileview.module';
import { ImageviewModule } from '../components/imageview/imageview.module';
import { FormdanhmucchungModule } from '../../../assets/lib/formdanhmucchung/src/public-api';
import { FormnhansuModule } from '../../../assets/lib/formnhansu/src/public-api';
import { FormnhansuDonviModule } from '../../../assets/lib/formnhansu-donvi/src/public-api';
import { FormnnghecnktModule } from '../../../assets/lib/formnnghecnkt/src/public-api';
import { FormphongbanModule } from '../../../assets/lib/formphongban/src/public-api';
import { FormquyetdinhModule } from '../../../assets/lib/formquyetdinh/src/public-api';
import { QuillModule } from 'ngx-quill';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { MenuModule } from 'primeng/menu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { HdldComponent } from './hdld.component';



import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { InputTextModule } from 'primeng/inputtext';
import { DanhsachhdldComponent } from './danhsachhdld/danhsachhdld.component';
import { NsdenhanDialogComponent } from './danhsachhdld/nsdenhan-dialog/nsdenhan-dialog.component';
import { NsthaydoivtcdDialogComponent } from './danhsachhdld/taohdld-dialog/taohdld-dialog.component';
import { HesophucapDialogComponent } from './danhsachhdld/hesophucap-dialog/hesophucap-dialog.component';

const routes: Route[] = [
  {
      path: '',
      component: HdldComponent,
      children: [
        {
            path: '',
            component: DanhsachhdldComponent,
        },
    ],
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes),
    QuillModule.forRoot(),
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
    FormnhansuDonviModule,
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
    InputTextModule
  ]
})
export class HdldModule { }
