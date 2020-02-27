import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  jsonValidator(control: AbstractControl): { [key: string]: any } | null {
    try {
      JSON.parse(control.value);
    } catch (e) {
      return { invalidJson: { valid: false, value: control.value } };
    }
    return null;
  }

  dropdownValidator(control: AbstractControl): { [key: string]: any } | null {
    if (control.value === -1) {
      return { invalidDropdown: { valid: false, value: control.value } };
    }
    return null;
  }
}
