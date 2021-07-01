import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvGridComponent } from './av-grid.component';

describe('AvGridComponent', () => {
  let component: AvGridComponent;
  let fixture: ComponentFixture<AvGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
