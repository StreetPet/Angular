import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVoluntariosComponent } from './menu-voluntarios.component';

describe('MenuVoluntariosComponent', () => {
  let component: MenuVoluntariosComponent;
  let fixture: ComponentFixture<MenuVoluntariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuVoluntariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuVoluntariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
