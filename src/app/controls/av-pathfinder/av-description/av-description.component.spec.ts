import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvDescriptionComponent } from './av-description.component';

describe('AvDescriptionComponent', () => {
  let component: AvDescriptionComponent;
  let fixture: ComponentFixture<AvDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
