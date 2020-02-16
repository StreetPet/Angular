import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVoluntarioComponent } from './dashboard-voluntario.component';

describe('DashboardVoluntarioComponent', () => {
  let component: DashboardVoluntarioComponent;
  let fixture: ComponentFixture<DashboardVoluntarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardVoluntarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
