import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtrdaotaoComponent } from './qtrdaotao.component';

describe('QtrdaotaoComponent', () => {
  let component: QtrdaotaoComponent;
  let fixture: ComponentFixture<QtrdaotaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtrdaotaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QtrdaotaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
