import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, lastValueFrom, of, takeUntil, tap } from 'rxjs';
import { UnsubscribeComponent } from '../../shared/components/unsubscribe/unsubscribe.component';
import { ApiService, ObjectType } from '../../shared/services/api.service';
import { BehaviorSubjectService } from '../../shared/services/behavior-subject.service';
import { ToastrService } from '../../shared/services/toastr.service';

@Component({
  selector: 'app-email-approval',
  templateUrl: './email-approval.component.html',
  styleUrls: ['./email-approval.component.scss'],
})
export class EmailApprovalComponent extends UnsubscribeComponent implements OnInit {

  public emailVerifyForm: FormGroup = new FormGroup({
    code: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6)]),
  });

  private form: ObjectType;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastrService: ToastrService,
    private behaviourSubject: BehaviorSubjectService,
  ) {
    super();
  }

  ngOnInit(): void {
    const email = this.route.snapshot.queryParamMap.get('email')!;
    this.apiService.getCodeForEmailVerify(
      email
    ).subscribe();

    this.behaviourSubject.selectedRequests
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((form) => {
        this.form = form;
      })
  }

  onSendCode(): void {
    const code = this.emailVerifyForm.value.code;
    this.apiService.sendVerifyCode(code)
      .pipe(
        tap(async () => {
          // await lastValueFrom(this.apiService.sendReport())
          lastValueFrom(this.apiService.sendReport(this.form)).then();
          this.router.navigate(['/success']).then();
        }),
        catchError((error) => {
          this.toastrService.showError(error);
          return of(error);
        })
      )
      .subscribe()
  }
}
