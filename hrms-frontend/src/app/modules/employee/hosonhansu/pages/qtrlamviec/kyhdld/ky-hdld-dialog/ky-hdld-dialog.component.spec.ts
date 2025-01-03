import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KyHdldDialogComponent } from './ky-hdld-dialog.component';

describe('KyHdldDialogComponent', () => {
  let component: KyHdldDialogComponent;
  let fixture: ComponentFixture<KyHdldDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KyHdldDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KyHdldDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
