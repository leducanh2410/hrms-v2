import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
} from 'ngx-image-cropper';

import { CommonModule } from '@angular/common';
import { ImageviewModule } from '../imageview/imageview.module';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { ImageModule } from 'primeng/image';
import { ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-cropimage',
  templateUrl: './cropimage.component.html',
  styleUrls: ['./cropimage.component.scss'],
  imports: [
    CommonModule,
    ImageviewModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    FormsModule,
    ImageModule,
    ImageCropperComponent,
  ],
})
export class CropimageComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<CropimageComponent>
  ) {}

  ngOnInit(): void {}

  sourceImage: any = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  imageCropped(event: ImageCroppedEvent) {
    this.getBase64FromBlob(event.blob).then((base64) => {
      this.croppedImage = base64;
    });
  }

  getBase64FromBlob(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string); // Kết quả Base64
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(blob); // Đọc Blob và chuyển thành Base64
    });
  }

  imageLoaded() {
    this.showCropper = true;
    this.getBase64ImageFromFile(this.data).then((base64data) => {
      this.sourceImage = base64data;
    });
  }

  cropperReady(sourceImageDimensions: Dimensions) {}

  loadImageFailed() {}

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  saveAndClose(): void {
    this.matDialogRef.close(this.croppedImage);
  }

  close(): void {
    // console.log(this.data);
    this.matDialogRef.close(null);
  }

  async getBase64ImageFromFile(file) {
    const reader = new FileReader();
    const future = new Promise((resolve, reject) => {
      reader.addEventListener(
        'load',
        function () {
          resolve(reader.result);
        },
        false
      );
      reader.addEventListener(
        'error',
        function (event) {
          reject(event);
        },
        false
      );

      reader.readAsDataURL(file);
    });
    return future;
  }
}
