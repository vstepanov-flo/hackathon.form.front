import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailApprovalComponent } from './components/email-approval/email-approval.component';
import { ReportFormComponent } from './components/report-form/report-form.component';

const routes: Routes = [
  { path: '', component: ReportFormComponent },
  { path: 'email-verify', component: EmailApprovalComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
