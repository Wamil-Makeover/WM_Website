import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { Menu } from '../models/wamil-makeover-model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})


export class SideNavComponent implements OnDestroy {
  visibleSideMenu: boolean=false;

  isAddEditMachineType: boolean = false;
  isAddEditMachines: boolean = false;
  isAddEditTasksFrequency: boolean = false;
  isAddEditScheduleTasks: boolean = false;
  isAddEditUsers: boolean = false;
  isViewReport: boolean = false;
  isViewLoginUserNameAutoCreation: boolean = false;
  isViewFacilityMaster: boolean = false;
  isViewFluids: boolean = false;
  isViewMeasureMaster: boolean = false;
  isViewMeasure: boolean = false;
  reportactive!: string;
  currentURL!: string;
  Home: any;
  MachineType: any;
  Machines: any;
  Tasks: any;
  Measures: any;
  UserManagement: any;
  Report: any;
  Dashboard: any;
  TaskHistory: any;
  CompanyMaster: any;
  CompanyGroup: any;
  Company: any;
  Facilities: any;
  Fluid: any;
  Manufacturer: any;
  Fluids: any;
  ManufacturerConcentrationValues: any;
  isViewCompanyMaster: boolean = false;
  isViewTestMaster: boolean = false;
  isViewProductMaster: boolean = false;
  expanded: boolean=false;

  expandedMenu = {
      "BridalMakeup": false,
      "HairStyling": false,
      "SareeDraping": false,
  }
  public onSideNavChange: boolean = true;
  public sideNavState: boolean = false;
  public linkText: boolean = false;
  public toolTipDisable: boolean = true;

  constructor(public router: Router, changeDetectorRef: ChangeDetectorRef,
       private commonService: CommonService, private _activatedRoute: ActivatedRoute) {

      // this.commonService.reportactive.asObservable().subscribe((res) => {
      //     this.reportactive = res;
      // });
      this.commonService.sideNavState$.subscribe(res => {
          this.onSideNavChange = res;
      });
      
      // this.commonService.$toggle.subscribe(val => {
      //     this.visibleSideMenu = val;
      // });

      this.router.events.subscribe(
          (event: any) => {
              if (event instanceof NavigationEnd) {
                  this.currentURL = this.router.url;
                  if (this.currentURL.toLowerCase().indexOf('tasks') != -1) {
                      this.expandedMenu["SareeDraping"] = false;
                      this.expandedMenu["HairStyling"] = false;
                      this.expandedMenu["SareeDraping"] = false;
                  } else if (this.currentURL.toLowerCase().indexOf('report') != -1) {
                    this.expandedMenu["SareeDraping"] = false;
                    this.expandedMenu["HairStyling"] = false;
                    this.expandedMenu["SareeDraping"] = false;
                  } 
              }
          }
      );
  }

  clicked: boolean = false;

  expandSubmenu(name:Menu) {
      if (this.expandedMenu[name] != true) {
          this.expandedMenu[name] = true;

          this.sideNavState = false;
          setTimeout(() => {
              this.toolTipDisable = !this.sideNavState;
              this.linkText = this.sideNavState;
          }, 200)
          this.commonService.sideNavState$.next(this.sideNavState);

      } else {
          this.expandedMenu[name] = false;
          this.clicked = false;
      }
  }


  ngOnInit() {
      // if (this.userid != undefined && this.userid != "0" && this.userid != "") {
      //     this.GetUserPageAuthenticationDetails(this.userid);
      // }
  }

  ngOnDestroy(): void {
  }

  // Sidenav overlay fn
  backdropClick() {
      this.commonService.setToggle(!this.visibleSideMenu);
  }

  // Sidenav inner arrow fn
  onSinenavToggle() {
      this.sideNavState = !this.sideNavState
      this.toolTipDisable = this.sideNavState;
      this.expandedMenu.BridalMakeup = false;
      this.expandedMenu.HairStyling = false;
      this.expandedMenu.SareeDraping = false;
      setTimeout(() => {
          this.toolTipDisable = !this.sideNavState;
          this.linkText = this.sideNavState;
      }, 200)
      this.commonService.sideNavState$.next(this.sideNavState);
  }

  Companyevent() {
      //this.commonService.setgroupCompanyId(null);
  }


}
