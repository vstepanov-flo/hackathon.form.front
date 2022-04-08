import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() {
  }

  ngOnInit(): void {
  }

  onSendCode(): void {

  }
}
