import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvNavComponent } from './av-nav/av-nav.component';
import { MaterialModule } from './material.module';
import { ActionService } from '../services/action.service';
import { AlgorithmService } from '../services/algorithm.service';
import { SortingService } from '../services/sorting.service';
import { GridService } from '../services/grid.service';
import { RouterModule } from '@angular/router';
import { AvPathfinderModule } from './av-pathfinder/av-pathfinder.module';
import { AvSorterModule } from './av-sorter/av-sorter.module';
import { AvMstModule } from './av-mst/av-mst.module';

@NgModule({
  declarations: [AvNavComponent],
  imports: [
    AvMstModule,
    AvPathfinderModule,
    AvSorterModule,
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [AvMstModule, AvNavComponent, AvPathfinderModule, AvSorterModule],
  providers: [ActionService, AlgorithmService, GridService, SortingService],
})
export class ComponentsModule {}
