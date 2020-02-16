import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPapeisVoluntarioComponent } from './editar-papeis-voluntario.component';

describe('EditarPapeisVoluntarioComponent', () => {
  let component: EditarPapeisVoluntarioComponent;
  let fixture: ComponentFixture<EditarPapeisVoluntarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPapeisVoluntarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPapeisVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
