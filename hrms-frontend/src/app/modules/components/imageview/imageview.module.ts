import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageviewComponent } from './imageview.component';
import { ImageModule } from 'primeng/image';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ImageModule,
    FormsModule,
    ImageviewComponent

  ],
  exports: [
    ImageviewComponent
  ]
})
export class ImageviewModule { }
