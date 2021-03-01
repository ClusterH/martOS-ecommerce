import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../core/authentication/auth.service';
import { Subscription, Observable, Subject } from 'rxjs';
import { StoresClient } from '../../smart-stores/clients/StoresClient';
import { Store } from '../../smart-stores/models/Store';
import { Router } from '@angular/router';

import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/core/authentication/@store/auth';
import * as fromLayout from 'src/app/@store/layout';
import { Store as _Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { HeaderService } from 'src/app/_header/header.service';
import { StoresService } from 'src/app/smart-stores/services/StoresService';
import { StoreService } from 'src/app/smart-stores/services/Store.service';
import { UserClient } from 'src/app/store-profile/clients/user.client';
import { ResponsiveService } from 'src/app/shared/services/responsive-service/responsive.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      transition(':leave',
        animate(300, style({ opacity: 0 })))
    ])
  ]
})

export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggle = new EventEmitter<string>();
  comboBoxLocked = false;
  public name: string;
  public isAuthenticated: boolean;
  public subscription: Subscription;
  public stores: Store[] = [];
  public selectedStore: number;

  public stores$: Observable<Store[]>;
  public selectedStore$: Observable<Store>;
  public isSidebarOpened$: Observable<boolean>;

  private readonly router: Router;
  private readonly storesClient: StoresClient;
  private unsubscribe$: Subject<void> = new Subject();
  isSmallScreen = false;
  sidebarOpen = false;
  constructor(
    storesClient: StoresClient,
    router: Router,
    public store: _Store<fromRoot.State>,
    private authService: AuthService,
    public headerService: HeaderService,
    private storeService: StoreService,
    private userClient: UserClient,
    public responsiveService: ResponsiveService
  ) {
    this.storesClient = storesClient;
    this.router = router;

    this.isSidebarOpened$ = this.store.pipe(select(fromLayout.selectSidebarOpened));
    this.stores$ = this.store.pipe(select(fromAuth.selectStores));
    this.selectedStore$ = this.store.pipe(select(fromAuth.selectSelectedStore));
  }

  ngOnInit() {
    this.responsiveService.isSmallScreen.subscribe(next => {
      this.isSmallScreen = next;
      this.togglesideBarConditionaly();
    });
    this.isSidebarOpened$.subscribe(next => {
      this.sidebarOpen = next;
      this.togglesideBarConditionaly();
    })
    this.userClient.getStoredBusinessAddress();
    this.authService.authNavStatus$.pipe(takeUntil(this.unsubscribe$)).subscribe(status => {
      this.isAuthenticated = status;

      if (status) {
        this.store.dispatch(new fromAuth.LoadStores());
      }
    });
    this.headerService.comboBoxLocked.subscribe(next => {
      this.comboBoxLocked = next;
    });
    this.name = this.authService.name;
  }

  onStoreChange(store: Store) {
    this.storeService.selectedStore.next(store);
    this.store.dispatch(new fromAuth.SelectStore(store));
  }

  onToggleSidebar(): void {
    this.store.dispatch(new fromLayout.ToggleSidebar());
    this.toggle.emit();
  }


  async signout() {
    await this.authService.signout();
  }
  togglesideBarConditionaly() {
    if (this.isSmallScreen === true) {
      if (this.sidebarOpen === true) {
        this.store.dispatch(new fromLayout.ToggleSidebar());
      }
    }
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
