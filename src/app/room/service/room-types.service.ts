import { Injectable } from '@angular/core';
import { RoomType, roomTypes } from '../room-type.model';
import {
  BooleanFeature,
  NumericFeature,
  RoomComparison,
} from '../../room-type-comparison/room-comparison.model';

@Injectable({
  providedIn: 'root',
})

export class RoomTypesService {
  constructor() {}

  getRoomTypes(): RoomType[] {
    return roomTypes;
  }

  getRoomTypeById(typeId: string): RoomType | undefined {
    return roomTypes.find((type) => type.id === typeId);
  }

  getComparisonData(selectedIds: string[]): RoomComparison {
    if (!Array.isArray(selectedIds) || selectedIds.length === 0) {
      throw new Error('selectedIds must be a non-empty array');
    }

    const selectedTypes = roomTypes.filter((type) =>
      selectedIds.includes(type.id)
    );

    // Base specifications - all numeric
    const baseSpecs: NumericFeature[] = [
      {
        name: 'Price',
        values: selectedTypes.reduce((acc, type) => {
          acc[type.id] = type.starterPrice;
          return acc;
        }, {} as { [key: string]: number }),
      },
      {
        name: 'Size',
        values: selectedTypes.reduce((acc, type) => {
          acc[type.id] = type.size;
          return acc;
        }, {} as { [key: string]: number }),
      },
      {
        name: 'Bedrooms',
        values: selectedTypes.reduce((acc, type) => {
          acc[type.id] = type.bedrooms;
          return acc;
        }, {} as { [key: string]: number }),
      },
      {
        name: 'Bathrooms',
        values: selectedTypes.reduce((acc, type) => {
          acc[type.id] = type.bathrooms;
          return acc;
        }, {} as { [key: string]: number }),
      },
      {
        name: 'Living Rooms',
        values: selectedTypes.reduce((acc, type) => {
          acc[type.id] = type.livingRooms;
          return acc;
        }, {} as { [key: string]: number }),
      },
      {
        name: 'Kitchens',
        values: selectedTypes.reduce((acc, type) => {
          acc[type.id] = type.kitchens;
          return acc;
        }, {} as { [key: string]: number }),
      },
    ];

    const allUniqueFeatures = new Set<string>();
    selectedTypes.forEach(type => {
      type.features.forEach(feature => allUniqueFeatures.add(feature));
    });

    // Special features - all boolean
    const featureComparisons: BooleanFeature[] = Array.from(
      allUniqueFeatures
    ).map((featureName) => {
      return {
        name: featureName,
        values: selectedTypes.reduce((acc, type) => {
          acc[type.id] = type.features.includes(featureName);
          return acc;
        }, {} as { [key: string]: boolean }),
      };
    });

    return {
      selectedTypes: selectedIds,
      baseSpecs,
      features: featureComparisons,
    };
  }
}
