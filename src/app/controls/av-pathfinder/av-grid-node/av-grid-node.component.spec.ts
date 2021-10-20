import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvGridNodeComponent } from './av-grid-node.component';

describe('AvGridNodeComponent', () => {
  let component: AvGridNodeComponent;
  let fixture: ComponentFixture<AvGridNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvGridNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvGridNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
