import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roomNumber'
})

export class RoomNumberPipe implements PipeTransform {
  transform(roomId: string): string {
    return roomId.split('-')[1] || roomId;
  }
}
