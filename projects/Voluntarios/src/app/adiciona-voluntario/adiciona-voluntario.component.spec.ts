import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaVoluntarioComponent } from './adiciona-voluntario.component';

describe('AdicionaVoluntarioComponent', () => {
  let component: AdicionaVoluntarioComponent;
  let fixture: ComponentFixture<AdicionaVoluntarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionaVoluntarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
