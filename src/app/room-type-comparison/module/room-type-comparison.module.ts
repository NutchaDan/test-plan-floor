import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RoomTypeComparisonComponent } from '../room-type-comparison.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RoomTypeComparisonComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [RoomTypeComparisonComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    CurrencyPipe,
  ],
  exports: [RouterModule]
})
export class RoomTypeComparisonModule {}
