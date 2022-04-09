import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbToastrModule } from '@nebular/theme';
import { FootnoteComponent } from './components/footnote/footnote.component';



@NgModule({
  declarations: [
    FootnoteComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NbToastrModule.forRoot(),
    NbCardModule,
  ],
  exports: [
    FootnoteComponent,
  ],
})
export class SharedModule { }
