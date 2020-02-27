import { TestBed } from '@angular/core/testing';

import { ValidationService } from './validation.service';
import { FormControl } from '@angular/forms';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null when json is valid', () => {
    let data = new FormControl('[]');
    expect(service.jsonValidator(data)).toBe(null);
  });

  it('should return object when json is invalid', () => {
    let data = new FormControl('');
    let answer = { invalidJson: { valid: false, value: '' } };
    expect(service.jsonValidator(data)).toEqual(answer);
  });

  it('should return object when default value is selected', () => {
    let dropdownValue = new FormControl(-1);
    let answer = { invalidDropdown: { valid: false, value: -1 } };
    expect(service.dropdownValidator(dropdownValue)).toEqual(answer);
  });

  it('should return null when dropdown value selected', () => {
    let dropdownValue = new FormControl(1);
    expect(service.dropdownValidator(dropdownValue)).toBe(null);
  });
});
