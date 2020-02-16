import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPapeisVoluntarioComponent } from './listar-papeis-voluntario.component';

describe('ListarPapeisVoluntarioComponent', () => {
  let component: ListarPapeisVoluntarioComponent;
  let fixture: ComponentFixture<ListarPapeisVoluntarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPapeisVoluntarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPapeisVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
