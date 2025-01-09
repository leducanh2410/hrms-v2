import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachhdldComponent } from './danhsachhdld.component';

describe('DanhsachhdldComponent', () => {
  let component: DanhsachhdldComponent;
  let fixture: ComponentFixture<DanhsachhdldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachhdldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanhsachhdldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
