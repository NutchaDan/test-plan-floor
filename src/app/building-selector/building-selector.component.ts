import { Component } from '@angular/core';
import { BuildingService } from './service/building.service';
import { Building } from './building.model';

@Component({
  selector: 'app-building-selector',
  templateUrl: './building-selector.component.html',
  styleUrl: './building-selector.component.scss'
})
export class BuildingSelectorComponent {

  buildings: Building[] = [];
  selectedBuilding: Building | null = null;
  selectedFloor: number | null = null;

  constructor(private buildingService: BuildingService) {}

  ngOnInit() {
    this.buildings = this.buildingService.getAllBuildings();

    if (this.buildings.length > 0) {
      this.selectBuilding(this.buildings[0]);
    }
  }

  selectBuilding(building: Building) {
    this.selectedBuilding = building;
    this.selectedFloor = null;
    if (building.floors.length > 0) {
      this.selectFloor(building.floors[0]);
    }
  }

  selectFloor(floorNumber: number) {
    this.selectedFloor = floorNumber;
  }

}
