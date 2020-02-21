import { Component, OnInit } from "@angular/core";
import { Widget } from "src/app/models/widget.model";
import { AppDataService } from "src/app/services/app-data.service";
import { ActivatedRoute } from "@angular/router";
import { NavigationService } from "src/app/services/navigation.service";

@Component({
  selector: "app-widget-form",
  templateUrl: "./widget-form.component.html",
  styleUrls: ["./widget-form.component.scss"]
})
export class WidgetFormComponent implements OnInit {
  formTitle: string;
  buttonAction: string;
  formType: string;
  widgetTypeOptions = ["Table", "Messaging"];
  headerTypeOptions = ["Light", "Dark"];
  settingsOptions = ["No", "Yes"];
  widget: Widget = new Widget();
  dataAsString: any;
  id: string = null;

  constructor(
    private appDataService: AppDataService,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.id = this.route.snapshot.paramMap.get("id");
    this.checkIfEditOrAddForm();
  }

  private checkIfEditOrAddForm(): void {
    if (this.id) {
      this.formType = "edit";
      this.getWidgetById(this.id);
    } else {
      this.formType = "add";
    }
  }

  saveWidget(): void {
    this.widget.data = JSON.parse(this.dataAsString);

    if (this.id) {
      this.appDataService
        .updateWidget(this.id, this.widget)
        .subscribe(data => console.log(data));
      this.navigateToHomepage();
    } else {
      this.appDataService
        .addNewWidget(this.widget)
        .subscribe(widget => console.log(widget));
      this.navigateToHomepage();
    }
  }

  private getWidgetById(id: string): void {
    this.appDataService.getWidget(id).subscribe(widget => {
      this.widget = widget;
      this.dataAsString = JSON.stringify(widget.data);
    });
  }

  deleteWidget(): void {
    this.appDataService
      .deleteWidget(this.id)
      .subscribe(res => console.log(res));
    this.navigateToHomepage();
  }

  navigateToHomepage(): void {
    this.navigationService.navigateToHomepage();
  }
}
