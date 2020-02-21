import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AppDataService } from "src/app/services/app-data.service";
import { Widget } from "src/app/models/widget.model";
import { WidgetType } from "../../models/widget-type.model";
import { NavigationService } from "src/app/services/navigation.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  column1Widgets: Widget[];
  column2Widgets: Widget[];
  column3Widgets: Widget[];
  columns = [];
  WidgetType = WidgetType;
  type: any;
  urlParams: any;
  widgetsSubscription: any;
  widgets: Widget[];

  constructor(
    private appDataService: AppDataService,
    private navigationService: NavigationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.urlParams = this.route.params.subscribe(params => {
      this.type = params.type;
      if (this.type === "messaging") {
        this.type = WidgetType.Messaging;
      } else if (this.type === "tables") {
        this.type = WidgetType.Table;
      }
      this.getWidgets(this.type);
    });
  }

  private getWidgets(type: number): void {
    this.widgetsSubscription = this.appDataService
      .getAllWidgets(type)
      .subscribe(widgets => {
        this.widgets = widgets;
        this.widgets.forEach(widget => {
          if (this.columns.indexOf(widget.column) === -1)
            this.columns.push(widget.column);
        });
      });
  }

  public openWidgetForm(id: number = null): void {
    this.navigationService.navigateToWidgetForm(id);
  }

  ngOnDestroy(): void {
    this.urlParams.unsubscribe();
    this.widgetsSubscription.unsubscribe();
  }
}
