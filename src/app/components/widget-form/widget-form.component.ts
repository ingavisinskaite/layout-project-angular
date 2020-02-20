import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, OnInit, Inject } from "@angular/core";
import { Widget } from "src/app/models/widget.model";
import { AppDataService } from "src/app/services/app-data.service";

@Component({
  selector: "app-widget-form",
  templateUrl: "./widget-form.component.html",
  styleUrls: ["./widget-form.component.scss"]
})
export class WidgetFormComponent implements OnInit {
  formTitle: string;
  buttonAction: string;
  title: string = "";
  column: string = "";
  widgetType: string = "";
  headerType: string = "";
  settings: string = "";
  data: string = "[{}]";
  widgetData: Widget;
  id: string = null;

  constructor(
    public dialogRef: MatDialogRef<WidgetFormComponent>,
    private appDataService: AppDataService
  ) {}

  ngOnInit(): void {
    this.checkIfEditOrAddForm();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  private checkIfEditOrAddForm() {
    if (this.id) {
      this.formTitle = "Edit widget";
      this.buttonAction = "Edit";
    } else {
      this.formTitle = "Add new widget";
      this.buttonAction = "Add";
    }
  }

  public saveWidget() {
    if (this.id) {
      console.log("edited");
    } else {
      console.log("new added");
    }
    this.closeDialog();
  }

  public formatWidgetDataObject(e: string) {
    this.widgetData = {
      title: this.title,
      column: parseInt(this.column),
      type: parseInt(this.widgetType),
      headerType: parseInt(this.headerType),
      settings: parseInt(this.settings),
      data: JSON.parse(this.data)
    };
  }
}
