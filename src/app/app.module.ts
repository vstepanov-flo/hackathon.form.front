import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbIconModule,
  NbFormFieldModule,
  NbInputModule,
  NbCardModule, NbSelectModule, NbTagModule, NbAutocompleteModule, NbButtonModule, NbCheckboxModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ApplicationFormComponent } from './components/report-form/application-form.component';
import { EmailApprovalComponent } from './components/email-approval/email-approval.component';
import { SuccessPageComponent } from './components/success-page/success-page.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationFormComponent,
    EmailApprovalComponent,
    SuccessPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbFormFieldModule,
    NbInputModule,
    ReactiveFormsModule,
    NbCardModule,
    NbSelectModule,
    NbTagModule,
    NbAutocompleteModule,
    NbButtonModule,
    SharedModule,
    NbCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
