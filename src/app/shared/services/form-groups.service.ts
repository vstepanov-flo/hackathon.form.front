import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationType } from '../../components/report-form/application-form.component';

@Injectable({
  providedIn: 'root',
})
export class FormGroupsService {

  private formControlFields = {
    email: new FormControl('', [Validators.required, Validators.email]),
    city: new FormControl('', [Validators.required]),
    organization: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    patronymic: new FormControl('', []),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(2048)]),
    organizationId: new FormControl('', []),
    title: new FormControl('', [Validators.required]),
  }

  private complaint: FormGroup = new FormGroup({
    ...this.formControlFields,
    tags: new FormControl(),
    file: new FormControl('', []),
  });

  private suggestion: FormGroup = new FormGroup(this.formControlFields);

  constructor() {
  }

  public getFormGroup(applicationType: ApplicationType): FormGroup {
    if (applicationType === 'complaint') {
      return this.complaint;
    }
    return this.suggestion;
  }
}
