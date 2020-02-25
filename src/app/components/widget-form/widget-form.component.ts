import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/services/navigation.service';
import { WidgetType } from 'src/app/models/widget-type.model';
import { HeaderType } from 'src/app/models/header-type.model';
import { Settings } from 'src/app/models/settings.model';
import { Subject, throwError, Observable } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-widget-form',
  templateUrl: './widget-form.component.html',
  styleUrls: ['./widget-form.component.scss']
})
export class WidgetFormComponent implements OnInit, OnDestroy {
  formType: string;
  widgetTypeOptions = this.getEnumValues(WidgetType);
  headerTypeOptions = this.getEnumValues(HeaderType);
  settingsOptions = this.getEnumValues(Settings);
  id: string;
  unsubscribeAll = new Subject<any>();
  widgetForm: FormGroup;

  widgetType = WidgetType;
  headerType = HeaderType;
  settings = Settings;

  constructor(
    private appDataService: AppDataService,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.id = this.route.snapshot.paramMap.get('id');
    this.checkIfEditOrAddForm();
    this.widgetForm = this.createWidgetForm();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
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
    const saveWidgetObservable = this.id
      ? this.appDataService.updateWidget(this.id, this.widgetForm.value)
      : this.appDataService.addNewWidget(this.widgetForm.value);

    saveWidgetObservable
      .pipe(
        takeUntil(this.unsubscribeAll),
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      )
      .subscribe(() => this.navigateToHomepage());
  }

  private getWidgetById(id: string): void {
    this.appDataService
      .getWidget(id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(widget => {
        this.widgetForm.patchValue(widget);
        this.widgetForm.get('data').setValue(JSON.stringify(widget.data));
      });
  }

  deleteWidget(): void {
    this.appDataService
      .deleteWidget(this.id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.navigateToHomepage();
      });
  }

  navigateToHomepage(): void {
    this.navigationService.navigateToHomepage();
  }
}
