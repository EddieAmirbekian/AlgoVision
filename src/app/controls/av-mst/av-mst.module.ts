import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvMstComponent} from './av-mst.component';
import {MaterialModule} from '../material.module';
import {MstService} from '../../services/mst.service';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [AvMstComponent],
  exports: [AvMstComponent],
  providers: [MstService]
})
export class AvMstModule {}
