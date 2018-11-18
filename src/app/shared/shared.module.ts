import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadrComponent } from './loadr/loadr.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule

  ],
  declarations: [LoadrComponent],
  exports: [
    LoadrComponent,
    CommonModule
  ]

})
export class SharedModule { }
