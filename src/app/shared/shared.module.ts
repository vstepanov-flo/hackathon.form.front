import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbToastrModule } from '@nebular/theme';
import { FootnoteComponent } from './components/footnote/footnote.component';



@NgModule({
  declarations: [
    FootnoteComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NbToastrModule.forRoot(),
  ],
  exports: [
    FootnoteComponent
  ],
})
export class SharedModule { }
