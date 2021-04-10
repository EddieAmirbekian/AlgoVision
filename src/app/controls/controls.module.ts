import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvNavComponent } from './av-nav/av-nav.component';
import { MaterialModule } from '../material/material.module';
import { ActionService } from '../services/action.service';

@NgModule({
  declarations: [AvNavComponent],
  imports: [CommonModule, MaterialModule],
  exports: [AvNavComponent],
  providers: [ActionService],
})
export class ControlsModule {}
