import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsthaydoivtcdDialogComponent } from './nsthaydoivtcd-dialog.component';

describe('NsthaydoivtcdDialogComponent', () => {
  let component: NsthaydoivtcdDialogComponent;
  let fixture: ComponentFixture<NsthaydoivtcdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NsthaydoivtcdDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NsthaydoivtcdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
