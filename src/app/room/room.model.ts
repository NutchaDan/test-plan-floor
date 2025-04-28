import { RoomStatus } from './room-status.enum';
import { RoomType } from './room-type.model';

export interface Room {
  id: string;
  typeId: string; // References a RoomType id
  status: RoomStatus;
  price: number; // Actual price of this specific room (can differ from starter price)
  imageUrl: string[] | null;
  virtualTourOverrideUrl?: string;
}

export type RoomWithTypeInfo = RoomType & {
  id: string;
  typeId: string;
  status: RoomStatus;
  price: number;
  imageUrl: string[] | null;
  virtualTourOverrideUrl?: string;
}
