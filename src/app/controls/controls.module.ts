import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvNavComponent } from './av-nav/av-nav.component';
import { MaterialModule } from '../material/material.module';
import { ActionService } from '../services/action.service';
import { AvGridComponent } from './av-grid/av-grid.component';
import { AvSorterComponent } from './av-sorter/av-sorter.component';
import { AlgorithmService } from '../services/algorithm.service';
import { SortingService } from '../services/sorting.service';

@NgModule({
  declarations: [AvNavComponent, AvGridComponent, AvSorterComponent],
  imports: [CommonModule, MaterialModule],
  exports: [AvNavComponent, AvGridComponent, AvSorterComponent],
  providers: [ActionService, AlgorithmService, SortingService],
})
export class ControlsModule {}
