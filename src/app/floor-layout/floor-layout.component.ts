import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Room, RoomWithTypeInfo } from '../room/room.model';
import { RoomType } from '../room/room-type.model';
import { BuildingService } from '../building-selector/service/building.service';
import { RoomTypesService } from '../room/service/room-types.service';
import { RoomService } from '../room/service/room.service';
import { FloorLayoutService } from './service/floor-layout.service';
import { RoomHelperService } from '../shared/services/room-helper.service';
import { statusColors } from '../shared/constants/room-status-colors.const';
import { RoomStatus } from '../room/room-status.enum';

@Component({
  selector: 'app-floor-layout',
  templateUrl: './floor-layout.component.html',
  styleUrls: ['./floor-layout.component.scss'],
})
export class FloorLayoutComponent implements OnInit {
  @Input() selectedBuilding: number | null = null;
  @Input() selectedFloor: number | null = null;

  htmlContent: SafeHtml | null = null;
  errorMessage: string | null = null;
  isLoading = false;
  rooms: Room[] = [];
  selectedRoom: Room | null = null;
  selectedRoomType: RoomType | undefined;
  statusColors = statusColors;

  constructor(
    private sanitizer: DomSanitizer,
    private buildingService: BuildingService,
    private http: HttpClient,
    private elementRef: ElementRef,
    private roomService: RoomService,
    private roomTypesService: RoomTypesService,
    private floorLayoutService: FloorLayoutService,
    private roomHelper: RoomHelperService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.selectedBuilding !== null && this.selectedFloor !== null) {
      this.loadFloorPlanAndRooms();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['selectedBuilding'] || changes['selectedFloor']) &&
      this.selectedBuilding !== null &&
      this.selectedFloor !== null
    ) {
      this.loadFloorPlanAndRooms();
    }
  }

  private loadFloorPlanAndRooms(): void {
    this.loadRooms();
    this.loadFloorPlan();
  }

  private loadRooms(): void {
    if (this.selectedBuilding === null || this.selectedFloor === null) {
      this.rooms = [];
      return;
    }

    const roomsData = this.buildingService.getRoomsForBuildingAndFloor(
      this.selectedBuilding,
      this.selectedFloor
    );
    this.rooms = roomsData || [];
  }

  private loadFloorPlan(): void {
    if (!this.selectedBuilding || !this.selectedFloor) {
      this.handleLoadError('Please select both a building and a floor');
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.selectedRoom = null;

    const filePath = this.buildingService.getFloorPath(
      this.selectedBuilding,
      this.selectedFloor
    );

    this.http.get(filePath, { responseType: 'text' }).subscribe({
      next: (html: string) => this.handleFloorPlanSuccess(html),
      error: (err) => this.handleLoadError('Failed to load floor plan', err),
    });
  }

  private handleFloorPlanSuccess(html: string): void {
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
    this.isLoading = false;
    this.processLoadedFloorPlan();
  }

  private handleLoadError(message: string, error?: any): void {
    console.error('Floor plan loading error:', error);
    this.errorMessage = message;
    this.htmlContent = null;
    this.isLoading = false;
  }

  private processLoadedFloorPlan(): void {
    setTimeout(() => {
      const container =
        this.elementRef.nativeElement.querySelector('.svg-container');

      if (container) {
        // First apply colors
        this.floorLayoutService.applyRoomColors(container, this.rooms);

        // Then set up interactions
        this.setupRoomInteractions(container);

        // Force Angular to detect changes
        this.cdr.detectChanges();
      }
    }, 300);
  }

  private setupRoomInteractions(container: Element): void {
    const svgElement = container.querySelector('svg');
    if (!svgElement) return;

    svgElement.querySelectorAll('[data-room-id]').forEach((el) => {
      el.addEventListener('click', (event) => {
        const roomId = (event.target as HTMLElement).getAttribute(
          'data-room-id'
        );
        if (roomId) this.selectRoom(roomId);
      });
    });
  }

  selectRoom(roomId: string): void {
    const room = this.roomService.findRoomById(this.rooms, roomId);
    if (!room) {
      return;
    }

    this.selectedRoom = room;
    this.selectedRoomType = this.roomTypesService.getRoomTypeById(room.typeId);

    const container =
      this.elementRef.nativeElement.querySelector('.svg-container');
    if (container) {
      this.floorLayoutService.highlightRoom(container, roomId, this.rooms);
    }
  }

  getRoomTypeInfo(room: Room): RoomWithTypeInfo | null {
    const roomType = this.roomTypesService.getRoomTypeById(room.typeId);
    if (!roomType) return null;

    return {
      ...roomType,
      ...room,
      name: roomType.name,
      starterPrice: roomType.starterPrice,
      price: room.price,
      imageUrl: room.imageUrl?.length ? room.imageUrl : roomType.imageUrl || [],
      virtualTourOverrideUrl:
        room.virtualTourOverrideUrl || roomType.virtualTourUrl,
    };
  }

  closeRoomDetails(): void {
    this.selectedRoom = null;
    this.selectedRoomType = undefined;
  }

  get statusEntries(): Array<[RoomStatus, string]> {
    return this.roomHelper.getStatusEntries();
  }
}
