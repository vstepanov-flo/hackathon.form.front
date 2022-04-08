import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbTagComponent, NbTagInputDirective } from '@nebular/theme';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {

  fields: string[] = [
    'email',
    'city',
    'institution',
    'reportType',
    'tags',
    'name',
    'surname',
    'patronymic',
    'reportText',
    'file',
  ];

  tags: Set<string> = new Set<string>();
  options: {[k:string]: string[]} = {
    complaint: this.fields,
    feedback: ['1','2','3'],
  }

  reportType: string = 'feedback';

  // @ts-ignore
  @ViewChild(NbTagInputDirective, { read: ElementRef }) tagInput: ElementRef<HTMLInputElement>;

  public reportForm: FormGroup = new FormGroup({
    email: new FormControl('',  [Validators.required, Validators.email]),
    city: new FormControl('',  [Validators.required]),
    institution: new FormControl('',  [Validators.required]),
    reportType: new FormControl('',  [Validators.required]),
    tags: new FormControl('',  []),
    name: new FormControl('',  [Validators.required]),
    surname: new FormControl('',  [Validators.required]),
    patronymic: new FormControl('',  []),
    reportText: new FormControl('',  [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(2048)]),
    file: new FormControl('',  []),
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onTagRemove(tagToRemove: NbTagComponent, tagsBlock: string): void {
    this.tags.delete(tagToRemove.text);
    this.options[tagsBlock].push(tagToRemove.text);
  }

  onTagAdd(value: string, tagsBlock: string): void {
    if (value && this.options[tagsBlock].includes(value)) {
      this.tags.add(value);
      this.options[tagsBlock] = this.options[tagsBlock].filter(o => o !== value);
    }
    this.tagInput.nativeElement.value = '';
  }

  onSubmit(): void {
    this.reportForm.patchValue({ tags: [...this.tags]})
    console.log(this.reportForm.value);
    this.router.navigate(['/email-verify']).then();
  }

}
