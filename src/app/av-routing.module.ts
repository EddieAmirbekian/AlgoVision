import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvPathfinderComponent } from './components/av-pathfinder/av-pathfinder.component';
import { AvSorterComponent } from './components/av-sorter/av-sorter.component';
import { AvMstComponent } from './components/av-mst/av-mst.component';

const routes: Routes = [
  { path: '', component: AvPathfinderComponent },
  { path: 'pathfinder', component: AvPathfinderComponent },
  { path: 'sorter', component: AvSorterComponent },
  { path: 'mst', component: AvMstComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AvRoutingModule {}
