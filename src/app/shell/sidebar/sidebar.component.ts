import { Component, OnInit, Input } from '@angular/core';

import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import { UserService } from 'src/app/smart-stores/services/User.service';
import { UserInfo } from 'src/app/smart-stores/products/models/user.model';
import { Router, NavigationEnd } from '@angular/router';

interface MenuItems {
  label: string;
  icon?: string;
  link?: string;
  children?: MenuItems[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() sideBarOpend;
  public staticImgUrl = '../../../assets/images/supplier.png';
  public isSidebarOpened$: Observable<boolean>;
  public treeControl = new NestedTreeControl<MenuItems>(node => node.children);
  public dataSource = new MatTreeNestedDataSource<MenuItems>();
  imageUrl = '';
  currentUrl = '';
  constructor(
    public store: Store<fromRoot.State>,
    private userService: UserService,
    public router: Router
  ) {

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentUrl = val.urlAfterRedirects;
        console.log(this.currentUrl);
      }
    });
    this.dataSource.data = [
      { label: 'Home', link: '/home', icon: 'home' },
      { label: 'Dashboard', link: '/dashboard', icon: 'bar_chart' },
      // { label: 'Cashier', link: '/cashier', icon: 'email' },
      {
        label: 'Products', link: '/products', icon: 'storefront', children: [
          { label: 'All products', link: '/products' },
          { label: 'Categories', link: '/products/categories' },
          { label: 'Options', link: '/products/options' },
          { label: 'Information', link: '/products/informations' },
        ]
      },
      { label: 'Staff management', link: '/users', icon: 'person' },
      { label: 'Store profile', link: '/store', icon: 'local_offer' },
      { label: 'Order management', link: '/orders', icon: 'sports_soccer' },
      { label: 'Datas', link: '/datas', icon: 'mail_outline' },
      { label: 'Subscription & Fees', link: '/subscription', icon: 'attach_money' },
    ];

    this.isSidebarOpened$ = this.store.pipe(select(fromLayout.selectSidebarOpened));
  }

  ngOnInit() {
    console.log('activated', this.router.url);
    this.userService.getUserImage().subscribe((next: any) => {
      this.imageUrl = next;
    }, error => {
    });
  }

  navigateToProfile() {
    this.router.navigateByUrl('/profile');
  }

  hasChild = (_: number, node: MenuItems) => !!node.children && node.children.length > 0;
}
