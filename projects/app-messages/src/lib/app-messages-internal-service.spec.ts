import { TestBed } from '@angular/core/testing';

import { AppMessagesInternalService } from './app-messages-internal-service';

describe('AppMessagesInternalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppMessagesInternalService = TestBed.get(AppMessagesInternalService);
    expect(service).toBeTruthy();
  });
});
