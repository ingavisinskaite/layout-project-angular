import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(
    private router: Router,
    private location: Location,
    private loadingService: LoadingService
  ) {}

  public navigateToWidgetForm(id: any): void {
    if (!id) {
      this.router.navigateByUrl('/widget-form');
    } else {
      this.router.navigate(['/widget-form', id]);
    }
  }

  public navigateToHomepage(): void {
    this.location.back();
    this.loadingService.show();
  }
}
