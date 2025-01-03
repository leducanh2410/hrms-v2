import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { KyluatformComponent } from './kyluatform.component';
import { FormnhansuModule } from '../../../../../assets/lib/formnhansu/src/public-api';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DropdownModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    DropdownModule,
    CheckboxModule,
    FileUploadModule,
    MatInputModule,
    MomentDateModule,
    AutoCompleteModule,
    FormnhansuModule
  ],
  exports: [
  ]
})
export class KyluatformModule { }
