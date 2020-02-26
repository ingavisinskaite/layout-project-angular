import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';
import { Widget } from 'src/app/models/widget.model';
import { WidgetType } from '../../models/widget-type.model';
import { NavigationService } from 'src/app/services/navigation.service';
import { Subscription, Subject, throwError } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

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
  unsubscribeAll = new Subject<any>();
  isLoading = true;

  constructor(
    private appDataService: AppDataService,
    private navigationService: NavigationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsubscribeAll)).subscribe(params => {
      this.type = params.type;
      if (this.type === 'messaging') {
        this.type = WidgetType.Messaging;
      } else if (this.type === 'tables') {
        this.type = WidgetType.Table;
      } else {
        this.type = null;
      }
      window.scrollTo(0, 0);
      this.getWidgets(this.type);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private getWidgets(type: number): void {
    this.isLoading = true;
    this.appDataService
      .getAllWidgets(type)
      .pipe(
        catchError(err => {
          this.isLoading = false;
          return throwError(err);
        })
      )
      .subscribe(widgets => {
        this.column1Widgets = widgets.filter(widget => widget.column === 1);
        this.column2Widgets = widgets.filter(widget => widget.column === 2);
        this.column3Widgets = widgets.filter(widget => widget.column === 3);
        this.isLoading = false;
      });
  }

  public openWidgetForm(id: number = null): void {
    this.navigationService.navigateToWidgetForm(id);
  }
}
