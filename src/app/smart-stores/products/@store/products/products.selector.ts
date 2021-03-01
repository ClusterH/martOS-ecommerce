import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from 'src/app/@store';
import * as fromProducts from './products.reducer';
import * as fromProductsReducer from '../reducer';

import { Product, PropertyFilter, SearchAnyRequest, ArticlesOverall, Article, Tag, ProductRequest } from '../../models';

export const selectProductsState: MemoizedSelector<fromRoot.State, fromProducts.ProductsState> = createSelector(
  fromProductsReducer.getProductsFeatureState,
  (state: fromProductsReducer.ProductsFeatureState) => state.products
);

export const selectLoading: MemoizedSelector<fromRoot.State, any> = createSelector(
  selectProductsState,
  fromProducts.getLoading,
);

export const selectProducts: MemoizedSelector<fromRoot.State, Product[]> = createSelector(
  selectProductsState,
  fromProducts.getProducts,
);

export const selectProduct: MemoizedSelector<fromRoot.State, ProductRequest> = createSelector(
  selectProductsState,
  fromProducts.getProduct,
);

export const selectArticles: MemoizedSelector<fromRoot.State, Article[]> = createSelector(
  selectProductsState,
  fromProducts.getArticles,
);

export const selectTags: MemoizedSelector<fromRoot.State, Tag[]> = createSelector(
  selectProductsState,
  fromProducts.getTags,
);

export const selectCategories: MemoizedSelector<fromRoot.State, Tag[]> = createSelector(
  selectProductsState,
  fromProducts.getCategories,
);

export const selectOptions: MemoizedSelector<fromRoot.State, Tag[]> = createSelector(
  selectProductsState,
  fromProducts.getOptions,
);

export const selectGroupedArticles: MemoizedSelector<fromRoot.State, ArticlesOverall[]> = createSelector(
  selectProductsState,
  fromProducts.getGroupedArticles,
);

export const selectFilters: MemoizedSelector<fromRoot.State, PropertyFilter[]> = createSelector(
  selectProductsState,
  fromProducts.getFilters,
);

export const selectFilterValues: MemoizedSelector<fromRoot.State, string[]> = createSelector(
  selectProductsState,
  fromProducts.getFilterValues,
);

export const selectRequest: MemoizedSelector<fromRoot.State, SearchAnyRequest> = createSelector(
  selectProductsState,
  fromProducts.getRequest,
);

export const selectArticleIds: MemoizedSelector<fromRoot.State, number[]> = createSelector(
  selectProductsState,
  fromProducts.getArticleIds,
);
