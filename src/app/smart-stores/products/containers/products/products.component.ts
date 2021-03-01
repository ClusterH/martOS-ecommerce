import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import * as _ from 'lodash';

import { Store as _Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/core/authentication/@store/auth';
import * as fromProducts from 'src/app/smart-stores/products/@store/products';
import { Observable, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

import { Store } from 'src/app/smart-stores/models/Store';
import { Product, PropertyType, PropertyFilter, SearchAnyRequest, TagAttribute, TagType, OnlineRequest } from '../../models';
import { ProductsService } from '../../services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  public products$: Observable<Product[]>;
  public searchAnyRequest: SearchAnyRequest;
  public isLoading$: Observable<any>;

  public filters$: Observable<PropertyFilter[]>;
  public selectedFilter: PropertyFilter;
  public filterValues$: Observable<string[]>;
  public tagType = TagType;

  public displayedColumns: string[];
  public chipColumns: string[];

  public dataSource: MatTableDataSource<Product>;

  private store$: Observable<Store>;
  private searchAnyRequest$: Observable<SearchAnyRequest>;
  private unsubscribe$: Subject<void> = new Subject();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public store: _Store<fromRoot.State>, public router: Router, private productsService: ProductsService) {
    this.products$ = this.store.pipe(select(fromProducts.selectProducts));
    console.log(this.products$);
    this.searchAnyRequest$ = this.store.pipe(select(fromProducts.selectRequest));
    this.filters$ = this.store.pipe(select(fromProducts.selectFilters));
    this.filterValues$ = this.store.pipe(select(fromProducts.selectFilterValues));
    this.store$ = this.store.pipe(select(fromAuth.selectSelectedStore));
    this.isLoading$ = this.store.pipe(select(fromProducts.selectLoading));

    this.displayedColumns = ['status', 'name', 'category', 'subcategory', 'brand', 'options', 'quantity', 'price', 'actions'];
    this.chipColumns = ['brand', 'name', 'optionsAttributes', 'categoryAttribute'];

    // this.products$.pipe(takeUntil(this.unsubscribe$)).subscribe(products => {
    //   this.dataSource = new MatTableDataSource(products);
    // });

    this.searchAnyRequest$.pipe(takeUntil(this.unsubscribe$)).subscribe(searchAnyRequest => {
      this.searchAnyRequest = _.cloneDeep(searchAnyRequest);
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.store$.pipe(takeUntil(this.unsubscribe$)).subscribe(store => {
      if (!store) {
        return;
      }

      this.searchAnyRequest = { ...this.searchAnyRequest, storeId: store.id };
      this.loadProducts();
    });

    this.store.dispatch(new fromProducts.LoadFilters());
    // // setTimeout(() => {
    //   this.dataSource.paginator = this.paginator;
    // }, 1000);
    

  }

  loadProducts(): void {
    this.store.dispatch(new fromProducts.LoadProducts(this.searchAnyRequest));
    this.products$.pipe(takeUntil(this.unsubscribe$)).subscribe(products => {
      this.dataSource = new MatTableDataSource(products);
    });
  }

  view(product: Product): void {
    this.router.navigate(['products/article', product.id]);
  }

  edit(product: Product): void {
    this.productsService.getProductById({
      id: product.id,
      storeId: this.searchAnyRequest.storeId,
    }).subscribe(res => {
      this.store.dispatch(new fromProducts.SelectProduct({ item: res }));
      this.router.navigate(['products/new']);
    });
  }

  delete(product: Product): void {
    // this.productsService.getProductById({
    //   id: product.id,
    //   storeId: this.searchAnyRequest.storeId,
    // }).subscribe(res => {
    this.store.dispatch(new fromProducts.DeleteProduct({ id: product.id, storeId: this.searchAnyRequest.storeId, }));
    // this.router.navigate(['products/new']);
    // });
  }

  onStatusChange(product: Product, event): void {
    this.store$.pipe(take(1)).subscribe(async store => {
      const onlineRequest = {
        itemId: product.id,
        storeId: store.id,
        status: event.checked,
      } as OnlineRequest;
      
    return new Promise(async (resolve) => {
      (await this.productsService.setOnlineStatus(onlineRequest)).subscribe(next => {
        resolve(next);
        console.log({ next });
      });
    });
      // this.store.dispatch(new fromProducts.SetOnlineStatus(onlineRequest));
      // this.loadProducts();
    });
  }

  filter(filter: PropertyFilter): void {
    if (!filter) {
      return;
    }

    this.selectedFilter = filter;
    this.store.dispatch(new fromProducts.LoadFilterValues(filter));
  }

  filterValues(filter: string): void {
    if (!filter) {
      return;
    }

    let assignment = null;

    switch (this.selectedFilter.type) {
      case PropertyType.brand:
        assignment = { brand: filter };
        break;

      case PropertyType.name:
        assignment = { name: filter };
        break;

      case PropertyType.category:
        assignment = {
          category: {
            id: this.selectedFilter.id,
            name: this.selectedFilter.value,
            tagType: this.selectedFilter.type,
          },
          categoryAttribute: {
            tagId: this.selectedFilter.id,
            name: this.selectedFilter.value,
            value: filter,
          }
        };
        break;

      case PropertyType.option:
        if (this.searchAnyRequest.optionsAttributes.findIndex(optAttr => optAttr.value === filter) !== -1) {
          return;
        }

        const index = this.searchAnyRequest.options.length ?
          this.searchAnyRequest.options[this.searchAnyRequest.options.length - 1]['index'] + 1 :
          0;

        assignment = {
          options: [...this.searchAnyRequest.options, {
            index,
            id: this.selectedFilter.id,
            name: this.selectedFilter.value,
            tagType: this.selectedFilter.type,
          }],
          optionsAttributes: [...this.searchAnyRequest.optionsAttributes, {
            index,
            tagId: this.selectedFilter.id,
            name: this.selectedFilter.value,
            value: filter,
          }]
        };
        break;
    }

    this.searchAnyRequest = { ...this.searchAnyRequest, ...assignment };
    this.loadProducts();
  }

  removeOption(option: TagAttribute): void {
    this.searchAnyRequest = {
      ...this.searchAnyRequest,
      options: this.searchAnyRequest.options.filter(opt => opt['index'] !== option['index']),
      optionsAttributes: this.searchAnyRequest.optionsAttributes.filter(opt => opt.value !== option.value)
    };

    this.loadProducts();
  }

  removeCategory(): void {
    const request = { ...this.searchAnyRequest };
    delete request.category;
    delete request.categoryAttribute;
    this.searchAnyRequest = request;

    this.loadProducts();
  }

  removeFilter(key: string): void {
    const request = { ...this.searchAnyRequest };
    delete request[key];
    this.searchAnyRequest = request;

    this.loadProducts();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.store.dispatch(new fromProducts.SetSearchRequest(this.searchAnyRequest));
  }

}
