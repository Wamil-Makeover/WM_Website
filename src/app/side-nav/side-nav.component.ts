import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { Menu } from '../models/wamil-makeover-model';
import { environment } from 'src/environments/environment';
import { onMainContentChange, onSideNavChange, animateText, indicatorRotate } from '../Animation/animation';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  animations: [onMainContentChange, onSideNavChange, animateText, indicatorRotate]
})


export class SideNavComponent implements OnDestroy {
  visibleSideMenu: boolean=false;
  mobileQuery: MediaQueryList;
  expanded: boolean=false;
  baseUrl:string = environment.baseURL;

  expandedMenu = {
      "BridalMakeup": false,
      "HairStyling": false,
      "SareeDraping": false,
  }
  public onSideNavChange: boolean = true;
  public sideNavState: boolean = false;
  public linkText: boolean = false;
  public toolTipDisable: boolean = true;
    currentURL: any;
    private _mobileQueryListener: () => void;

    resizeTimer :any ;
    clicked: boolean = false;

  constructor(public router: Router, public changeDetectorRef: ChangeDetectorRef,public media: MediaMatcher,
       private commonService: CommonService, private _activatedRoute: ActivatedRoute) {

        this.commonService.sideNavState$.subscribe(res => {
            this.onSideNavChange = res;
        })
      
        this.mobileQuery = media.matchMedia('screen and (max-width: 1024px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
      
        if (this.mobileQuery.matches) {
            this.visibleSideMenu = false;
            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.commonService.setToggle(false);
                }
            });
        } else {
            this.visibleSideMenu = true;
            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.commonService.setToggle(true);
                }
            });
            this.toolTipDisable = false;
            this.linkText = true;
            this.commonService.sideNavState$.next(this.sideNavState = true);
        }
      
        this.commonService.$toggle.subscribe(val => {
            this.visibleSideMenu = val;
        });

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
    this.mobileQuery.removeListener(this._mobileQueryListener);
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

  @HostListener('window:resize') onResize() {
    // guard against resize before view is rendered

    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
        if (this.mobileQuery.matches) {
            //console.log("< 1024");
            this.visibleSideMenu = false;
            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.commonService.setToggle(false);
                }
            });
            this.toolTipDisable = true;
            this.linkText = false;
            this.commonService.sideNavState$.next(this.sideNavState = false);
        } else {
            //console.log(" > 1024");
            this.visibleSideMenu = true;
            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.commonService.setToggle(true);
                }
            });
            this.toolTipDisable = false;
            this.linkText = true;
            this.commonService.sideNavState$.next(this.sideNavState = true);
        }
    }, 200);
    this.expandedMenu.BridalMakeup = false;
    this.expandedMenu.HairStyling = false;
    this.expandedMenu.SareeDraping = false;
}

}
