import { TestBed } from '@angular/core/testing';

import { AppDataService } from './app-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppDataService', () => {
  let service: AppDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AppDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
