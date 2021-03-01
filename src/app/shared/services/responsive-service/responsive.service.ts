import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  isSmallScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      '(max-width: 957px)'
    ]).subscribe(result => {
      if (result.matches) {
        this.isSmallScreen.next(true);
      } else {
        this.isSmallScreen.next(false);
      }
    });
  }

}
