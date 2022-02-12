import {NgModule} from '@angular/core';
import {AvSorterComponent} from './av-sorter.component';
import {MaterialModule} from '../material.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [AvSorterComponent],
  exports: [AvSorterComponent]
})
export class AvSorterModule {
}
