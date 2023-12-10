import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  public sideNavState$: Subject<boolean> = new Subject();
  private toggle = new BehaviorSubject<boolean>(true);
  setLoading: Subject<boolean> = new BehaviorSubject<boolean>(false);
  setSplashLoading: Subject<boolean> = new BehaviorSubject<boolean>(true);
  getLoading: Observable<boolean>;
  splashGetLoading: Observable<boolean>;
  public $toggle = this.toggle.asObservable();
  constructor() {
    this.getLoading = this.setLoading.asObservable();
    this.splashGetLoading = this.setSplashLoading.asObservable();
  }
  loading(set: boolean) {
    this.setLoading.next(set);
  }
  splashLoading(set: boolean) {
    this.setSplashLoading.next(set);
  }
  setToggle(val: boolean) {
    this.toggle.next(val);
  }
}
