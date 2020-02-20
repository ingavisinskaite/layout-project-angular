import { Component, OnInit, Input } from "@angular/core";
import { Widget } from "src/app/models/widget.model";
import { HeaderType } from "src/app/models/header-type.model";

@Component({
  selector: "app-messaging-widget",
  templateUrl: "./messaging-widget.component.html",
  styleUrls: ["./messaging-widget.component.scss"]
})
export class MessagesWidgetComponent implements OnInit {
  constructor() {}
  HeaderType = HeaderType;

  @Input() widgetData: Widget;

  ngOnInit(): void {}
}
