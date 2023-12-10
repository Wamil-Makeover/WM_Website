import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }
  baseUrl:string = environment.baseURL;
  currentYear:number = new Date().getFullYear();

  ngOnInit(): void {
  }

}
