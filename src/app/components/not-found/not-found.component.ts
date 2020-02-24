import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {}

  navigateToHomepage(): void {
    this.navigationService.navigateToHomepage();
  }
}
