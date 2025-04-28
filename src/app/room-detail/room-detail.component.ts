import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../room/service/room.service';
import { RoomTypesService } from '../room/service/room-types.service';
import { Room } from '../room/room.model';
import { RoomType } from '../room/room-type.model';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss'], // corrected typo: 'styleUrl' -> 'styleUrls'
})
export class RoomDetailComponent implements OnInit {
  roomId: string | undefined;
  room: Room | undefined;
  roomType: RoomType | undefined;
  rooms: Room[] = []; // Initialize empty rooms list

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private roomTypesService: RoomTypesService
  ) {}

  ngOnInit(): void {
    // Fetch all rooms first (you can later replace this with API call)
    this.loadRooms();

    // Subscribe to route params
    this.route.params.subscribe((params) => {
      this.roomId = params['id'];

      if (this.roomId && this.rooms.length > 0) {
        const roomData = this.roomService.findRoomById(this.rooms, this.roomId);

        if (roomData) {
          this.room = roomData;
          this.roomType = this.roomTypesService.getRoomTypeById(roomData.typeId);
        } else {
          console.error('Room not found!');
        }
      }
    });
  }

  loadRooms(): void {
    // ⚡ Here, you should fetch rooms
    // For example: this.roomService.getRooms().subscribe(rooms => this.rooms = rooms);

    // 🛠 Temporary mock data for now (you should replace with real API later)
  }
}
