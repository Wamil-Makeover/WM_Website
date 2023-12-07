import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { BridalMakeoverComponent } from './bridal-makeover/bridal-makeover.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', redirectTo: 'home', pathMatch: 'full' },
  {
    path: "home",
    component: LandingComponent,
    pathMatch: "full",
    data: { roleType: ["Dashboard"] },
  },
  {
    path: "",
    component: SideNavComponent,
    children:[
      {
        path: "bridal-makeover",
        component: BridalMakeoverComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
