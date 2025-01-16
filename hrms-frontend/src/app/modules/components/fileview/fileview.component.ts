import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonApiService } from '../../../services/commonHttp';
import { AppUltil } from '../../../shared/AppUltil';
import FileSaver from 'file-saver';
import { NgxExtendedPdfViewerModule, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { Subject, takeUntil } from 'rxjs';
import { ImageviewModule } from '../imageview/imageview.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AgVirtualScrollModule } from 'ag-virtual-scroll';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ImageModule } from 'primeng/image';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fileview',
  templateUrl: './fileview.component.html',
  styleUrls: ['./fileview.component.scss'],
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    HttpClientModule,
    AgVirtualScrollModule,
    MatDialogModule,
    ImageviewModule,
    ImageModule,
    FormsModule,
  ],
})
export class FileviewComponent implements OnInit {
  fileBase64: any;
  filePreview: any;
  is_Pdf: boolean = false;
  is_Image: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<FileviewComponent>,
    private http: CommonApiService,
    private sanitizer: DomSanitizer
  ) {
    // pdfDefaultOptions.renderInteractiveForms = false;
  }
  ngOnInit(): void {
    if (!this.data || !this.data.fileContent) {
      return;
    }
    this.fileBase64 = this.data.fileContent;
    if (
      this.data &&
      (this.data.fileId?.toUpperCase().includes('PDF') ||
        this.data.fileExten?.toUpperCase().includes('PDF'))
    ) {
      this.is_Pdf = true;
      this.filePreview = AppUltil.base64ToBlob(this.fileBase64);
    } else if (this.data.mimeType?.toUpperCase().includes('IMAGE')) {
      this.is_Image = true;
      if (this.fileBase64.startsWith('data:image'))
        this.fileBase64 = this.fileBase64.split(',')[1];
      this.filePreview = this.sanitizer.bypassSecurityTrustResourceUrl(
        `data:image/png;base64, ${this.fileBase64}`
      );
      // this.filePreview = this.fileBase64;
    } else if (
      this.data.fileId?.toUpperCase().includes('DOCX') ||
      this.data.fileExten?.toUpperCase().includes('DOCX')
    ) {
      this.is_Pdf = true;
      this.filePreview = AppUltil.base64ToBlob(this.fileBase64);
    }
  }

  saveAndClose(): void {
    this.matDialogRef.close();
  }

  close(): void {
    this.matDialogRef.close();
  }

  downloadAttachmentFile() {
    const blob = AppUltil.base64ToBlob(this.fileBase64);
    FileSaver.saveAs(blob, this.data.fileName);
  }
}
