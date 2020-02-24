import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';
import { Widget } from 'src/app/models/widget.model';
import { WidgetType } from '../../models/widget-type.model';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  column1Widgets: Widget[];
  column2Widgets: Widget[];
  column3Widgets: Widget[];
  WidgetType = WidgetType;
  type: any;
  urlParams: any;
  widgets: any;

  constructor(
    private appDataService: AppDataService,
    private navigationService: NavigationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.urlParams = this.route.params.subscribe(params => {
      this.type = params.type;
      if (this.type === 'messaging') {
        this.type = WidgetType.Messaging;
      } else if (this.type === 'tables') {
        this.type = WidgetType.Table;
      } else {
        this.type = null;
      }
      this.getWidgets(this.type);
    });
  }

  private getWidgets(type: number): void {
    this.widgets = this.appDataService
      .getAllWidgets(type)
      .subscribe(widgets => {
        this.column1Widgets = widgets.filter(widget => widget.column === 1);
        this.column2Widgets = widgets.filter(widget => widget.column === 2);
        this.column3Widgets = widgets.filter(widget => widget.column === 3);
      });
  }

  public openWidgetForm(id: number = null): void {
    this.navigationService.navigateToWidgetForm(id);
  }

  ngOnDestroy(): void {
    this.urlParams.unsubscribe();
    this.widgets.unsubscribe();
  }
}
