import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';
import { Widget } from 'src/app/models/widget.model';
import { WidgetType } from '../../models/widget-type.model';
import { NavigationService } from 'src/app/services/navigation.service';
import { Subject, throwError } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';

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

  constructor(
    private appDataService: AppDataService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getFilterType();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.loadingService.show();
  }

  openWidgetForm(id: number = null): void {
    this.navigationService.navigateToWidgetForm(id);
  }

  private getWidgets(type: number): void {
    this.loadingService.show();
    this.appDataService
      .getAllWidgets(type)
      .pipe(
        catchError(err => {
          this.loadingService.hide();
          return throwError(err);
        })
      )
      .subscribe(widgets => {
        this.column1Widgets = widgets.filter(widget => widget.column === 1);
        this.column2Widgets = widgets.filter(widget => widget.column === 2);
        this.column3Widgets = widgets.filter(widget => widget.column === 3);
        this.loadingService.hide();
      });
  }

  private getFilterType() {
    this.route.params.pipe(takeUntil(this.unsubscribeAll)).subscribe(params => {
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
}
