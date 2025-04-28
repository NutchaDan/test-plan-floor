import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BuildingSelectorComponent } from '../building-selector.component';
import { FloorLayoutComponent } from '../../floor-layout/floor-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BuildingSelectorComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [BuildingSelectorComponent, FloorLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class BuildingSelectorModule {}
