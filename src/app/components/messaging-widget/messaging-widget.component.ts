import { Component, OnInit, Input } from "@angular/core";
import { Widget } from "src/app/models/widget.model";
import { HeaderType } from "src/app/models/header-type.model";
import { NavigationService } from "src/app/services/navigation.service";

@Component({
  selector: "app-messaging-widget",
  templateUrl: "./messaging-widget.component.html",
  styleUrls: ["./messaging-widget.component.scss"]
})
export class MessagesWidgetComponent implements OnInit {
  constructor(private navigationService: NavigationService) {}
  HeaderType = HeaderType;

  @Input() widgetData: Widget;

  ngOnInit(): void {}

  public openWidgetForm(id: string = null): void {
    this.navigationService.navigateToWidgetForm(id);
  }
}
