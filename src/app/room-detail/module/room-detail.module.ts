import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomDetailComponent } from '../room-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: 'type/:id',
    component: RoomDetailComponent,
    pathMatch: 'full'
  },
  {
    path: 'room/:id',
    component: RoomDetailComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [RoomDetailComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
  ],
  exports: [RouterModule]
})
export class RoomDetailModule { }
