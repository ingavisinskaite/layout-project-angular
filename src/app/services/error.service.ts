import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  getMessage(error: HttpErrorResponse): string {
    if (!navigator.onLine) {
      return 'No Internet Connection';
    }
    return error.statusText + '. Check logs for more details';
  }
}
