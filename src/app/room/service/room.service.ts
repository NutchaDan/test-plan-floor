import { Injectable } from '@angular/core';
import { Room } from '../room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor() { }

  findRoomById(rooms: Room[], id: string): Room | undefined {
    if (!Array.isArray(rooms) || !id) {
      console.error('Invalid input parameters');
      return undefined;
    }
    return rooms.find((r) => r.id === id);
  }

}
