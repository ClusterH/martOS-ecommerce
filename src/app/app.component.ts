import { Component, OnInit } from '@angular/core';

import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './core/authentication/auth.service';
import { ResponsiveService } from './shared/services/responsive-service/responsive.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public opened = true;
  public isSidebarOpened$: Observable<boolean>;
  constructor(public store: Store<fromRoot.State>, public authservice: AuthService, public responsiveService: ResponsiveService) {
    this.isSidebarOpened$ = this.store.pipe(select(fromLayout.selectSidebarOpened));
  }
  ngOnInit() {
    this.responsiveService.isSmallScreen.subscribe(next => {
      if (next) {
        this.opened = false;
      }
    });
  }
  public _toggleOpened(): void {
    this.opened = !this.opened;
  }
}
