import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AvNavComponent } from './av-nav.component';
import { MaterialModule } from 'src/app/material/material.module';

describe('AvNavComponent', () => {
  let component: AvNavComponent;
  let fixture: ComponentFixture<AvNavComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AvNavComponent],
        imports: [NoopAnimationsModule, LayoutModule, MaterialModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AvNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
