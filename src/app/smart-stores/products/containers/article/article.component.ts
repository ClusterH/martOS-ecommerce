import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import * as _ from 'lodash';

import { Store as _Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/core/authentication/@store/auth';
import * as fromProducts from 'src/app/smart-stores/products/@store/products';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PropertyType, PropertyFilter, SearchAnyRequest, ArticlesOverall, TagAttribute } from '../../models';
import { Store } from '../../../models/Store';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss', '../products/products.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  public articlesOverall$: Observable<ArticlesOverall[]>;
  public searchAnyRequest: SearchAnyRequest;
  public isLoading$: Observable<any>;
  public itemId: string;

  public filters$: Observable<PropertyFilter[]>;
  public selectedFilter: PropertyFilter;
  public filterValues$: Observable<string[]>;

  public displayedColumns: string[];
  public chipColumns: string[];

  public dataSource: MatTableDataSource<ArticlesOverall>;

  private store$: Observable<Store>;
  private searchAnyRequest$: Observable<SearchAnyRequest>;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    public store: _Store<fromRoot.State>,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.articlesOverall$ = this.store.pipe(select(fromProducts.selectGroupedArticles));
    this.searchAnyRequest$ = this.store.pipe(select(fromProducts.selectRequest));
    this.filters$ = this.store.pipe(select(fromProducts.selectFilters));
    this.filterValues$ = this.store.pipe(select(fromProducts.selectFilterValues));
    this.store$ = this.store.pipe(select(fromAuth.selectSelectedStore));
    this.isLoading$ = this.store.pipe(select(fromProducts.selectLoading));

    this.displayedColumns = ['reference', 'name', 'category', 'brand', 'tags', 'quantity', 'selling_price', 'actions'];
    this.chipColumns = ['brand', 'name', 'optionsAttributes', 'categoryAttribute'];

    this.articlesOverall$.pipe(takeUntil(this.unsubscribe$)).subscribe(articles => {
      this.dataSource = new MatTableDataSource(articles);
    });

    this.searchAnyRequest$.pipe(takeUntil(this.unsubscribe$)).subscribe(searchAnyRequest => {
      this.searchAnyRequest = _.cloneDeep(searchAnyRequest);
    });
  }

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');

    this.store$.pipe(takeUntil(this.unsubscribe$)).subscribe(store => {
      if (!store) {
        return;
      }

      this.searchAnyRequest = {
        ...this.searchAnyRequest,
        storeId: store.id,
        itemId: +this.itemId,
      };

      this.loadGroupedArticles();
    });

    this.store.dispatch(new fromProducts.LoadFilters());
  }

  loadGroupedArticles(): void {
    this.store.dispatch(new fromProducts.LoadGroupedArticles(this.searchAnyRequest));
  }

  details(article: ArticlesOverall) {
    this.store.dispatch(new fromProducts.SetArticleIds(article.articleIds));
    this.router.navigate(['products/article-details', article.id]);
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

    switch (filter ? this.selectedFilter.type : filter) {
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
    this.loadGroupedArticles();
  }

  removeOption(option: TagAttribute): void {
    this.searchAnyRequest = {
      ...this.searchAnyRequest,
      options: this.searchAnyRequest.options.filter(opt => opt['index'] !== option['index']),
      optionsAttributes: this.searchAnyRequest.optionsAttributes.filter(opt => opt.value !== option.value)
    };

    this.loadGroupedArticles();
  }

  removeCategory(): void {
    const request = { ...this.searchAnyRequest };
    delete request.category;
    delete request.categoryAttribute;
    this.searchAnyRequest = request;

    this.loadGroupedArticles();
  }

  removeFilter(key: string): void {
    const request = { ...this.searchAnyRequest };
    delete request[key];
    this.searchAnyRequest = request;

    this.loadGroupedArticles();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.store.dispatch(new fromProducts.SetSearchRequest(this.searchAnyRequest));
  }

}
