import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbTagComponent, NbTagInputDirective } from '@nebular/theme';
import { lastValueFrom, Observable, of } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { BehaviorSubjectService } from '../../shared/services/behavior-subject.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {
  // @ts-ignore
  @ViewChild(NbTagInputDirective, { read: ElementRef }) tagInput: ElementRef<HTMLInputElement>;
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
  optionsTags: {[k:string]: string[]};

  reportType: string = 'feedback';

  //TODO change type
  city: any = [];
  cityInfo: any;
  mappedCityInfo: any = {};
  selectedCity: any;
  filteredCityOptions$: Observable<string[]>;

  institution: string[];
  filteredInstitutionOptions$: Observable<string[]>;

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

  constructor(
    private router: Router,
    private apiService: ApiService,
    private behaviourService: BehaviorSubjectService,
  ) { }

  async ngOnInit(): Promise<void> {
    const { city: clientCity } = await lastValueFrom(of({ city: 'Krasnodar' }));
    this.cityInfo = await lastValueFrom(of({
      Krasnodar: {
        name: 'Краснодар',
        institution: ['Краснодар ул. Ставропольская'],
      },
      Anapa: {
        name: 'Анапа',
        institution: ['Анапа ул. Ставропольская'],
      }
    }));
    this.optionsTags = await lastValueFrom(of({
      complaint: ['3','2','1'],
      feedback: ['1','2','3'],
    }))

    for (const city in this.cityInfo) {
      this.city.push(this.cityInfo[city].name)
      if (clientCity) {
        this.selectedCity = this.cityInfo[clientCity];
        this.institution = this.cityInfo[clientCity].institution;
        this.filteredInstitutionOptions$ = of(this.institution);
        this.reportForm.patchValue({ city: this.cityInfo[clientCity].name });
      }
      this.mappedCityInfo[this.cityInfo[city].name] = this.cityInfo[city];
    }

    this.filteredCityOptions$ = of(this.city);

    this.reportForm.get('city')!.valueChanges.subscribe((city) => {
      //TODO change type
      this.selectedCity = this.mappedCityInfo[city];
      if (this.selectedCity) {
        this.filteredInstitutionOptions$ = of(this.selectedCity.institution);
        this.institution = this.selectedCity.institution;
      }
      this.filteredCityOptions$ = of(this.city.filter((value: any) => {
        const filterValue = city.toLowerCase();
        return value.toLowerCase().includes(filterValue);
      }))
    });

    this.reportForm.get('institution')!.valueChanges.subscribe((institution) => {
      this.filteredInstitutionOptions$ = of(this.institution.filter(value => {
        const filterValue = institution.toLowerCase();
        return value.toLowerCase().includes(filterValue);
      }))
    });

    this.reportForm.get('reportType')!.valueChanges.subscribe((tags) => {
      this.tags.clear();
    })
  }

  onTagRemove(tagToRemove: NbTagComponent, tagsBlock: string): void {
    this.tags.delete(tagToRemove.text);
    this.optionsTags[tagsBlock].push(tagToRemove.text);
  }

  onTagAdd(value: string, tagsBlock: string): void {
    if (value && this.optionsTags[tagsBlock].includes(value)) {
      this.tags.add(value);
      this.optionsTags[tagsBlock] = this.optionsTags[tagsBlock].filter(o => o !== value);
    }
    this.tagInput.nativeElement.value = '';
  }

  onSubmit(): void {
    this.reportForm.patchValue({ tags: [...this.tags]})
    this.behaviourService.selectRequest(this.reportForm.value);
    console.log(this.reportForm.value);
    this.router.navigate(['/email-verify'], {
      queryParams: { email: this.reportForm.value.email },
    }).then();
  }

  getStatus(controlName: string): string {
    const formControl = this.reportForm.get(controlName)!;

    if (controlName === 'tags') {
      if (this.tags.size < 1) {
        return 'danger';
      } else {
        return 'success';
      }
    }

    if (formControl.valid) {
      return 'success';
    } else if (formControl.value === '') {
      return 'basic';
    } else {
      return 'danger';
    }
  }
}
