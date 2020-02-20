import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, OnInit, Inject } from "@angular/core";
import { Widget } from "src/app/models/widget.model";

@Component({
  selector: "app-widget-form",
  templateUrl: "./widget-form.component.html",
  styleUrls: ["./widget-form.component.scss"]
})
export class WidgetFormComponent implements OnInit {
  title: string = "";
  buttonAction: string = "";
  constructor(
    public dialogRef: MatDialogRef<WidgetFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Widget
  ) {}

  ngOnInit(): void {}
}
