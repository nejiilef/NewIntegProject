import { TestBed } from '@angular/core/testing';

import { ReservationSalleServiceService } from './reservation-salle-service.service';

describe('ReservationSalleServiceService', () => {
  let service: ReservationSalleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationSalleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
