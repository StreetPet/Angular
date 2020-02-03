import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaRemocaoComponent } from './confirma-remocao.component';

describe('ConfirmaRemocaoComponent', () => {
  let component: ConfirmaRemocaoComponent;
  let fixture: ComponentFixture<ConfirmaRemocaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmaRemocaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaRemocaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
