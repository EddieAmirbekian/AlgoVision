import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvPathfinderComponent } from './av-pathfinder.component';

describe('AvPathfinderComponent', () => {
  let component: AvPathfinderComponent;
  let fixture: ComponentFixture<AvPathfinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvPathfinderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvPathfinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
