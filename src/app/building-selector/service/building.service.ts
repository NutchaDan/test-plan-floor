import { Injectable } from '@angular/core';
import { Building } from '../building.model';
import { Room } from '../../room/room.model';
import { buildings } from '../building.model';

@Injectable({
  providedIn: 'root'
})

export class BuildingService {

  constructor() { }

  getAllBuildings(): Building[] {
    return buildings;
  }

  getBuildingById(id: number): Building | undefined {
    return buildings.find(building => building.id === id);
  }

  getFloorPath(buildingId: number, floorNumber: number): string {
    return `assets/html/building-${buildingId}/floor-${floorNumber}.html`;
  }

  getRoomsForBuildingAndFloor(buildingId: number, floorNumber: number): Room[] | undefined {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return undefined;

    // Find the key (as string) that matches the floorNumber
    const floorKey = Object.keys(building.rooms).find(
      key => Number(key) === floorNumber
    );

    if (!floorKey) return undefined;

    // Access with type safety
    return building.rooms[Number(floorKey)];
  }

}
