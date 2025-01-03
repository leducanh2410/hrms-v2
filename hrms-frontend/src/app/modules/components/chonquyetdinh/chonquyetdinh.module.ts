import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChonquyetdinhComponent } from './chonquyetdinh.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import {MatSelectModule} from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipModule } from 'primeng/tooltip';
import { FileviewModule } from '../fileview/fileview.module';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatAutocompleteModule,
    FileUploadModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTooltipModule,
    TooltipModule,
  ],
  exports: [
  ]
})
export class ChonquyetdinhModule { }
