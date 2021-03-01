import { Injectable, OnDestroy } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable, Subscription } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { ProductsService, ArticlesService, TagsService } from '../../services';
import * as fromRoot from 'src/app/@store';
import * as fromActions from './products.action';
import { Store } from '@ngrx/store';

import { TagType, Product } from '../../models';
import { ProductManager } from '../../services/product.manager';
import { PresImage } from '../../models/presimage.model';

@Injectable()
export class ProductsEffects implements OnDestroy {
products : Product[] = [];
presImage: PresImage;
currentImageSubscription: Subscription;

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private productManager : ProductManager,
    private articlesService: ArticlesService,
    private tagsService: TagsService,
    private toast: ToastrService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnDestroy(){
    if(this.currentImageSubscription){
      this.currentImageSubscription.unsubscribe();
    }
    
     this.productManager.changecreatedImage(null);
  }

  @Effect()
  loadProducts$: Observable<fromActions.LoadProductsSuccess | fromActions.LoadProductsFail> = this.actions$.pipe(
    ofType(fromActions.LOAD_PRODUCTS),
    exhaustMap(action => {
      return this.productsService.getProducts(action['payload']).pipe(
        map((res) => {
           this.currentImageSubscription = this.productManager.currentcreatedImage.subscribe(presImage => {
             if (!presImage) {
               return;
           }
             this.presImage = presImage;
           });

           if (this.presImage != null) {
             var products: Product[] = [];
             res.forEach(item => {
               var product = <Product>{
                 id : item.id,
                 articles: item.articles,
                 brand: item.brand,
                 categoryAttributes: item.categoryAttributes,
                 name: item.name,
                 price: item.price,
                 reference: item.reference,
                 tags: item.tags,
                 allTags: item.allTags,
                 liveStatus: item.liveStatus,
                 articleCount: item.articleCount
               }

               if (item.id == this.presImage.itemId) {
                 product.presImage = this.presImage.url
                 this.productManager.changecreatedImage(null);
               } else{
                 product.presImage = item.presImage
               }

               products.push(product);
             });
             res = products;
           }

          return new fromActions.LoadProductsSuccess(res);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.title ? error.title : 'Something went wrong');
          return of(new fromActions.LoadProductsFail(res));
        })
      );
    })
  );

  @Effect()
  loadGroupedArticles$: Observable<fromActions.LoadGroupedArticlesSuccess | fromActions.LoadGroupedArticlesFail> = this.actions$.pipe(
    ofType(fromActions.LOAD_GROUPED_ARTICLES),
    exhaustMap(action => {
      return this.articlesService.getGroupedArticles(action['payload']).pipe(
        map((res) => {
          return new fromActions.LoadGroupedArticlesSuccess(res);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.title ? error.title : 'Something went wrong');
          return of(new fromActions.LoadGroupedArticlesFail(res));
        })
      );
    })
  );

  @Effect()
  loadArticlesByIds$: Observable<fromActions.LoadArticlesByIdsSuccess | fromActions.LoadArticlesByIdsFail> = this.actions$.pipe(
    ofType(fromActions.LOAD_ARTICLES_BY_IDS),
    exhaustMap(action => {
      return this.articlesService.getArticlesByIds(action['payload']).pipe(
        map((res) => {
          return new fromActions.LoadArticlesByIdsSuccess(res);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.title ? error.title : 'Something went wrong');
          return of(new fromActions.LoadArticlesByIdsFail(res));
        })
      );
    })
  );

  @Effect()
  loadTags$: Observable<fromActions.LoadTagsSuccess | fromActions.LoadTagsFail> = this.actions$.pipe(
    ofType(fromActions.LOAD_TAGS),
    exhaustMap(action => {
      return this.tagsService.getTagsByType(action['payload']).pipe(
        map((res) => {
          return new fromActions.LoadTagsSuccess(res);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.title ? error.title : 'Something went wrong');
          return of(new fromActions.LoadTagsFail(res));
        })
      );
    })
  );

  @Effect()
  loadCategories$: Observable<fromActions.LoadCategoriesSuccess | fromActions.LoadCategoriesFail> = this.actions$.pipe(
    ofType(fromActions.LOAD_CATEGORIES),
    exhaustMap(_ => {
      return this.tagsService.getTagsByType(TagType.Category).pipe(
        map((res) => {
          return new fromActions.LoadCategoriesSuccess(res);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.title ? error.title : 'Something went wrong');
          return of(new fromActions.LoadCategoriesFail(res));
        })
      );
    })
  );

  @Effect()
  loadOptions$: Observable<fromActions.LoadOptionsSuccess | fromActions.LoadOptionsFail> = this.actions$.pipe(
    ofType(fromActions.LOAD_OPTIONS),
    exhaustMap(_ => {
      return this.tagsService.getTagsByType(TagType.Option).pipe(
        map((res) => {
          return new fromActions.LoadOptionsSuccess(res);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.title ? error.title : 'Something went wrong');
          return of(new fromActions.LoadOptionsFail(res));
        })
      );
    })
  );

  @Effect()
  deleteTag$: Observable<fromActions.DeleteTagSuccess | fromActions.DeleteTagFail> = this.actions$.pipe(
    ofType(fromActions.DELETE_TAG),
    exhaustMap(action => {
      return this.tagsService.deleteTag(action['payload']).pipe(
        map((res) => {
          return new fromActions.DeleteTagSuccess(action['payload']);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.title ? error.title : 'Something went wrong');
          return of(new fromActions.DeleteTagFail(res));
        })
      );
    })
  );

  @Effect()
  loadFilters$: Observable<fromActions.LoadFiltersSuccess | fromActions.LoadFiltersFail> = this.actions$.pipe(
    ofType(fromActions.LOAD_FILTERS),
    exhaustMap(_ => {
      return this.productsService.getFilters().pipe(
        map((res) => {
          return new fromActions.LoadFiltersSuccess(res);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.title ? error.title : 'Something went wrong');
          return of(new fromActions.LoadProductsFail(res));
        })
      );
    })
  );

  @Effect()
  loadFilterValues$: Observable<fromActions.LoadFilterValuesFail | fromActions.LoadFilterValuesSuccess> = this.actions$.pipe(
    ofType(fromActions.LOAD_FILTER_VALUES),
    exhaustMap(action => {
      return this.productsService.getFilterValues(action['payload']).pipe(
        map((res) => {
          return new fromActions.LoadFilterValuesSuccess(res);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.title ? error.title : 'Something went wrong');
          return of(new fromActions.LoadFilterValuesFail(res));
        })
      );
    })
  );

  // @Effect()
  // setOnlineStatus$: Observable<fromActions.SetOnlineStatusSuccess | fromActions.SetOnlineStatusFail> = this.actions$.pipe(
  //   ofType(fromActions.SET_ONLINE_STATUS),
  //   exhaustMap(action => {
  //     return this.productsService.setOnlineStatus(action['payload']).pipe(
  //       map(_ => {
  //         return new fromActions.SetOnlineStatusSuccess();
  //       }),
  //       catchError((res: Error) => {
  //         const error = res['error'];
  //         this.toast.error(error && error.title ? error.title : 'Something went wrong');
  //         return of(new fromActions.SetOnlineStatusFail(res));
  //       })
  //     );
  //   })
  // );

  @Effect()
  saveProduct$: Observable<fromActions.SaveProductSuccess | fromActions.SaveProductFail> = this.actions$.pipe(
    ofType(fromActions.SAVE_PRODUCT),
    exhaustMap(action => {
      return this.productsService.saveProduct(action['payload']).pipe(
        map(res => {
          return new fromActions.SaveProductSuccess(res);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.title ? error.title : 'Something went wrong');
          return of(new fromActions.SaveProductFail(res));
        })
      );
    })
  );

  @Effect()
  deleteProduct$: Observable<fromActions.DeleteProductSuccess | fromActions.DeleteProductFail> = this.actions$.pipe(
    ofType(fromActions.DELETE_PRODUCT),
    exhaustMap(action => {
      return this.productsService.deleteProduct(action['payload']).pipe(
        map(res => {
          return new fromActions.DeleteProductSuccess(action['payload']);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.title ? error.title : 'Something went wrong');
          return of(new fromActions.DeleteProductFail(res));
        })
      );
    })
  );

}
