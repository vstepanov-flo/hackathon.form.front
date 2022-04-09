import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ApplicationForm {
  city: string;
  email: string;
  file: string;
  institution: string;
  name: string;
  patronymic: string;
  applicationText: string;
  applicationType: string;
  surname: string;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectService {

  //TODO add types
  public selectedForm: BehaviorSubject<ApplicationForm> = new BehaviorSubject<ApplicationForm>({
    city: '',
    email: '',
    file: '',
    institution: '',
    name: '',
    patronymic: '',
    applicationText: '',
    applicationType: '',
    surname: '',
    tags: [''],
  });
  public selectedFile: BehaviorSubject<File> = new BehaviorSubject<File>(new File([], ''));

  constructor() {
  }

  public selectRequest(form: any): void {
    this.selectedForm.next(form);
  }
}
