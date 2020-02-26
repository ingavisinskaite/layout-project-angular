import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppDataService } from 'src/app/services/app-data.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { WidgetType } from 'src/app/models/widget-type.model';
import { HeaderType } from 'src/app/models/header-type.model';
import { Settings } from 'src/app/models/settings.model';
import { FormType } from 'src/app/models/form-type.model';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-widget-form',
  templateUrl: './widget-form.component.html',
  styleUrls: ['./widget-form.component.scss']
})
export class WidgetFormComponent implements OnInit {
  widgetTypeOptions = this.getEnumValues(WidgetType);
  headerTypeOptions = this.getEnumValues(HeaderType);
  settingsOptions = this.getEnumValues(Settings);
  id: string;
  widgetForm: FormGroup;
  formType: number;
  defaultWidgetFormValues = {
    title: '',
    column: null,
    type: -1,
    headerType: -1,
    settings: -1,
    data: ''
  };

  WidgetType = WidgetType;
  HeaderType = HeaderType;
  Settings = Settings;
  FormType = FormType;

  constructor(
    private appDataService: AppDataService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    setTimeout(() => {
      if (!this.id) {
        this.loadingService.hide();
      }
    });
    this.checkIfEditOrAddForm();
    this.widgetForm = this.createWidgetForm();
  }

  saveWidget(): void {
    this.loadingService.show();
    this.widgetForm
      .get('data')
      .setValue(JSON.parse(this.widgetForm.value.data));
    const saveWidgetObservable$ = this.id
      ? this.appDataService.updateWidget(this.id, this.widgetForm.value)
      : this.appDataService.createWidget(this.widgetForm.value);

    saveWidgetObservable$
      .pipe(
        catchError(err => {
          this.widgetForm.reset(this.defaultWidgetFormValues);
          this.loadingService.hide();
          return throwError(err);
        })
      )
      .subscribe(() => {
        this.navigateToHomepage();
      });
  }

  deleteWidget(): void {
    this.loadingService.show();
    this.appDataService
      .deleteWidget(this.id)
      .pipe(
        catchError(err => {
          this.loadingService.hide();
          return throwError(err);
        })
      )
      .subscribe(() => {
        this.navigateToHomepage();
      });
  }

  navigateToHomepage(): void {
    this.navigationService.navigateToHomepage();
  }

  private createWidgetForm(): FormGroup {
    return new FormGroup({
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
  }

  private getEnumValues(obj: Object): Array<any> {
    let enumValues = Object.keys(obj).filter(key => isNaN(obj[key]));
    return enumValues;
  }

  private checkIfEditOrAddForm(): void {
    if (this.id) {
      this.formType = FormType.Edit;
      this.getWidgetById(this.id);
    } else {
      this.formType = FormType.Add;
    }
  }

  private getWidgetById(id: string): void {
    this.loadingService.show();
    this.appDataService
      .getWidget(id)
      .pipe(
        catchError(err => {
          this.loadingService.hide();
          return throwError(err);
        })
      )
      .subscribe(widget => {
        this.widgetForm.patchValue(widget);
        this.widgetForm.get('data').setValue(JSON.stringify(widget.data));
        this.defaultWidgetFormValues = this.widgetForm.value;
        this.loadingService.hide();
      });
  }
}
