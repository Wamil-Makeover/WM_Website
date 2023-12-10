import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonService } from '../services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css'],
  animations: [
    trigger('zoomAnimation', [
      state('start', style({ transform: 'scale(1)', opacity: 1, 'margin-right': '0%' })),
      state('end', style({ transform: 'scale(2)', opacity: 1, 'margin-right': '-100%' })),
      transition('start => end', [
        animate('5s')
      ]),
    ]),
  ]
})
export class SplashScreenComponent implements OnInit {

  animationState = 'start';
  splashLogo:boolean = false;
  baseUrl:string = environment.baseURL;
constructor(private common:CommonService){}
  ngOnInit(): void {
    setTimeout(() => {
      this.splashLogo = true;
    }, 500);
    setTimeout(() => {
      this.animationState = 'end';
    }, 1000);
  }

  onAnimationEnd() {
    this.common.loading(true);
  
  }

}
