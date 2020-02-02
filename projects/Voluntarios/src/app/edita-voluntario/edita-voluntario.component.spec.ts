import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaVoluntarioComponent } from './edita-voluntario.component';

describe('EditaVoluntariosComponent', () => {
  let component: EditaVoluntarioComponent;
  let fixture: ComponentFixture<EditaVoluntarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaVoluntarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
