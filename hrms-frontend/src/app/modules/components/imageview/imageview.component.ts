import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-imageview',
  templateUrl: './imageview.component.html',
  styleUrls: ['./imageview.component.scss'],
  imports: [
    CommonModule,
    ImageModule,
    FormsModule,
  ]
})
export class ImageviewComponent implements OnInit, OnChanges {
  @Input('source') imageSource: string;
  @Input('type') type: string;
  @Input('width') width: number;
  @Input('height') height: number;
  imageSrc: any;
  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit (): void {

  }

  ngOnChanges(): void {
    if (this.imageSource) {
      if (this.type.toUpperCase() === 'URL') {
        this.imageSrc = this.imageSource;
      } else if (this.type.toUpperCase() === 'BASE64') {
        if(this.imageSource.startsWith('data:image'))
          this.imageSource = this.imageSource.split(',')[1];
        this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.imageSource}`);
      }
    } else {
      this.imageSrc = null
    }
  }
}
