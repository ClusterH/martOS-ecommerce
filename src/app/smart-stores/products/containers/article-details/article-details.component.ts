import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import * as _ from 'lodash';

import { Store as _Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/core/authentication/@store/auth';
import * as fromProducts from 'src/app/smart-stores/products/@store/products';
import { Observable, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

import { StoresService } from 'src/app/smart-stores/services/StoresService';

import { Store } from 'src/app/smart-stores/models/Store';
import {  SearchAnyRequest, ArticlesOverall, Article } from '../../models';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss', '../products/products.component.scss']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  public articles$: Observable<Article[]>;
  public articlesOverall$: Observable<ArticlesOverall[]>;
  public articlesIds$: Observable<number[]>;
  public searchAnyRequest: SearchAnyRequest;
  public isLoading$: Observable<any>;
  public itemId: string;

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<Article>;

  private store$: Observable<Store>;
  private searchAnyRequest$: Observable<SearchAnyRequest>;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    public store: _Store<fromRoot.State>,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.articles$ = this.store.pipe(select(fromProducts.selectArticles));
    this.articlesOverall$ = this.store.pipe(select(fromProducts.selectGroupedArticles));
    this.articlesIds$ = this.store.pipe(select(fromProducts.selectArticleIds));
    this.searchAnyRequest$ = this.store.pipe(select(fromProducts.selectRequest));
    this.store$ = this.store.pipe(select(fromAuth.selectSelectedStore));
    this.isLoading$ = this.store.pipe(select(fromProducts.selectLoading));

    this.displayedColumns = ['reference', 'name', 'brand', 'price', 'activation_date', 'live_status', 'actions'];

    this.articles$.pipe(takeUntil(this.unsubscribe$)).subscribe(articles => {
      this.dataSource = new MatTableDataSource(articles);
    });

    this.articlesOverall$.pipe(takeUntil(this.unsubscribe$)).subscribe(articles => {
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

      this.loadArticles();
    });
  }

  loadArticles(): void {
    this.articlesIds$.pipe(take(1)).subscribe(articleIds => {
      this.store.dispatch(new fromProducts.LoadArticlesByIds(articleIds));
    });
  }

  edit(article: Article): void {
    console.log('---------', article);
  }

  delete(id: number): void {
    console.log('---------', id);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.store.dispatch(new fromProducts.SetSearchRequest(this.searchAnyRequest));
  }

}
