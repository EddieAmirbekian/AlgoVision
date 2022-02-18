import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AvRoutingModule } from './av-routing.module';
import { AvComponent } from './av.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [AvComponent],
  imports: [
    AvRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ComponentsModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AvComponent],
})
export class AvModule {}
