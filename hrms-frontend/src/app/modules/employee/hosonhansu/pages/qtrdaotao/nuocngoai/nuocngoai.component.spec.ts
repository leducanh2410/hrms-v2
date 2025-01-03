import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuocngoaiComponent } from './nuocngoai.component';

describe('NuocngoaiComponent', () => {
    let component: NuocngoaiComponent;
    let fixture: ComponentFixture<NuocngoaiComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NuocngoaiComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NuocngoaiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
