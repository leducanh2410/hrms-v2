import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiduongDialogComponent } from './boiduong-dialog.component';

describe('BoiduongDialogComponent', () => {
  let component: BoiduongDialogComponent;
  let fixture: ComponentFixture<BoiduongDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoiduongDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoiduongDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
