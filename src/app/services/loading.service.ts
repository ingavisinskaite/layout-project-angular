import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading: boolean = true;
  show() {
    this.isLoading = true;
  }
  hide() {
    this.isLoading = false;
  }
}
