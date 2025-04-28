import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomNumberPipe } from './pipes/room-number.pipe';
import { SizeFormatPipe } from './pipes/size-format.pipe';

@NgModule({
  declarations: [RoomNumberPipe, SizeFormatPipe],
  imports: [CommonModule],
  exports: [RoomNumberPipe, SizeFormatPipe],
})
export class SharedModule {}
