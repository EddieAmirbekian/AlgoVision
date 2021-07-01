import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import { AvPathfinderComponent } from './av-pathfinder.component';
import {AvGridComponent} from './av-grid/av-grid.component';
import { AvDescriptionComponent } from './av-description/av-description.component';



@NgModule({
  declarations: [
    AvGridComponent,
    AvPathfinderComponent,
    AvDescriptionComponent
  ],
  exports: [
    AvPathfinderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AvPathfinderModule { }
