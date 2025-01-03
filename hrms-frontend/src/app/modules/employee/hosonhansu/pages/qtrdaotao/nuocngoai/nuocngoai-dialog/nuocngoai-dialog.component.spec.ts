import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuocngoaiDialogComponent } from './nuocngoai-dialog.component';

describe('NuocngoaiDialogComponent', () => {
    let component: NuocngoaiDialogComponent;
    let fixture: ComponentFixture<NuocngoaiDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NuocngoaiDialogComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NuocngoaiDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
