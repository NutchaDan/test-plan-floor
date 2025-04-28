import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'compare-rooms',
    loadChildren: () =>
      import('./room-type-comparison/module/room-type-comparison.module').then(
        (m) => m.RoomTypeComparisonModule
      ),
  },
  {
    path: 'plan-building',
    loadChildren: () =>
      import('./building-selector/module/building-selector.module').then(
        (m) => m.BuildingSelectorModule
      ),
  },
  {
    path: 'room-detail',
    loadChildren: () =>
      import('./room-detail/module/room-detail.module').then(
        (m) => m.RoomDetailModule
      ),
  },
  { path: '', redirectTo: 'plan-building', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
