import { Component, OnInit, Input } from '@angular/core';
import { Widget } from 'src/app/models/widget.model';
import { HeaderType } from 'src/app/models/header-type.model';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-table-widget',
  templateUrl: './table-widget.component.html',
  styleUrls: ['./table-widget.component.scss']
})
export class TableWidgetComponent implements OnInit {
  constructor(private navigationService: NavigationService) {}
  HeaderType = HeaderType;

  @Input() widgetData: Widget;

  ngOnInit(): void {}

  public openWidgetForm(id: string = null): void {
    this.navigationService.navigateToWidgetForm(id);
  }
}
