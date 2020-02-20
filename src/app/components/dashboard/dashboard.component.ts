import { MatDialog } from "@angular/material/dialog";
import { Component, OnInit } from "@angular/core";
import { AppDataService } from "src/app/services/app-data.service";
import { Widget } from "src/app/models/widget.model";
import { WidgetType } from "../../models/widget-type.model";
import { WidgetFormComponent } from "../widget-form/widget-form.component";

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
    public dialog: MatDialog
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

  openDialog(): void {
    const dialogRef = this.dialog.open(WidgetFormComponent, {
      width: "550px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
