import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AvPathfinderComponent} from './controls/av-pathfinder/av-pathfinder.component';
import {AvSorterComponent} from './controls/av-sorter/av-sorter.component';
import {AvMstComponent} from './controls/av-mst/av-mst.component';

const routes: Routes = [
  {path: '', component: AvPathfinderComponent},
  {path: 'pathfinder', component: AvPathfinderComponent},
  {path: 'sorter', component: AvSorterComponent},
  {path: 'mst', component: AvMstComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
