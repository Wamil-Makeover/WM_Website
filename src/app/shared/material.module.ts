import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],
  exports:[
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatTooltipModule,
    MatIconModule
  ]
})
export class MaterialModule { }
