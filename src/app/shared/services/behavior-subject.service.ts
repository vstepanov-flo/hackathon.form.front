import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectService {

  //TODO add types
  public selectedRequests: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() {
  }

  public selectRequest(form: any): void {
    this.selectedRequests.next(form);
  }
}
