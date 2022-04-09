import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbTagComponent, NbTagInputDirective } from '@nebular/theme';
import { lastValueFrom, Observable, of } from 'rxjs';
import { UnsubscribeComponent } from '../../shared/components/unsubscribe/unsubscribe.component';
import { ApiService } from '../../shared/services/api.service';
import { BehaviorSubjectService } from '../../shared/services/behavior-subject.service';
import { FormGroupsService } from '../../shared/services/form-groups.service';

export type OptionsTags = {
  [k: string]: string[];
};

export type ApplicationType = 'complaint' | 'gratitude' | 'suggestion' | 'question';

export interface CitiesInfo {
  [k: string]: CityInfo;
}

export interface CityInfo {
  name: string;
  institution: string[];
}

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent extends UnsubscribeComponent implements OnInit {

  @ViewChild(NbTagInputDirective, { read: ElementRef }) tagInput: ElementRef<HTMLInputElement>;
  tags: Set<string> = new Set<string>();
  optionsTags: OptionsTags;

  selectedApplicationType: ApplicationType = 'complaint';

  city: string[] = [];
  mappedCitiesInfo: CitiesInfo = {};
  selectedCity: CityInfo;
  filteredCitiesOptions$: Observable<string[]>;

  institution: string[];
  filteredInstitutionsOptions$: Observable<string[]>;

  formFile: File;

  public applicationForm: FormGroup

  constructor(
    private router: Router,
    private apiService: ApiService,
    private behaviourService: BehaviorSubjectService,
    private formGroupService: FormGroupsService,
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    const { city: clientCity } = await lastValueFrom(of({ city: 'Krasnodar' }));
    const citiesInfo: CitiesInfo = await lastValueFrom(of({
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
    }))

    for (const city in citiesInfo) {
      this.city.push(citiesInfo[city].name)
      if (clientCity) {
        this.selectedCity = citiesInfo[clientCity];
        this.institution = citiesInfo[clientCity].institution;
        this.filteredInstitutionsOptions$ = of(this.institution);
        this.applicationForm.patchValue({ city: citiesInfo[clientCity].name });
      }
      this.mappedCitiesInfo[citiesInfo[city].name] = citiesInfo[city];
    }

    this.filteredCitiesOptions$ = of(this.city);

    this.applicationForm.get('city')!.valueChanges.subscribe((city) => {
      //TODO change type
      this.selectedCity = this.mappedCitiesInfo[city];
      if (this.selectedCity) {
        this.filteredInstitutionsOptions$ = of(this.selectedCity.institution);
        this.institution = this.selectedCity.institution;
      }
      this.filteredCitiesOptions$ = of(this.city.filter((value: any) => {
        const filterValue = city.toLowerCase();
        return value.toLowerCase().includes(filterValue);
      }))
    });

    this.applicationForm.get('institution')!.valueChanges.subscribe((institution) => {
      this.filteredInstitutionsOptions$ = of(this.institution.filter(value => {
        const filterValue = institution.toLowerCase();
        return value.toLowerCase().includes(filterValue);
      }))
    });

    this.applicationForm.get('applicationType')!.valueChanges.subscribe((tags) => {
      this.tags.clear();
    })
  }

  onTagRemove(tagToRemove: NbTagComponent, tagsBlock: ApplicationType): void {
    this.tags.delete(tagToRemove.text);
    // this.optionsTags[tagsBlock].push(tagToRemove.text);
  }

  onTagAdd(value: string, tagsBlock: ApplicationType): void {
    if (value && this.optionsTags[tagsBlock].includes(value)) {
      this.tags.add(value);
      this.applicationForm.patchValue({ tags: [...this.tags]})
      // this.optionsTags[tagsBlock] = this.optionsTags[tagsBlock].filter(o => o !== value);
    }
    this.tagInput.nativeElement.value = '';
  }

  onFileChange(event: any): void {
    event.preventDefault();

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formFile = file;
      this.applicationForm.patchValue({
        file: file.name,
      });
    }
  }

  onSubmit(): void {
    if (this.applicationForm.get('tags')) {
      this.applicationForm.patchValue({ tags: [...this.tags]})
    }
    if (this.applicationForm.get('file')) {
      this.behaviourService.selectFile(this.formFile);
    }
    this.behaviourService.selectApplicationForm(this.applicationForm.value);
    this.router.navigate(['/email-verify'], {
      queryParams: { email: this.applicationForm.value.email },
    }).then();
  }

  getStatus(controlName: string): string {
    const formControl = this.applicationForm.get(controlName)!;

    if (controlName === 'tags') {
      if (this.tags.size < 1 || this.tags.size > 5) {
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

  public getFormGroup(applicationType: ApplicationType): FormGroup {
    this.applicationForm = this.formGroupService.getFormGroup(applicationType);
    return this.applicationForm;
  }

  public isValidForm(applicationType: ApplicationType): boolean {
    if (applicationType === 'complaint') {
      return this.applicationForm.invalid || this.tags.size < 1 || this.tags.size > 5;
    }
    return this.applicationForm.invalid;
  }
}
