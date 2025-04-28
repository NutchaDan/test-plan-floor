import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypeComparisonComponent } from './room-type-comparison.component';

describe('RoomTypeComparisonComponent', () => {
  let component: RoomTypeComparisonComponent;
  let fixture: ComponentFixture<RoomTypeComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomTypeComparisonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomTypeComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
