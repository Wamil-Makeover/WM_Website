import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BridalMakeoverComponent } from './bridal-makeover/bridal-makeover.component';


@NgModule({
  declarations: [
    LandingComponent,
    SideNavComponent,
    AppComponent,
    BridalMakeoverComponent
  ], 
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MaterialModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
