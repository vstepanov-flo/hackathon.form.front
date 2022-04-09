import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { ToastrService } from '../../shared/services/toastr.service';

@Component({
  selector: 'app-email-approval',
  templateUrl: './email-approval.component.html',
  styleUrls: ['./email-approval.component.scss'],
})
export class EmailApprovalComponent implements OnInit {

  public emailVerifyForm: FormGroup = new FormGroup({
    code: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6)]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    const email = this.route.snapshot.queryParamMap.get('email')!;
    this.apiService.getCodeForEmailVerify(
      email
    )
      .subscribe();
  }

  onSendCode(): void {
    const code = this.emailVerifyForm.value.code;
    this.apiService.sendVerifyCode(code)
      .pipe(
        tap(() => {
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
