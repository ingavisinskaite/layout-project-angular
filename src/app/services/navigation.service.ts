import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {}

  public navigateToWidgetForm(id: any): void {
    if (!id) {
      this.router.navigateByUrl('/widget-form');
    } else {
      this.router.navigateByUrl('/widget-form/' + id);
    }
  }

  public navigateToHomepage(): void {
    this.router.navigateByUrl('/');
  }
}
