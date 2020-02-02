import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaPapeisVoluntarioComponent } from './edita-papeis-voluntario.component';

describe('EditaPapeisVoluntarioComponent', () => {
  let component: EditaPapeisVoluntarioComponent;
  let fixture: ComponentFixture<EditaPapeisVoluntarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaPapeisVoluntarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaPapeisVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
