import { Injectable } from '@angular/core';
import { statusColors } from '../constants/room-status-colors.const';
import { RoomStatus } from '../../room/room-status.enum';

@Injectable({ providedIn: 'root' })
export class RoomHelperService {
  getStatusColor(status: RoomStatus): string {
    return statusColors[status] || '#ccc';
  }

  extractRoomNumber(roomId: string): string {
    const match = roomId.match(/\d+/);
    return match?.[0] || roomId;
  }

  getStatusEntries(): Array<[RoomStatus, string]> {
    return Object.entries(statusColors) as Array<[RoomStatus, string]>;
  }
}
