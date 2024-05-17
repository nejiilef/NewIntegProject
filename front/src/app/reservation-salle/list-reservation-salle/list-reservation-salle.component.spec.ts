import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationSalleComponent } from './list-reservation-salle.component';

describe('ListReservationSalleComponent', () => {
  let component: ListReservationSalleComponent;
  let fixture: ComponentFixture<ListReservationSalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListReservationSalleComponent]
    });
    fixture = TestBed.createComponent(ListReservationSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
