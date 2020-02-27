import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppDataService } from 'src/app/services/app-data.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { WidgetType } from 'src/app/models/widget-type.model';
import { HeaderType } from 'src/app/models/header-type.model';
import { FormType } from 'src/app/models/form-type.model';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-widget-form',
  templateUrl: './widget-form.component.html',
  styleUrls: ['./widget-form.component.scss']
})
export class WidgetFormComponent implements OnInit {
  widgetTypeOptions = this.getEnumValues(WidgetType);
  headerTypeOptions = this.getEnumValues(HeaderType);
  id: string;
  widgetForm: FormGroup;
  formType: number;
  defaultWidgetFormValues = {
    title: '',
    column: null,
    type: -1,
    headerType: -1,
    data: ''
  };

  WidgetType = WidgetType;
  HeaderType = HeaderType;
  FormType = FormType;

  constructor(
    private appDataService: AppDataService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private validatorService: ValidationService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.checkIfEditOrAddForm();
    this.widgetForm = this.createWidgetForm();
  }

  saveWidget(): void {
    if (!this.validateJson(this.widgetForm.value.data)) {
      alert('nooooo');
      return;
    }
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
          return throwError(err);
        })
      )
      .subscribe(() => {
        this.navigateToHomepage();
      });
  }

  deleteWidget(): void {
    this.appDataService.deleteWidget(this.id).subscribe(() => {
      this.navigateToHomepage();
    });
  }

  navigateToHomepage(): void {
    this.navigationService.navigateToHomepage();
  }

  isFormControlValid(formControlKey: string): boolean {
    const formControl = this.widgetForm.get(formControlKey);
    return formControl.untouched || formControl.valid;
  }

  private createWidgetForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      column: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(3)
      ]),
      type: new FormControl(-1, [
        Validators.required,
        this.validatorService.dropdownValidator
      ]),
      headerType: new FormControl(-1, [
        Validators.required,
        this.validatorService.dropdownValidator
      ]),
      data: new FormControl('', [
        Validators.required,
        this.validatorService.jsonValidator
      ])
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
    this.appDataService.getWidget(id).subscribe(widget => {
      this.widgetForm.patchValue(widget);
      this.widgetForm.get('data').setValue(JSON.stringify(widget.data));
      this.defaultWidgetFormValues = this.widgetForm.value;
    });
  }

  private validateJson(input: string): boolean {
    try {
      JSON.parse(input);
    } catch (e) {
      return false;
    }
    return true;
  }
}
