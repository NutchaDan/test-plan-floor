import { Component, OnInit } from '@angular/core';
import { RoomTypesService } from '../room/service/room-types.service';
import { RoomType } from '../room/room-type.model';
import { RoomComparison } from './room-comparison.model';

@Component({
  selector: 'app-room-type-comparison',
  templateUrl: './room-type-comparison.component.html',
  styleUrls: ['./room-type-comparison.component.scss'],
})
export class RoomTypeComparisonComponent implements OnInit {
  maxSelection = 3;
  selectedTypes: (string | null)[] = [];
  showSelectionDialog = false;
  currentSlotIndex = 0;

  allRoomTypes: RoomType[] = [];
  comparisonData: RoomComparison | null = null;

  constructor(private roomTypesService: RoomTypesService) {}

  ngOnInit(): void {
    // Initialize with empty selection
    this.selectedTypes = new Array(this.maxSelection).fill(null);

    // Load room types from service
    this.allRoomTypes = this.roomTypesService.getRoomTypes();
  }

  openRoomSelectionDialog(slotIndex: number): void {
    this.currentSlotIndex = slotIndex;
    this.showSelectionDialog = true;
  }

  closeDialog(): void {
    this.showSelectionDialog = false;
  }

  selectRoomType(typeId: string): void {
    // Only select if not already selected in another slot
    if (
      !this.isAlreadySelected(typeId) ||
      this.selectedTypes[this.currentSlotIndex] === typeId
    ) {
      this.selectedTypes[this.currentSlotIndex] = typeId;
      this.updateComparisonData();
      this.closeDialog();
    }
  }

  removeRoomType(index: number, event: Event): void {
    event.stopPropagation(); // Prevent opening selection dialog
    this.selectedTypes[index] = null;
    this.updateComparisonData();
  }

  updateComparisonData(): void {
    // Filter out null values and get active selected types
    const activeTypeIds = this.selectedTypes.filter(
      (id) => id !== null
    ) as string[];

    if (activeTypeIds.length > 0) {
      this.comparisonData =
        this.roomTypesService.getComparisonData(activeTypeIds);
    } else {
      this.comparisonData = null;
    }
  }

  isAlreadySelected(typeId: string): boolean {
    return this.selectedTypes.includes(typeId);
  }

  hasSelectedRooms(): boolean {
    return this.selectedTypes.some((type) => type !== null);
  }

  getTypeName(typeId: string): string {
    const roomType = this.getRoomType(typeId);
    return roomType ? roomType.name : '';
  }

  getRoomType(typeId: string | null): RoomType | undefined {
    if (!typeId) return undefined;
    return this.roomTypesService.getRoomTypeById(typeId);
  }

  // Helper method to get the value for a specific room type and feature
  getFeatureValue(featureName: string, typeId: string | null): any {
    if (!typeId || !this.comparisonData) return '';

    // Check base specs
    const baseSpec = this.comparisonData.baseSpecs.find(
      (spec) => spec.name === featureName
    );
    if (baseSpec && baseSpec.values[typeId] !== undefined) {
      return baseSpec.values[typeId];
    }

    // Check features
    const feature = this.comparisonData.features.find(
      (f) => f.name === featureName
    );
    if (feature && feature.values[typeId] !== undefined) {
      return feature.values[typeId];
    }

    return '';
  }

  // Check if a room type has a specific feature
  hasFeature(featureName: string, typeId: string | null): boolean {
    if (!typeId || !this.comparisonData) return false;

    const feature = this.comparisonData.features.find(
      (f) => f.name === featureName
    );
    return feature?.values[typeId] === true;
  }
}
