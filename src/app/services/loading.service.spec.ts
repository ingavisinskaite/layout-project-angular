import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set isLoading to true', () => {
    service.show();
    service.isLoading.subscribe(value => {
      expect(value).toBeTrue();
    });
  });

  it('should set isLoading to true', () => {
    service.hide();
    service.isLoading.subscribe(value => {
      expect(value).toBeFalse();
    });
  });
});
