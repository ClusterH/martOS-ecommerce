import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface Tab {
  label: string;
  link: string;
}

@Component({
  selector: 'app-products-navigation',
  templateUrl: './products-navigation.component.html',
  styleUrls: ['./products-navigation.component.scss']
})
export class ProductsNavigationComponent implements OnInit {
  @Output() tabChange: EventEmitter<void> = new EventEmitter();

  public tabs: Tab[];
  public activeTab: Tab;

  constructor(public router: Router, public route: ActivatedRoute) {
    this.tabs = [
      { label: 'Products', link: '/products' },
      { label: 'Categories', link: '/products/categories' },
      { label: 'Options', link: '/products/options' },
      { label: 'Information', link: '/products/informations' }
    ];
  }

  ngOnInit() {
    this.activeTab = this.tabs[this.tabs.findIndex(t => t.link === this.router.url)];
  }

  onTabChange(link: string): void {
    this.tabChange.emit();
    this.router.navigate([link]);
  }

}
