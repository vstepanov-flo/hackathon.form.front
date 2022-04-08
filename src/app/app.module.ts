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
  NbCardModule, NbSelectModule, NbTagModule, NbAutocompleteModule, NbButtonModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ReportFormComponent } from './components/report-form/report-form.component';
import { EmailApprovalComponent } from './components/email-approval/email-approval.component';
import { SuccessPageComponent } from './components/success-page/success-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportFormComponent,
    EmailApprovalComponent,
    SuccessPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbFormFieldModule,
    NbInputModule,
    ReactiveFormsModule,
    NbCardModule,
    NbSelectModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbTagModule,
    NbAutocompleteModule,
    NbButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
