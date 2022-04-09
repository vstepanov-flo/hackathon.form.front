import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailApprovalComponent } from './components/email-approval/email-approval.component';
import { ApplicationFormComponent } from './components/report-form/application-form.component';
import { SuccessPageComponent } from './components/success-page/success-page.component';

const routes: Routes = [
  { path: '', component: ApplicationFormComponent },
  { path: 'email-verify', component: EmailApprovalComponent },
  { path: 'success', component: SuccessPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
