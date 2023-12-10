import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BridalMakeoverComponent } from './bridal-makeover/bridal-makeover.component';
import { HairStylingComponent } from './hair-styling/hair-styling.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { SareeDrapingComponent } from './saree-draping/saree-draping.component';


@NgModule({
  declarations: [
    LandingComponent,
    SideNavComponent,
    AppComponent,
    BridalMakeoverComponent,
    HairStylingComponent,
    SplashScreenComponent,
    SareeDrapingComponent
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
  providers: [NgxSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
