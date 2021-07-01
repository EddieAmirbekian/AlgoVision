import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { ControlsModule } from './controls/controls.module';
import {AvPathfinderModule} from './controls/av-pathfinder/av-pathfinder.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ControlsModule,
    AvPathfinderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
