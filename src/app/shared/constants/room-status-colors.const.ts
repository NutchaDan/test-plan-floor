import { RoomStatus } from "../../room/room-status.enum";

export const statusColors: Record<RoomStatus, string> = {
  [RoomStatus.Available]: '#90EE90', // Light green
  [RoomStatus.Occupied]: '#FFA07A',  // Light salmon
} as const;

export type StatusColors = typeof statusColors;
