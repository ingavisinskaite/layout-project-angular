import { Component, OnInit } from "@angular/core";
import { AppDataService } from "src/app/services/app-data.service";
import { Widget } from "src/app/models/widget.model";
import { WidgetType } from "../../models/widget-type.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  widgets: Widget[] = [];
  constructor(private appDataService: AppDataService) {}

  ngOnInit(): void {
    this.getAllWidgets();
  }

  private getAllWidgets() {
    this.appDataService
      .getAllWidgets()
      .subscribe(data => (this.widgets = data));
  }
}
