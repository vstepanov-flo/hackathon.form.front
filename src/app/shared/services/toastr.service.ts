import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Observable, throwError } from 'rxjs';
import { errorHandler } from '../helper/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  config = {
    destroyByClick: true,
    duration: 5000,
    hasIcon: true,
    position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    preventDuplicates: false,
  };

  dangerStatus: NbComponentStatus = 'danger';
  successStatus: NbComponentStatus = 'success';

  constructor(private toastrService: NbToastrService,
              private router: Router) {
  }

  showSuccessToaster(title: string, body: string) {
    const config = {
      ...this.config,
      status: this.successStatus,
    };

    this.toastrService.show(body, title, config);
  }

  showDangerToaster(title: string, body: string) {
    const config = {
      ...this.config,
      status: this.dangerStatus,
    };

    this.toastrService.show(body, title, config);
  }

  showError(err: HttpErrorResponse): Observable<any> {
    const { title, body } = errorHandler(err);
    this.showDangerToaster(title, body);
    return throwError(err);
  }
}
