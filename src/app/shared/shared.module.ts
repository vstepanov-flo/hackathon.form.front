import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbToastrModule } from '@nebular/theme';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NbToastrModule.forRoot(),
  ],
  exports: [
  ],
})
export class SharedModule { }
