import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvNavComponent } from './av-nav/av-nav.component';
import { MaterialModule } from './material.module';
import { ActionService } from '../services/action.service';
import { AvSorterComponent } from './av-sorter/av-sorter.component';
import { AlgorithmService } from '../services/algorithm.service';
import { SortingService } from '../services/sorting.service';
import {GridService} from '../services/grid.service';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [AvNavComponent, AvSorterComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [AvNavComponent, AvSorterComponent],
  providers: [ActionService, AlgorithmService, GridService, SortingService],
})
export class ControlsModule {}
