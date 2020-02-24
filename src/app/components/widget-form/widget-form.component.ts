import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/services/navigation.service';
import { WidgetType } from 'src/app/models/widget-type.model';
import { HeaderType } from 'src/app/models/header-type.model';
import { Settings } from 'src/app/models/settings.model';

@Component({
  selector: 'app-widget-form',
  templateUrl: './widget-form.component.html',
  styleUrls: ['./widget-form.component.scss']
})
export class WidgetFormComponent implements OnInit {
  formType: string;
  widgetTypeOptions = this.getEnumValues(WidgetType);
  headerTypeOptions = this.getEnumValues(HeaderType);
  settingsOptions = this.getEnumValues(Settings);
  id: string = null;

  widgetType = WidgetType;
  headerType = HeaderType;
  settings = Settings;

  widgetForm = new FormGroup({
    title: new FormControl('', Validators.required),
    column: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(3)
    ]),
    type: new FormControl(-1, Validators.required),
    headerType: new FormControl(-1, Validators.required),
    settings: new FormControl(-1, Validators.required),
    data: new FormControl('', Validators.required)
  });

  constructor(
    private appDataService: AppDataService,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.id = this.route.snapshot.paramMap.get('id');
    this.checkIfEditOrAddForm();
  }

  private getEnumValues(obj: Object): Array<any> {
    let enumValues = Object.keys(obj).filter(key => isNaN(obj[key]));
    return enumValues;
  }

  private checkIfEditOrAddForm(): void {
    if (this.id) {
      this.formType = 'edit';
      this.getWidgetById(this.id);
    } else {
      this.formType = 'add';
    }
  }

  saveWidget(): void {
    this.widgetForm
      .get('data')
      .setValue(JSON.parse(this.widgetForm.value.data));
    if (this.id) {
      this.appDataService
        .updateWidget(this.id, this.widgetForm.value)
        .subscribe(data => this.navigateToHomepage());
    } else {
      this.appDataService
        .addNewWidget(this.widgetForm.value)
        .subscribe(widget => this.navigateToHomepage());
    }
  }

  private getWidgetById(id: string): void {
    this.appDataService.getWidget(id).subscribe(widget => {
      this.widgetForm.patchValue(widget);
      this.widgetForm.get('data').setValue(JSON.stringify(widget.data));
    });
  }

  deleteWidget(): void {
    this.appDataService.deleteWidget(this.id).subscribe(res => {
      this.navigateToHomepage();
    });
  }

  navigateToHomepage(): void {
    this.navigationService.navigateToHomepage();
  }
}
