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
  WidgetType = WidgetType;

  constructor(
    private appDataService: AppDataService,
    private navigationService: NavigationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getWidgets();
  }

  private getWidgets(): void {
    this.appDataService.getAllWidgets().subscribe(widgets => {
      this.column1Widgets = widgets.filter(widget => widget.column === 1);
      this.column2Widgets = widgets.filter(widget => widget.column === 2);
      this.column3Widgets = widgets.filter(widget => widget.column === 3);
    });
  }

  public openWidgetForm(id: number = null): void {
    this.navigationService.navigateToWidgetForm(id);
  }
}
