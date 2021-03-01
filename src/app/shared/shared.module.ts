import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutofocusDirective } from './directives/auto-focus.directive';
import { ClickStopPropagation } from './directives/stop-propagation.directive';
import { MaterialModule } from '../core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumericDirective } from './directives/numeric.directive';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    MaterialModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AutofocusDirective,
    ClickStopPropagation,
    NumericDirective,
  ],
  exports: [
    NgxSpinnerModule,
    AutofocusDirective,
    ClickStopPropagation,
    NumericDirective,
    MaterialModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class SharedModule { }
