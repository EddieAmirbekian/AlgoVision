import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AvPathfinderComponent } from './av-pathfinder.component';
import { AvGridComponent } from './av-grid/av-grid.component';
import { AvDescriptionComponent } from './av-description/av-description.component';
import { AvGridNodeComponent } from './av-grid-node/av-grid-node.component';

@NgModule({
  declarations: [
    AvGridComponent,
    AvPathfinderComponent,
    AvDescriptionComponent,
    AvGridNodeComponent,
    AvGridNodeComponent,
  ],
  exports: [AvDescriptionComponent, AvGridComponent, AvPathfinderComponent],
  imports: [CommonModule, MaterialModule],
})
export class AvPathfinderModule {}
