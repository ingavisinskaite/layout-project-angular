import { MatDialog } from "@angular/material/dialog";
import { Component, OnInit } from "@angular/core";
import { AppDataService } from "src/app/services/app-data.service";
import { Widget } from "src/app/models/widget.model";
import { WidgetType } from "../../models/widget-type.model";
import { WidgetFormComponent } from "../widget-form/widget-form.component";

export interface DialogData {
  animal: string;
  name: string;
}

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
  name: string;
  animal: string;

  constructor(
    private appDataService: AppDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getWidgets();
  }

  private getWidgets() {
    this.appDataService.getAllWidgets().subscribe(widgets => {
      this.column1Widgets = widgets.filter(widget => widget.column === 1);
      this.column2Widgets = widgets.filter(widget => widget.column === 2);
      this.column3Widgets = widgets.filter(widget => widget.column === 3);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WidgetFormComponent, {
      width: "750px",
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.animal = result;
    });
  }
}
