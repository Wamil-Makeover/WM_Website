import { ChangeDetectorRef, OnDestroy, Component, NgZone, OnInit, ViewChild, HostListener } from '@angular/core';
import { GuardsCheckStart, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { CommonService } from './services/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Contacts } from './models/wamil-makeover-model';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: [],
})
export class AppComponent implements OnInit {
    RefreshTime = 3000000;
    totalTime = 28800000;
    idleTime = 14400; //seconds
    timer = 0;
    isDisplayLogoRight: boolean = true;
    //totalTime = 60000;
    logoPath!: string;
    LogoName!: string;
    remainTime!: number;
    userEmailID!: string;
    userName!: string;
    roleID!: string;
    RollID: string = "";
    RoleName: string = "";
    isSuperAdmin: boolean = false;
    isProviderAdmin: boolean = false;
    visibleSideMenu: boolean = true;
    profilePath!: string;
    isprofileaccess: boolean = false;
    levelID!: string;
    userID!: string;
    currentURL!: string;
    sessionLogoPath!: string;
    participantId!: string;
    sessionId!: string;
    userId!: string;
    checked: boolean = false;
    splashLoading: boolean = true;
    language!: string;
    baseUrl:string = environment.baseURL;
    contacts:Contacts ={
        Instagram:'https://instagram.com/wamil_makeover?igshid=NzZlODBkYWE4Ng==',
        Whatsapp:'https://wa.me/+919363027106',
        Email:'mailto:wamilmakeover@gmail.com',
        Mobile:'tel:+919363027106'
    }

    constructor(private common: CommonService, private zone: NgZone, 
      private change: ChangeDetectorRef, public router: Router, 
      private spinner: NgxSpinnerService) {
        this.common.setLoading.subscribe((res) => {
            if (res) {
                this.spinner.show();
            } else {
                this.spinner.hide();
            }
            this.sessionId = '';
            this.userId = '';
            
        });        
        this.common.setSplashLoading.subscribe((res) => {
            if(!res){
            setTimeout(()=>{
                this.common.loading(false);
            },1000)
           this.splashLoading = res;
            }
        });        
        
        this.common.$toggle.subscribe(val => {
            this.visibleSideMenu = val;
        });

        this.router.events.subscribe(
            (event: any) => {
                if (event instanceof NavigationEnd) {
                    this.currentURL = this.router.url;

                        this.zone.runOutsideAngular(() => {
                            this.activityTimer();
                        });
                }
            }
        );
    }

    onChange() {
       
    }

    ngOnDestroy() {
        this.common.setLoading.complete();
    }

    ngOnInit() {     
        setTimeout(()=>{
            this.common.splashLoading(false);
          },5000)
        this.common.getLoading.subscribe((res) => {
            if (res) {
                this.spinner.show();
            } else {
                this.spinner.hide();
            }

            this.change.detectChanges();
        });
        this.router.events.forEach((value) => {
            if (value instanceof GuardsCheckStart) {
                this.spinner.hide();
            }
            if (value instanceof NavigationStart) {
                this.spinner.show();
            }
            if (value instanceof NavigationEnd) {
                this.spinner.hide();
            }
            this.change.detectChanges();
        });

        if (window.location.pathname == '/report') {
            this.router.navigate(['report/dashboard']);
        } else if (window.location.pathname == '/companymaster') {
            this.router.navigate(['companymaster/company-group']);
        } else if (window.location.pathname == '/fluid') {
            this.router.navigate(['fluid/manufacturer']);
        }
    }

    setToggle(): void {
        this.visibleSideMenu = !this.visibleSideMenu;
        this.common.setToggle(this.visibleSideMenu);
    }
    /** Timer activity */
    activityTimer() {

        const timerStart = parseInt('0');
        const timenow = Date.now();
        window.setInterval(() => {
        }, this.RefreshTime);

        if (timerStart && !isNaN(timerStart)) {
            this.remainTime = this.totalTime - (timenow - timerStart);
        } else {
            localStorage.setItem('timerstart', timenow.toString());
            document.cookie = `timerstart=${timenow.toString()};`
            this.remainTime = this.totalTime;
        }

        if (this.remainTime > 0) {
            window.setTimeout(() => {
                this.forceLogout();
            }, this.remainTime);
        }
    }

    /** force logout */
    forceLogout() {
        localStorage.removeItem("timerstart");
        window.location.href = "/Session/SignOut";
    }

    CheckIdleTime() {
        setInterval(() => {
            this.timer++;
            if (this.timer == this.idleTime) { // no of seconds after which user needs to logout
                this.forceLogout();
            }
        }, 1000);
    }

    @HostListener('mouseup', ['$event'])
    @HostListener('mousemove', ['$event'])
    onEvent(event: MouseEvent) {
        this.timer = 0;
    }
    @HostListener('document:keydown', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        this.timer = 0;
    }

}
