import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvSorterComponent } from './av-sorter.component';

describe('AvSorterComponent', () => {
  let component: AvSorterComponent;
  let fixture: ComponentFixture<AvSorterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvSorterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvSorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
